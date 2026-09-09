from uuid import UUID
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy import select,func
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models import User,Document,AuditLog
from app.schemas import AdminUserUpdate
from app.core.deps import require_roles
from app.services.audit import audit

router=APIRouter(prefix='/admin',tags=['Admin'])
@router.get('/stats')
async def stats(user=Depends(require_roles('Admin','Owner')),db:AsyncSession=Depends(get_db)):
    return {'users':await db.scalar(select(func.count()).select_from(User)),'documents':await db.scalar(select(func.count()).select_from(Document)),'auditEvents':await db.scalar(select(func.count()).select_from(AuditLog))}
@router.get('/users')
async def users(user=Depends(require_roles('Admin','Owner')),db:AsyncSession=Depends(get_db)):
    rows=(await db.execute(select(User).order_by(User.created_at.desc()).limit(500))).scalars().all()
    return [{'id':str(x.id),'fullName':x.full_name,'email':x.email,'mobileNumber':x.mobile_number,'role':x.role,'businessType':x.business_type,'emailVerified':x.email_verified,'mobileVerified':x.mobile_verified,'isActive':x.is_active,'createdAt':x.created_at} for x in rows]
@router.patch('/users/{id}')
async def update_user(id:UUID,body:AdminUserUpdate,user=Depends(require_roles('Admin','Owner')),db:AsyncSession=Depends(get_db)):
    target=await db.get(User,id)
    if not target: raise HTTPException(404,'User not found')
    if target.id==user.id and body.isActive is False: raise HTTPException(400,'You cannot disable your own account')
    if body.role is not None: target.role=body.role
    if body.isActive is not None: target.is_active=body.isActive
    await audit(db,'ADMIN_USER_UPDATED',user.id,None,{'targetUserId':str(target.id)}); await db.commit(); return {'message':'User updated'}
