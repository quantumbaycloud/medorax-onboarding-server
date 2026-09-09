from twilio.rest import Client

from app.core.config import settings


def send_otp(to: str) -> str:
    """
    Send OTP using Twilio Verify.
    Twilio generates and sends the OTP.
    """

    if not settings.twilio_account_sid:
        raise RuntimeError("TWILIO_ACCOUNT_SID is not configured")

    if not settings.twilio_auth_token:
        raise RuntimeError("TWILIO_AUTH_TOKEN is not configured")

    if not settings.twilio_verify_service_sid:
        raise RuntimeError("TWILIO_VERIFY_SERVICE_SID is not configured")

    client = Client(
        settings.twilio_account_sid,
        settings.twilio_auth_token,
    )

    verification = (
        client.verify
        .v2
        .services(settings.twilio_verify_service_sid)
        .verifications
        .create(
            to=to,
            channel="sms",
        )
    )

    return verification.status


def verify_otp(to: str, code: str) -> str:
    """
    Verify OTP using Twilio Verify.
    """

    if not settings.twilio_account_sid:
        raise RuntimeError("TWILIO_ACCOUNT_SID is not configured")

    if not settings.twilio_auth_token:
        raise RuntimeError("TWILIO_AUTH_TOKEN is not configured")

    if not settings.twilio_verify_service_sid:
        raise RuntimeError("TWILIO_VERIFY_SERVICE_SID is not configured")

    client = Client(
        settings.twilio_account_sid,
        settings.twilio_auth_token,
    )

    verification_check = (
        client.verify
        .v2
        .services(settings.twilio_verify_service_sid)
        .verification_checks
        .create(
            to=to,
            code=code,
        )
    )

    return verification_check.status    