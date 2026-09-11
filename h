import asyncio
import smtplib
from email.message import EmailMessage
from pathlib import Path

from app.core.config import settings


async def send_email(to: str, subject: str, text: str):
    await send_email_with_attachment(to, subject, text, None, None)


async def send_email_with_attachment(
    to: str,
    subject: str,
    text: str,
    attachment_bytes: bytes | None = None,
    attachment_name: str | None = None,
):
    if not settings.smtp_host:
        if settings.environment != 'production':
            print(f'[DEV EMAIL] to={to} subject={subject}\n{text}')
        return

    def _send():
        msg = EmailMessage()
        msg['From'] = settings.smtp_from
        msg['To'] = to
        msg['Subject'] = subject
        msg.set_content(text)
        if attachment_bytes and attachment_name:
            msg.add_attachment(
                attachment_bytes,
                maintype='application',
                subtype='pdf',
                filename=Path(attachment_name).name,
            )
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as s:
            if settings.smtp_starttls:
                s.starttls()
            if settings.smtp_username:
                s.login(settings.smtp_username, settings.smtp_password)
            s.send_message(msg)

    await asyncio.to_thread(_send)
