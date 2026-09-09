import logging
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.middleware.trustedhost import TrustedHostMiddleware

from sqlalchemy import select

from app.core.config import settings
from app.db.base import Base
from app.db.session import engine, SessionLocal
from app.models import *
from app.api.router import api
from app.core.security import hash_password


# ---------------------------------------------------------
# Logging
# ---------------------------------------------------------

logging.basicConfig(
    level=getattr(
        logging,
        settings.log_level.upper(),
        logging.INFO,
    ),
    format=(
        "%(asctime)s | "
        "%(levelname)s | "
        "%(name)s | "
        "%(message)s"
    ),
)

logger = logging.getLogger(
    "medorax-admin"
)


# ---------------------------------------------------------
# Application lifespan
# ---------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info(
        "Starting Medorax Admin API"
    )

    logger.info(
        "Environment: %s",
        settings.environment,
    )

    logger.info(
        "Database configured: %s",
        bool(settings.database_url),
    )

    # -----------------------------------------------------
    # Create tables
    # -----------------------------------------------------

    async with engine.begin() as conn:

        await conn.run_sync(
            Base.metadata.create_all
        )

    logger.info(
        "Database tables initialized"
    )

    # -----------------------------------------------------
    # Bootstrap admin
    # -----------------------------------------------------

    if (
        settings.admin_bootstrap_email
        and settings.admin_bootstrap_password
    ):

        async with SessionLocal() as db:

            email = (
                settings.admin_bootstrap_email
                .lower()
                .strip()
            )

            existing = (
                await db.execute(
                    select(AdminUser)
                    .where(
                        AdminUser.email == email
                    )
                )
            ).scalar_one_or_none()

            if not existing:

                logger.info(
                    "Creating bootstrap admin: %s",
                    email,
                )

                db.add(
                    AdminUser(
                        email=email,
                        full_name="Medorax Owner",
                        role="Owner",
                        password_hash=hash_password(
                            settings.admin_bootstrap_password
                        ),
                    )
                )

                await db.commit()

            else:

                logger.info(
                    "Bootstrap admin already exists: %s",
                    email,
                )

    yield

    logger.info(
        "Stopping Medorax Admin API"
    )

    await engine.dispose()


# ---------------------------------------------------------
# FastAPI
# ---------------------------------------------------------

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    docs_url=(
        "/docs"
        if settings.enable_docs
        else None
    ),
    redoc_url=(
        "/redoc"
        if settings.enable_docs
        else None
    ),
    lifespan=lifespan,
)


# ---------------------------------------------------------
# Trusted hosts
# ---------------------------------------------------------

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=(
        settings.trusted_hosts
        or ["*"]
    ),
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.admin_frontend_origins,
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PATCH",
        "PUT",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "Content-Type",
        "Accept",
        "Authorization",
        "X-Request-ID",
    ],
)


# ---------------------------------------------------------
# Security headers + exception logging
# ---------------------------------------------------------

@app.middleware("http")
async def security_headers(
    request: Request,
    call_next,
):
    request_id = (
        request.headers.get(
            "X-Request-ID"
        )
        or str(uuid.uuid4())
    )

    try:

        response = await call_next(
            request
        )

    except Exception:

        logger.exception(
            "Unhandled exception | "
            "request_id=%s | "
            "method=%s | "
            "path=%s",
            request_id,
            request.method,
            request.url.path,
        )

        return JSONResponse(
            status_code=500,
            content={
                "message": "Internal server error",
                "requestId": request_id,
            },
            headers={
                "X-Request-ID": request_id,
            },
        )

    response.headers[
        "X-Request-ID"
    ] = request_id

    response.headers[
        "X-Content-Type-Options"
    ] = "nosniff"

    response.headers[
        "X-Frame-Options"
    ] = "DENY"

    response.headers[
        "Referrer-Policy"
    ] = "no-referrer"

    response.headers[
        "Cache-Control"
    ] = "no-store"

    if (
        settings.environment
        == "production"
    ):
        response.headers[
            "Strict-Transport-Security"
        ] = (
            "max-age=31536000; "
            "includeSubDomains"
        )

    return response


# ---------------------------------------------------------
# Health
# ---------------------------------------------------------

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "medorax-admin-api",
        "version": settings.app_version,
    }


# ---------------------------------------------------------
# API
# ---------------------------------------------------------

app.include_router(api)