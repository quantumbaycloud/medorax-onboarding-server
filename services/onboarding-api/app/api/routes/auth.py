from datetime import datetime,timedelta,timezone
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Request,
    Response,
    Cookie,
)
from sqlalchemy import select,delete
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models import User,RefreshToken,OneTimeToken,MobileOtpSession
from app.schemas import *
from app.core.security import hash_password,verify_password,token_hash
from app.core.config import settings
from app.core.rate_limit import guard

from app.services.auth import issue_tokens,send_verification, send_reset
from app.services.sms import send_otp, verify_otp
from app.services.audit import audit
import secrets,hashlib


router=APIRouter(prefix='/auth',tags=['Auth'])
ACCESS_COOKIE = "access_token"
REFRESH_COOKIE = "refresh_token"

COOKIE_SECURE = settings.environment == "production"
COOKIE_SAMESITE = "lax"


def set_auth_cookies(
    response: Response,
    access_token: str,
    refresh_token: str,
):
    response.set_cookie(
        key=ACCESS_COOKIE,
        value=access_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=settings.access_token_minutes * 60,
        path="/",
    )

    response.set_cookie(
        key=REFRESH_COOKIE,
        value=refresh_token,
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=30 * 24 * 60 * 60,
        path="/api/auth",
    )


def clear_auth_cookies(response: Response):
    response.delete_cookie(
        key=ACCESS_COOKIE,
        path="/",
    )

    response.delete_cookie(
        key=REFRESH_COOKIE,
        path="/api/auth",
    )

def err(msg): raise HTTPException(status_code=400,detail=msg)

@router.post('/register')
async def register(body:RegisterRequest,request:Request,db:AsyncSession=Depends(get_db)):
    await guard(request,'register',5,60)
    email=str(body.email).lower()
    if (await db.execute(select(User).where(User.email==email))).scalar_one_or_none(): err('Unable to register with these details')
    user=User(full_name=body.fullName,email=email,mobile_number=body.mobileNumber,password_hash=hash_password(body.password))
    db.add(user); await db.flush(); await send_verification(db,user); await audit(db,'REGISTER',user.id,request); await db.commit()
    return {'message':'Registration successful. Please verify your email.'}

@router.post("/login")
async def login(
    body: LoginRequest,
    request: Request,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    await guard(request, "login", 5, 60)

    user = (
        await db.execute(
            select(User).where(
                User.email == str(body.email).lower()
            )
        )
    ).scalar_one_or_none()

    if not user or not verify_password(
        body.password,
        user.password_hash,
    ):
        await audit(
            db,
            "LOGIN_FAILED",
            user.id if user else None,
            request,
        )

        await db.commit()

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Account is disabled",
        )

    access, refresh = await issue_tokens(
        db,
        user,
        request,
    )

    await audit(
        db,
        "LOGIN_SUCCESS",
        user.id,
        request,
    )

    await db.commit()

    set_auth_cookies(
        response,
        access,
        refresh,
    )

    return {
        "userId": str(user.id),
        "fullName": user.full_name,
        "email": user.email,
        "role": user.role,
        "expiresIn": settings.access_token_minutes * 60,
    }


@router.get("/me")
async def get_current_user(
    access_token: str | None = Cookie(
        default=None,
        alias=ACCESS_COOKIE,
    ),
    db: AsyncSession = Depends(get_db),
):
    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    try:
        from app.core.security import decode_access_token

        payload = decode_access_token(
            access_token
        )

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired access token",
        )

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=401,
            detail="Invalid access token",
        )

    user = await db.get(
        User,
        user_id,
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=403,
            detail="Account is disabled",
        )

    return {
        "authenticated": True,
        "user": {
            "userId": str(user.id),
            "fullName": user.full_name,
            "email": user.email,
            "mobileNumber": user.mobile_number,
            "role": user.role,
            "businessType": user.business_type,
        },
    }

@router.post("/refresh")
async def refresh(
    request: Request,
    response: Response,
    refresh_token: str | None = Cookie(
        default=None,
        alias=REFRESH_COOKIE,
    ),
    db: AsyncSession = Depends(get_db),
):
    await guard(request, "refresh", 10, 60)

    if not refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Refresh token missing",
        )

    h = token_hash(refresh_token)

    row = (
        await db.execute(
            select(RefreshToken).where(
                RefreshToken.token_hash == h
            )
        )
    ).scalar_one_or_none()

    now = datetime.now(timezone.utc)

    if (
        not row
        or row.revoked_at
        or row.expires_at <= now
    ):
        clear_auth_cookies(response)

        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token",
        )

    user = await db.get(
        User,
        row.user_id,
    )

    if not user or not user.is_active:
        clear_auth_cookies(response)

        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token",
        )

    access, newraw = await issue_tokens(
        db,
        user,
        request,
    )

    row.revoked_at = now
    row.replaced_by = token_hash(newraw)

    await audit(
        db,
        "REFRESH",
        user.id,
        request,
    )

    await db.commit()

    set_auth_cookies(
        response,
        access,
        newraw,
    )

    return {
        "message": "Token refreshed",
        "userId": str(user.id),
        "fullName": user.full_name,
        "email": user.email,
        "role": user.role,
        "expiresIn": settings.access_token_minutes * 60,
    }

@router.post("/logout")
async def logout(
    request: Request,
    response: Response,
    refresh_token: str | None = Cookie(
        default=None,
        alias=REFRESH_COOKIE,
    ),
    db: AsyncSession = Depends(get_db),
):
    if refresh_token:
        row = (
            await db.execute(
                select(RefreshToken).where(
                    RefreshToken.token_hash
                    == token_hash(refresh_token)
                )
            )
        ).scalar_one_or_none()

        if row and not row.revoked_at:
            row.revoked_at = datetime.now(
                timezone.utc
            )

            await audit(
                db,
                "LOGOUT",
                row.user_id,
                request,
            )

    await db.commit()

    clear_auth_cookies(response)

    return {
        "message": "Logged out successfully"
    }

@router.post('/verify-email')
async def verify_email(body:VerifyEmailRequest,request:Request,db:AsyncSession=Depends(get_db)):
    row=(await db.execute(select(OneTimeToken).where(OneTimeToken.token_hash==token_hash(body.token),OneTimeToken.purpose=='email_verify'))).scalar_one_or_none(); now=datetime.now(timezone.utc)
    if not row or row.used_at or row.expires_at<=now: raise HTTPException(status_code=400,detail='Invalid or expired verification token')
    user=await db.get(User,row.user_id)
    if not user: raise HTTPException(status_code=400,detail='Invalid verification token')
    user.email_verified=True; row.used_at=now; await audit(db,'EMAIL_VERIFIED',user.id,request); await db.commit(); return {'message':'Email verified successfully'}

@router.post('/resend-verification')
async def resend(body:EmailRequest,request:Request,db:AsyncSession=Depends(get_db)):
    await guard(request,'resend-verification',3,300)
    user=(await db.execute(select(User).where(User.email==str(body.email).lower()))).scalar_one_or_none()
    # Generic response prevents account enumeration.
    if user and not user.email_verified: await send_verification(db,user); await db.commit()
    return {'message':'If the account exists and needs verification, a verification email has been sent.'}

@router.post('/forgot-password')
async def forgot(body:EmailRequest,request:Request,db:AsyncSession=Depends(get_db)):
    await guard(request,'forgot-password',3,300)
    user=(await db.execute(select(User).where(User.email==str(body.email).lower()))).scalar_one_or_none()
    if user and user.is_active: await send_reset(db,user); await audit(db,'PASSWORD_RESET_REQUESTED',user.id,request); await db.commit()
    return {'message':'If an account exists for that email, password reset instructions have been sent.'}

@router.post('/reset-password')
async def reset(body:ResetPasswordRequest,request:Request,db:AsyncSession=Depends(get_db)):
    await guard(request,'reset-password',5,300)
    row=(await db.execute(select(OneTimeToken).where(OneTimeToken.token_hash==token_hash(body.token),OneTimeToken.purpose=='password_reset'))).scalar_one_or_none(); now=datetime.now(timezone.utc)
    if not row or row.used_at or row.expires_at<=now: raise HTTPException(status_code=400,detail='Invalid or expired reset token')
    user=await db.get(User,row.user_id)
    if not user: raise HTTPException(status_code=400,detail='Invalid reset token')
    user.password_hash=hash_password(body.newPassword); row.used_at=now
    # Revoke every active refresh token after a password change.
    await db.execute(__import__('sqlalchemy').update(RefreshToken).where(RefreshToken.user_id==user.id,RefreshToken.revoked_at.is_(None)).values(revoked_at=now))
    await audit(db,'PASSWORD_RESET_COMPLETED',user.id,request); await db.commit(); return {'message':'Password reset successfully'}

@router.post('/send-mobile-otp')
async def send_otp_route(
    body: SendOtpRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    await guard(request, 'otp-send', 3, 600)

    mobile_number = body.mobileNumber.strip()

    try:
        status = send_otp(mobile_number)

        print(
            f"[TWILIO VERIFY] OTP sent to "
            f"******{mobile_number[-4:]}, status={status}"
        )

    except Exception as exc:
        print(f"[TWILIO ERROR] {exc}")

        raise HTTPException(
            status_code=502,
            detail="Unable to send verification OTP. Please try again."
        )

    return {
        "message": "OTP sent successfully",
        "expiresIn": settings.otp_ttl_seconds,
    }


    
@router.post('/verify-mobile-otp')
async def verify_otp_route(
    body: VerifyOtpRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    await guard(request, 'otp-verify', 10, 600)

    mobile_number = body.mobileNumber.strip()
    otp = body.otp.strip()

    try:
        status = verify_otp(
            to=mobile_number,
            code=otp,
        )

        print(
            f"[TWILIO VERIFY] OTP verification "
            f"for ******{mobile_number[-4:]}: {status}"
        )

    except Exception as exc:
        print(f"[TWILIO VERIFY ERROR] {exc}")

        raise HTTPException(
            status_code=502,
            detail="Unable to verify OTP. Please try again."
        )

    if status != "approved":
        raise HTTPException(
            status_code=400,
            detail="Invalid or expired OTP"
        )

    user = (
        await db.execute(
            select(User).where(
                User.mobile_number == mobile_number
            )
        )
    ).scalar_one_or_none()

    if user:
        user.mobile_verified = True

        await audit(
            db,
            'OTP_VERIFIED',
            user.id,
            request,
            {
                'mobileLast4': mobile_number[-4:]
            }
        )

    await db.commit()

    return {
        "message": "Mobile number verified successfully",
        "verified": True
    }