from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.deps import current_admin
from app.core.security import create_admin_token, hash_password, verify_password
from app.db.session import get_db
from app.models import AdminUser
from app.schemas import LoginRequest, AdminUserCreate

router = APIRouter(prefix="/admin/auth", tags=["Admin Auth"])

@router.post("/login")
async def login(body: LoginRequest, response: Response, db: AsyncSession = Depends(get_db)):
    admin = (await db.execute(select(AdminUser).where(AdminUser.email == str(body.email).lower()))).scalar_one_or_none()
    if not admin or not verify_password(body.password, admin.password_hash):
        raise HTTPException(401, "Invalid admin email or password")
    if not admin.is_active:
        raise HTTPException(403, "Admin account is disabled")

    token = create_admin_token(str(admin.id), admin.role, admin.email)
    response.set_cookie(
        key=settings.admin_cookie_name,
        value=token,
        httponly=True,
        secure=settings.admin_cookie_secure,
        samesite=settings.admin_cookie_samesite,
        max_age=settings.admin_access_token_minutes * 60,
        path="/",
    )
    return {"message": "Login successful", "admin": {"id": str(admin.id), "email": admin.email, "fullName": admin.full_name, "role": admin.role}}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(settings.admin_cookie_name, path="/")
    return {"message": "Logged out"}

@router.get("/me")
async def me(admin=Depends(current_admin)):
    return {"id": str(admin.id), "email": admin.email, "fullName": admin.full_name, "role": admin.role}

@router.post("/admins")
async def create_admin(body: AdminUserCreate, admin=Depends(current_admin), db: AsyncSession = Depends(get_db)):
    if admin.role != "Owner":
        raise HTTPException(403, "Only Owner admins can create admins")
    email = str(body.email).lower()
    exists = (await db.execute(select(AdminUser).where(AdminUser.email == email))).scalar_one_or_none()
    if exists:
        raise HTTPException(409, "Admin email already exists")
    row = AdminUser(email=email, full_name=body.fullName, role=body.role, password_hash=hash_password(body.password))
    db.add(row)
    await db.commit()
    await db.refresh(row)
    return {"id": str(row.id), "email": row.email, "fullName": row.full_name, "role": row.role}
