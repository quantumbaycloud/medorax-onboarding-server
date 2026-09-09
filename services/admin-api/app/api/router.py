from fastapi import APIRouter
from app.api.routes.auth import router as auth_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.applications import router as applications_router
from app.api.routes.users import router as users_router

api = APIRouter(prefix="/api")
api.include_router(auth_router)
api.include_router(dashboard_router)
api.include_router(applications_router)
api.include_router(users_router)
