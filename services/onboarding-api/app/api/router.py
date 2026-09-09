from fastapi import APIRouter
from app.api.routes.auth import router as auth_router
from app.api.routes.onboarding import router as onboarding_router
from app.api.routes.admin import router as admin_router
from app.api.routes.payments import router as payments_router
from app.api.routes.application import router as application_router
api=APIRouter()
api.include_router(auth_router)
api.include_router(onboarding_router)
api.include_router(admin_router)
api.include_router(payments_router)
api.include_router(application_router)
