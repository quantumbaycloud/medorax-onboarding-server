import logging
import time

import httpx

from app.core.config import settings


logger = logging.getLogger("medorax-admin.licensing")


async def issue_signed_license(
    tenant_id: str,
    plan: str | None = None,
    expires_at=None,
    max_devices: int | None = None,
    modules: list[str] | None = None,
):
    """
    Issue a cryptographically signed MEDORAX ERP commercial license.

    The private signing key stays inside the licensing issuer.
    Admin API never receives or stores the private key.
    """

    issuer_url = (
        settings.license_issuer_url or ""
    ).rstrip("/")

    if not issuer_url:
        raise RuntimeError(
            "LICENSE_ISSUER_URL is not configured"
        )

    if expires_at is None:
        raise RuntimeError(
            "License expiration date is required"
        )

    if hasattr(expires_at, "timestamp"):
        expires_timestamp = int(
            expires_at.timestamp()
        )
    else:
        expires_timestamp = int(expires_at)

    if expires_timestamp <= int(time.time()):
        raise RuntimeError(
            "License expiration date must be in the future"
        )

    payload = {
        "tenant_id": str(tenant_id),
        "plan": (
            plan
            or settings.license_plan
        ),
        "expires_at": expires_timestamp,
        "max_devices": (
            max_devices
            or settings.license_max_devices
        ),
        "modules": (
            modules
            if modules is not None
            else settings.license_modules
        ),
    }

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }

    if settings.license_issuer_token:
        headers["X-Issuer-Token"] = (
            settings.license_issuer_token
        )

    try:
        async with httpx.AsyncClient(
            timeout=15
        ) as client:

            response = await client.post(
                f"{issuer_url}/v1/licenses",
                json=payload,
                headers=headers,
            )

        if response.status_code >= 400:
            try:
                detail = response.json().get(
                    "detail",
                    "License issuer rejected request",
                )
            except Exception:
                detail = response.text[:1000]

            raise RuntimeError(
                f"License issuer returned HTTP "
                f"{response.status_code}: {detail}"
            )

        data = response.json()

        license_payload = data.get("license")
        signature = data.get("signature")

        if not isinstance(
            license_payload,
            dict,
        ):
            raise RuntimeError(
                "License issuer returned an invalid license payload"
            )

        if not signature:
            raise RuntimeError(
                "License issuer returned no signature"
            )

        if license_payload.get("product") != "MEDORAX-ERP":
            raise RuntimeError(
                "License issuer returned an invalid product"
            )

        if str(
            license_payload.get("tenant_id")
        ) != str(tenant_id):
            raise RuntimeError(
                "License issuer returned a license for another tenant"
            )

        return {
            "license": license_payload,
            "signature": str(signature),
        }

    except httpx.TimeoutException as exc:
        logger.exception(
            "Commercial license issuer timeout"
        )
        raise RuntimeError(
            "Commercial license issuer timeout"
        ) from exc

    except httpx.HTTPError as exc:
        logger.exception(
            "Commercial license issuer connection failed"
        )
        raise RuntimeError(
            "Commercial license issuer unavailable"
        ) from exc
