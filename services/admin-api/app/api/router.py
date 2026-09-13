from fastapi import APIRouter
from app.api.routes.auth import router as auth_router
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes.applications import router as applications_router
from app.api.routes.users import router as users_router
from app.api.routes.erp_control import router as erp_control_router, machine_router as erp_machine_router

api = APIRouter(prefix="/api")
api.include_router(auth_router)
api.include_router(dashboard_router)
api.include_router(applications_router)
api.include_router(users_router)

api.include_router(erp_control_router)

api.include_router(erp_machine_router)
