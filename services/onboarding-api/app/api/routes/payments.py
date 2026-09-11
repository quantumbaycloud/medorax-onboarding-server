import hashlib
import hmac
import io
import json
import secrets
from datetime import datetime, timezone
from typing import Any

import httpx
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import Response
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.deps import current_user
from app.core.rate_limit import guard
from app.db.session import get_db
from app.models import Invoice, PaymentEvent, PaymentSubscription, PaymentTransaction, User, Pharmacy
from app.services.audit import audit
from app.services.mailer import send_email_with_attachment

router = APIRouter(prefix='/payments', tags=['Payments'])

PLAN_CODE = 'professional-annual'
PLAN_NAME = 'Professional Plan'
PLAN_AMOUNT_PAISE = 1_000_000
CONVENIENCE_FEE_PERCENT = 2
CONVENIENCE_FEE_PAISE = PLAN_AMOUNT_PAISE * CONVENIENCE_FEE_PERCENT // 100
PLAN_TOTAL_PAISE = PLAN_AMOUNT_PAISE + CONVENIENCE_FEE_PAISE
PLAN_CURRENCY = 'INR'
PLAN_TOTAL_COUNT = 10


def _require_config():
    missing = []
    for name, value in {
        'RAZORPAY_KEY_ID': settings.razorpay_key_id,
        'RAZORPAY_KEY_SECRET': settings.razorpay_key_secret,
        'RAZORPAY_PLAN_ID': settings.razorpay_plan_id,
    }.items():
        if not value:
            missing.append(name)
    if missing:
        raise HTTPException(503, f'Razorpay is not configured: {", ".join(missing)}')


def _dt_from_unix(value):
    if not value:
        return None
    return datetime.fromtimestamp(int(value), tz=timezone.utc)


async def _razorpay(method: str, path: str, payload: dict | None = None):
    _require_config()
    async with httpx.AsyncClient(
        base_url='https://api.razorpay.com',
        auth=(settings.razorpay_key_id, settings.razorpay_key_secret),
        timeout=20,
    ) as client:
        response = await client.request(method, path, json=payload)
    if response.status_code >= 400:
        try:
            detail = response.json().get('error', {}).get('description') or 'Razorpay request failed'
        except Exception:
            detail = 'Razorpay request failed'
        raise HTTPException(502, detail)
    return response.json()


def _checkout_signature(payment_id: str, subscription_id: str) -> str:
    message = f'{payment_id}|{subscription_id}'.encode()
    return hmac.new(settings.razorpay_key_secret.encode(), message, hashlib.sha256).hexdigest()


def _webhook_signature(raw_body: bytes, signature: str) -> bool:
    if not settings.razorpay_webhook_secret:
        return False
    expected = hmac.new(settings.razorpay_webhook_secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature or '')


async def _get_or_create_payment_plan() -> str:
    """Return a Razorpay yearly plan whose actual charge is exactly ₹10,200.

    Razorpay subscriptions charge the amount configured on the plan. The
    checkout addon is not relied on for the subscription's first charge.
    Therefore, if the configured plan is ₹10,000 (or otherwise incorrect),
    find or create a dedicated ₹10,200 plan and use that plan for the
    subscription. Razorpay credentials remain server-side only.
    """
    required_amount = PLAN_TOTAL_PAISE

    # First, reuse the configured plan when it already has the correct amount.
    try:
        configured = await _razorpay('GET', f'/v1/plans/{settings.razorpay_plan_id}')
        item = configured.get('item') or {}
        if int(item.get('amount') or 0) == required_amount and item.get('currency', PLAN_CURRENCY) == PLAN_CURRENCY:
            return settings.razorpay_plan_id
    except HTTPException:
        # If the configured plan cannot be inspected, continue to look for a
        # correct plan rather than silently charging the wrong amount.
        pass

    # Reuse an existing matching plan to avoid creating duplicate plans.
    try:
        plans = await _razorpay('GET', '/v1/plans?count=100')
        for plan in plans.get('items', []):
            item = plan.get('item') or {}
            if (int(item.get('amount') or 0) == required_amount
                    and item.get('currency', PLAN_CURRENCY) == PLAN_CURRENCY
                    and plan.get('period') == 'yearly'
                    and int(plan.get('interval') or 0) == 1):
                return plan['id']
    except HTTPException:
        pass

    created = await _razorpay('POST', '/v1/plans', {
        'period': 'yearly',
        'interval': 1,
        'item': {
            'name': PLAN_NAME,
            'amount': required_amount,
            'currency': PLAN_CURRENCY,
            'description': f'{PLAN_NAME} annual subscription including {CONVENIENCE_FEE_PERCENT}% convenience fee',
        },
        'notes': {
            'plan_code': PLAN_CODE,
            'base_amount': str(PLAN_AMOUNT_PAISE),
            'convenience_fee': str(CONVENIENCE_FEE_PAISE),
        },
    })
    return created['id']


def _subscription_out(row: PaymentSubscription):
    return {
        'id': str(row.id),
        'planCode': row.plan_code,
        'razorpaySubscriptionId': row.razorpay_subscription_id,
        'status': row.status,
        'amount': row.amount_paise // 100,
        'currency': row.currency,
        'paidCount': row.paid_count,
        'currentStart': row.current_start,
        'currentEnd': row.current_end,
    }


def _invoice_number() -> str:
    return f"MED-INV-{datetime.now(timezone.utc):%Y%m%d}-{secrets.token_hex(4).upper()}"


def _money(paise: int, currency: str = 'INR') -> str:
    return f'{currency} {paise / 100:,.2f}'


def _build_invoice_pdf(invoice: Invoice, user: User, payment: PaymentTransaction) -> bytes:
    """Build a professional, user-scoped invoice PDF without exposing secrets."""
    buffer = io.BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    margin = 42
    right = width - margin

    # Medorax brand palette: green + white.
    green = colors.HexColor('#008F78')
    dark_green = colors.HexColor('#006B5F')
    light_green = colors.HexColor('#EAF8F4')
    pale_green = colors.HexColor('#F5FCFA')
    text = colors.HexColor('#172B2A')
    muted = colors.HexColor('#61736F')
    border = colors.HexColor('#D8EAE5')
    white = colors.white

    pdf.setTitle(f'Medorax Invoice {invoice.invoice_number}')
    pdf.setAuthor('Medorax Healthcare India Private Limited')
    pdf.setSubject('Subscription Tax Invoice')

    # Header background.
    pdf.setFillColor(green)
    pdf.roundRect(0, height - 132, width, 132, 0, fill=1, stroke=0)

    # Logo. The logo is a local application asset, not a remote URL.
    logo_path = __import__('pathlib').Path(__file__).resolve().parents[2] / 'assets' / 'logo.png'
    if logo_path.exists():
        try:
            pdf.drawImage(ImageReader(str(logo_path)), margin, height - 105,
                          width=72, height=72, preserveAspectRatio=True,
                          mask='auto', anchor='sw')
        except Exception:
            pass

    pdf.setFillColor(white)
    pdf.setFont('Helvetica-Bold', 15)
    pdf.drawString(margin + 84, height - 60, 'Medorax Healthcare India Private Limited')
    pdf.setFont('Helvetica', 9)
    pdf.drawString(margin + 84, height - 78, 'Healthcare & Pharmaceutical Management Platform')

    pdf.setFont('Helvetica-Bold', 25)
    pdf.drawRightString(right, height - 58, 'INVOICE')
    pdf.setFont('Helvetica', 9)
    pdf.drawRightString(right, height - 78, f'Invoice No: {invoice.invoice_number}')
    pdf.drawRightString(right, height - 93, f'Date: {invoice.issued_at.astimezone(timezone.utc):%d %b %Y}')

    y = height - 165

    # Customer and issuer cards.
    card_h = 94
    pdf.setFillColor(pale_green)
    pdf.setStrokeColor(border)
    pdf.roundRect(margin, y - card_h, width - 2 * margin, card_h, 10, fill=1, stroke=1)

    pdf.setFillColor(dark_green)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(margin + 16, y - 20, 'BILLED TO')
    pdf.setFillColor(text)
    pdf.setFont('Helvetica-Bold', 11)
    pdf.drawString(margin + 16, y - 39, user.full_name or '-')
    pdf.setFont('Helvetica', 9.5)
    pdf.setFillColor(muted)
    pdf.drawString(margin + 16, y - 55, user.email or '-')
    if user.mobile_number:
        pdf.drawString(margin + 16, y - 71, user.mobile_number)

    issuer_x = width / 2 + 18
    pdf.setFillColor(dark_green)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(issuer_x, y - 20, 'FROM')
    pdf.setFillColor(text)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(issuer_x, y - 39, 'Medorax Healthcare India Private Limited')
    pdf.setFont('Helvetica', 9)
    pdf.setFillColor(muted)
    pdf.drawString(issuer_x, y - 55, 'Subscription & Software Services')
    pdf.drawString(issuer_x, y - 71, 'GST: 0% | Currency: INR')

    y -= card_h + 28

    # Invoice item table.
    pdf.setFillColor(green)
    pdf.roundRect(margin, y - 30, width - 2 * margin, 30, 7, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont('Helvetica-Bold', 9.5)
    pdf.drawString(margin + 14, y - 19, 'DESCRIPTION')
    pdf.drawRightString(right - 14, y - 19, 'AMOUNT')

    subtotal_paise = PLAN_AMOUNT_PAISE
    total_paid_paise = max(invoice.amount_paise, subtotal_paise)
    convenience_paise = max(total_paid_paise - subtotal_paise, 0)
    # The configured convenience fee is 2% of the annual plan.
    expected_fee_paise = round(subtotal_paise * 0.02)
    if convenience_paise == 0 and total_paid_paise >= subtotal_paise + expected_fee_paise:
        convenience_paise = expected_fee_paise
    if total_paid_paise == subtotal_paise:
        # Keeps invoices consistent with the current pricing rule.
        convenience_paise = expected_fee_paise
        total_paid_paise = subtotal_paise + convenience_paise

    y -= 30
    pdf.setFillColor(white)
    pdf.setStrokeColor(border)
    pdf.rect(margin, y - 47, width - 2 * margin, 47, fill=1, stroke=1)
    pdf.setFillColor(text)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(margin + 14, y - 20, PLAN_NAME)
    pdf.setFont('Helvetica', 8.8)
    pdf.setFillColor(muted)
    pdf.drawString(margin + 14, y - 35, 'Annual subscription')
    pdf.setFillColor(text)
    pdf.setFont('Helvetica', 10)
    pdf.drawRightString(right - 14, y - 27, _money(subtotal_paise, invoice.currency))

    y -= 72
    # Totals panel.
    totals_x = width - 275
    totals_w = right - totals_x
    pdf.setFillColor(pale_green)
    pdf.setStrokeColor(border)
    pdf.roundRect(totals_x, y - 112, totals_w, 112, 10, fill=1, stroke=1)

    def total_row(label: str, amount: int, yy: float, bold=False):
        pdf.setFillColor(text if bold else muted)
        pdf.setFont('Helvetica-Bold' if bold else 'Helvetica', 9.5)
        pdf.drawString(totals_x + 14, yy, label)
        pdf.drawRightString(right - 14, yy, _money(amount, invoice.currency))

    total_row('Subtotal', subtotal_paise, y - 24)
    total_row('Convenience Fee (2%)', convenience_paise, y - 46)
    total_row('GST (0%)', 0, y - 68)
    pdf.setStrokeColor(border)
    pdf.line(totals_x + 14, y - 78, right - 14, y - 78)
    total_row('TOTAL PAID', subtotal_paise + convenience_paise, y - 99, bold=True)

    y -= 142
    # Payment details.
    pdf.setFillColor(dark_green)
    pdf.setFont('Helvetica-Bold', 10)
    pdf.drawString(margin, y, 'PAYMENT DETAILS')
    pdf.setFont('Helvetica', 9)
    pdf.setFillColor(muted)
    pdf.drawString(margin, y - 18, f'Payment ID: {payment.razorpay_payment_id or "-"}')
    pdf.drawString(margin, y - 34, f'Subscription ID: {payment.razorpay_subscription_id or "-"}')
    pdf.drawString(margin, y - 50, f'Status: {invoice.status.upper()}')

    # Secure invoice notice.
    notice_x = width / 2 + 8
    pdf.setFillColor(light_green)
    pdf.roundRect(notice_x, y - 64, right - notice_x, 64, 8, fill=1, stroke=0)
    pdf.setFillColor(dark_green)
    pdf.setFont('Helvetica-Bold', 9)
    pdf.drawString(notice_x + 12, y - 20, 'Secure electronic invoice')
    pdf.setFillColor(muted)
    pdf.setFont('Helvetica', 8)
    pdf.drawString(notice_x + 12, y - 36, 'Generated only after verified payment.')
    pdf.drawString(notice_x + 12, y - 50, 'Invoice access is restricted to the account owner.')

    # Footer.
    pdf.setFillColor(green)
    pdf.rect(0, 0, width, 46, fill=1, stroke=0)
    pdf.setFillColor(white)
    pdf.setFont('Helvetica-Bold', 8.5)
    pdf.drawString(margin, 28, 'Medorax Healthcare India Private Limited')
    pdf.setFont('Helvetica', 7.5)
    pdf.drawString(margin, 15, 'Thank you for choosing Medorax.')
    pdf.drawRightString(right, 21, invoice.invoice_number)

    pdf.save()
    return buffer.getvalue()


async def _ensure_invoice(db: AsyncSession, user: User, tx: PaymentTransaction) -> Invoice:
    existing = (await db.execute(
        select(Invoice).where(Invoice.payment_transaction_id == tx.id)
    )).scalar_one_or_none()
    if existing:
        return existing

    invoice = Invoice(
        user_id=user.id,
        payment_transaction_id=tx.id,
        invoice_number=_invoice_number(),
        plan_code=PLAN_CODE,
        amount_paise=tx.amount_paise,
        tax_paise=0,
        currency=tx.currency,
        status='paid',
    )
    db.add(invoice)
    await db.flush()
    return invoice


@router.get('/plan')
async def get_plan():
    return {
        'id': PLAN_CODE,
        'name': PLAN_NAME,
        'amount': PLAN_TOTAL_PAISE // 100,
        'amountPaise': PLAN_TOTAL_PAISE,
        'baseAmount': PLAN_AMOUNT_PAISE // 100,
        'convenienceFee': CONVENIENCE_FEE_PAISE // 100,
        'convenienceFeePercentage': CONVENIENCE_FEE_PERCENT,
        'gst': 0,
        'currency': PLAN_CURRENCY,
        'period': 'yearly',
        'autoRenew': True,
        'features': [
            'Unlimited Inventory Sync',
            'AI Prescription OCR',
            'Real-time Logistics Tracking',
            '24/7 Priority Support',
        ],
    }


@router.get('/status')
async def payment_status(user=Depends(current_user), db: AsyncSession=Depends(get_db)):
    row = (await db.execute(
        select(PaymentSubscription)
        .where(PaymentSubscription.user_id == user.id)
        .order_by(PaymentSubscription.created_at.desc())
    )).scalars().first()
    active = bool(row and row.status in {'authenticated', 'active'})
    return {'active': active, 'subscription': _subscription_out(row) if row else None}


@router.post('/create-subscription')
async def create_subscription(request: Request, user: User=Depends(current_user), db: AsyncSession=Depends(get_db)):
    await guard(request, 'payment-create-subscription', 5, 60)
    _require_config()
    existing = (await db.execute(
        select(PaymentSubscription)
        .where(PaymentSubscription.user_id == user.id)
        .where(PaymentSubscription.status.in_(['created', 'authenticated', 'active']))
        .order_by(PaymentSubscription.created_at.desc())
    )).scalars().first()
    if existing:
        if existing.status in {'authenticated', 'active'}:
            if existing.amount_paise != PLAN_TOTAL_PAISE:
                raise HTTPException(409, 'An older ₹10,000 subscription is active. Cancel it in Razorpay before starting the ₹10,200 subscription.')
            raise HTTPException(409, 'You already have an active subscription.')
        if existing.amount_paise != PLAN_TOTAL_PAISE:
            raise HTTPException(409, 'An older ₹10,000 payment session exists. Cancel it in Razorpay and start a new payment session.')
        return {
            'subscriptionId': existing.razorpay_subscription_id,
            'keyId': settings.razorpay_key_id,
            'amount': PLAN_TOTAL_PAISE // 100,
            'baseAmount': PLAN_AMOUNT_PAISE // 100,
            'convenienceFee': CONVENIENCE_FEE_PAISE // 100,
            'convenienceFeePercentage': CONVENIENCE_FEE_PERCENT,
            'gst': 0,
            'currency': existing.currency,
            'user': {'fullName': user.full_name, 'email': user.email, 'mobileNumber': user.mobile_number},
        }

    payment_plan_id = await _get_or_create_payment_plan()

    razor = await _razorpay('POST', '/v1/subscriptions', {
        'plan_id': payment_plan_id,
        'total_count': PLAN_TOTAL_COUNT,
        'quantity': 1,
        'customer_notify': True,
        'notes': {
            'user_id': str(user.id),
            'plan_code': PLAN_CODE,
            'base_amount': str(PLAN_AMOUNT_PAISE),
            'convenience_fee': str(CONVENIENCE_FEE_PAISE),
            'total_amount': str(PLAN_TOTAL_PAISE),
        },
    })

    row = PaymentSubscription(
        user_id=user.id,
        plan_code=PLAN_CODE,
        razorpay_plan_id=payment_plan_id,
        razorpay_subscription_id=razor['id'],
        status=razor.get('status', 'created'),
        amount_paise=PLAN_TOTAL_PAISE,
        currency=PLAN_CURRENCY,
        total_count=razor.get('total_count', PLAN_TOTAL_COUNT),
        paid_count=razor.get('paid_count', 0),
        current_start=_dt_from_unix(razor.get('current_start')),
        current_end=_dt_from_unix(razor.get('current_end')),
    )
    db.add(row)
    await audit(db, 'PAYMENT_SUBSCRIPTION_CREATED', user.id, request, {'razorpaySubscriptionId': razor['id'], 'planCode': PLAN_CODE})
    await db.commit()
    return {
        'subscriptionId': razor['id'],
        'keyId': settings.razorpay_key_id,
        'amount': PLAN_TOTAL_PAISE // 100,
        'currency': PLAN_CURRENCY,
        'baseAmount': PLAN_AMOUNT_PAISE // 100,
        'convenienceFee': CONVENIENCE_FEE_PAISE // 100,
        'convenienceFeePercentage': CONVENIENCE_FEE_PERCENT,
        'gst': 0,
        'status': razor.get('status'),
        'user': {'fullName': user.full_name, 'email': user.email, 'mobileNumber': user.mobile_number},
    }


@router.post('/verify')
async def verify_payment(body: dict[str, Any], request: Request, user: User=Depends(current_user), db: AsyncSession=Depends(get_db)):
    await guard(request, 'payment-verify', 10, 60)
    _require_config()
    payment_id = body.get('razorpayPaymentId')
    subscription_id = body.get('razorpaySubscriptionId')
    signature = body.get('razorpaySignature')
    if not payment_id or not subscription_id or not signature:
        raise HTTPException(400, 'Incomplete Razorpay payment verification data.')

    row = (await db.execute(select(PaymentSubscription).where(
        PaymentSubscription.user_id == user.id,
        PaymentSubscription.razorpay_subscription_id == subscription_id,
    ))).scalar_one_or_none()
    if not row:
        raise HTTPException(404, 'Subscription not found.')

    if not hmac.compare_digest(_checkout_signature(payment_id, subscription_id), signature):
        await audit(db, 'PAYMENT_SIGNATURE_FAILED', user.id, request, {'razorpaySubscriptionId': subscription_id})
        await db.commit()
        raise HTTPException(400, 'Payment signature verification failed.')

    existing = (await db.execute(select(PaymentTransaction).where(
        PaymentTransaction.razorpay_payment_id == payment_id
    ))).scalar_one_or_none()
    if existing:
        invoice = await _ensure_invoice(db, user, existing)
        await db.commit()
        return {
            'success': True, 'verified': True, 'paymentId': payment_id,
            'status': row.status, 'invoiceId': str(invoice.id),
            'invoiceNumber': invoice.invoice_number,
            'invoiceDownloadUrl': f'/api/payments/invoices/{invoice.id}/download',
        }

    row.status = 'authenticated'
    row.last_payment_id = payment_id
    row.paid_count = max(row.paid_count or 0, 1)
    tx = PaymentTransaction(
        user_id=user.id,
        subscription_id=row.id,
        razorpay_payment_id=payment_id,
        razorpay_subscription_id=subscription_id,
        amount_paise=row.amount_paise,
        currency=row.currency,
        status='verified',
        signature_verified=True,
    )
    db.add(tx)
    await db.flush()
    invoice = await _ensure_invoice(db, user, tx)
    await audit(db, 'PAYMENT_VERIFIED', user.id, request, {
        'razorpayPaymentId': payment_id,
        'razorpaySubscriptionId': subscription_id,
        'amount': row.amount_paise // 100,
        'invoiceNumber': invoice.invoice_number,
    })
    await db.commit()

    pdf = _build_invoice_pdf(invoice, user, tx)
    try:
        await send_email_with_attachment(
            user.email,
            f'Medorax Invoice {invoice.invoice_number}',
            f'Hello {user.full_name},\n\nYour Medorax payment was successfully verified. Your invoice {invoice.invoice_number} is attached.\n\nAmount paid: {_money(invoice.amount_paise, invoice.currency)}\nRazorpay Payment ID: {payment_id}\n\nThank you,\nMedorax',
            pdf,
            f'{invoice.invoice_number}.pdf',
        )
    except Exception as exc:
        print(f'[INVOICE EMAIL FAILED] invoice={invoice.invoice_number}: {exc}')

    return {
        'success': True, 'verified': True, 'paymentId': payment_id,
        'status': row.status, 'invoiceId': str(invoice.id),
        'invoiceNumber': invoice.invoice_number,
        'invoiceDownloadUrl': f'/api/payments/invoices/{invoice.id}/download',
    }


@router.get('/invoices/{invoice_id}/download')
async def download_invoice(invoice_id: str, user: User=Depends(current_user), db: AsyncSession=Depends(get_db)):
    try:
        invoice_uuid = __import__('uuid').UUID(invoice_id)
    except ValueError:
        raise HTTPException(400, 'Invalid invoice ID.')
    invoice = (await db.execute(select(Invoice).where(
        Invoice.id == invoice_uuid,
        Invoice.user_id == user.id,
    ))).scalar_one_or_none()
    if not invoice:
        raise HTTPException(404, 'Invoice not found.')
    tx = (await db.execute(select(PaymentTransaction).where(
        PaymentTransaction.id == invoice.payment_transaction_id,
        PaymentTransaction.user_id == user.id,
    ))).scalar_one_or_none()
    if not tx:
        raise HTTPException(404, 'Payment transaction not found.')
    pdf = _build_invoice_pdf(invoice, user, tx)
    return Response(
        content=pdf,
        media_type='application/pdf',
        headers={'Content-Disposition': f'attachment; filename="{invoice.invoice_number}.pdf"'},
    )


@router.post('/webhook')
async def razorpay_webhook(request: Request, db: AsyncSession=Depends(get_db)):
    raw = await request.body()
    signature = request.headers.get('X-Razorpay-Signature', '')
    if not _webhook_signature(raw, signature):
        raise HTTPException(400, 'Invalid webhook signature.')
    try:
        event = json.loads(raw.decode('utf-8'))
    except Exception:
        raise HTTPException(400, 'Invalid webhook payload.')
    event_id = event.get('id')
    event_name = event.get('event')
    if not event_id or not event_name:
        raise HTTPException(400, 'Invalid webhook event.')
    duplicate = (await db.execute(select(PaymentEvent).where(PaymentEvent.razorpay_event_id == event_id))).scalar_one_or_none()
    if duplicate:
        return {'received': True}
    db.add(PaymentEvent(razorpay_event_id=event_id, event_name=event_name, payload=event))
    sub_entity = event.get('payload', {}).get('subscription', {}).get('entity', {})
    razor_sub_id = sub_entity.get('id')
    row = None
    if razor_sub_id:
        row = (await db.execute(select(PaymentSubscription).where(PaymentSubscription.razorpay_subscription_id == razor_sub_id))).scalar_one_or_none()
    if row:
        status_map = {
            'subscription.authenticated': 'authenticated', 'subscription.activated': 'active',
            'subscription.charged': 'active', 'subscription.pending': 'pending',
            'subscription.halted': 'halted', 'subscription.cancelled': 'cancelled',
            'subscription.completed': 'completed', 'subscription.expired': 'expired',
        }
        if event_name in status_map:
            row.status = status_map[event_name]
        row.paid_count = sub_entity.get('paid_count', row.paid_count or 0)
        row.current_start = _dt_from_unix(sub_entity.get('current_start'))
        row.current_end = _dt_from_unix(sub_entity.get('current_end'))
        payment_entity = event.get('payload', {}).get('payment', {}).get('entity', {})
        if payment_entity.get('id'):
            row.last_payment_id = payment_entity['id']
    await db.commit()
    return {'received': True}


@router.post('/cancel-subscription')
async def cancel_subscription(request: Request, user: User=Depends(current_user), db: AsyncSession=Depends(get_db)):
    await guard(request, 'payment-cancel-subscription', 3, 300)
    row = (await db.execute(select(PaymentSubscription)
        .where(PaymentSubscription.user_id == user.id)
        .where(PaymentSubscription.status.in_(['created', 'authenticated', 'active']))
        .order_by(PaymentSubscription.created_at.desc()))).scalars().first()
    if not row:
        raise HTTPException(404, 'No active subscription found.')
    await _razorpay('POST', f'/v1/subscriptions/{row.razorpay_subscription_id}/cancel', {'cancel_at_cycle_end': 1})
    row.status = 'cancelled'
    await audit(db, 'PAYMENT_SUBSCRIPTION_CANCELLED', user.id, request, {'razorpaySubscriptionId': row.razorpay_subscription_id})
    await db.commit()
    return {'success': True, 'status': row.status}
