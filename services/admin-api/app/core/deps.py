from fastapi import Cookie, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.security import decode_admin_token
from app.db.session import get_db
from app.models import AdminUser

async def current_admin(
    request: Request,
    token: str | None = Cookie(default=None, alias=settings.admin_cookie_name),
    db: AsyncSession = Depends(get_db),
):
    if not token:
        raise HTTPException(401, "Admin authentication required")
    try:
        payload = decode_admin_token(token)
    except Exception:
        raise HTTPException(401, "Invalid or expired admin session")
    admin_id = payload.get("sub")
    admin = await db.get(AdminUser, admin_id)
    if not admin or not admin.is_active:
        raise HTTPException(403, "Admin account is disabled")
    request.state.admin_id = str(admin.id)
    return admin

def require_admin(*roles):
    async def dep(admin=Depends(current_admin)):
        if roles and admin.role not in roles:
            raise HTTPException(403, "Insufficient admin permissions")
        return admin
    return dep
