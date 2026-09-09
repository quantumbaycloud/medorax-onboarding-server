from sqlalchemy.ext.asyncio import AsyncSession
from app.models import AuditLog
async def audit(db: AsyncSession, action: str, user_id=None, request=None, metadata=None):
    db.add(AuditLog(action=action,user_id=user_id,ip_address=request.client.host if request and request.client else None,user_agent=(request.headers.get('user-agent','')[:500] if request else None),metadata_json=metadata))
