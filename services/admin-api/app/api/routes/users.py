from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import require_admin
from app.db.session import get_db
from app.models import User

router = APIRouter(prefix="/admin/users", tags=["Admin Users"])

@router.get("")
async def users(admin=Depends(require_admin("Owner", "Admin")), db: AsyncSession = Depends(get_db)):
    rows = (await db.execute(select(User).order_by(User.created_at.desc()).limit(500))).scalars().all()
    return [{
        "id": str(x.id), "fullName": x.full_name, "email": x.email, "mobileNumber": x.mobile_number,
        "role": x.role, "businessType": x.business_type, "emailVerified": x.email_verified,
        "mobileVerified": x.mobile_verified, "isActive": x.is_active, "createdAt": x.created_at,
    } for x in rows]

@router.patch("/{user_id}/disable")
async def disable_user(user_id: UUID, admin=Depends(require_admin("Owner", "Admin")), db: AsyncSession = Depends(get_db)):
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(404, "User not found")
    user.is_active = False
    await db.commit()
    return {"message": "User disabled"}
