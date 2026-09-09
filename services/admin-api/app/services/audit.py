from app.models import AdminAuditLog
from sqlalchemy.ext.asyncio import AsyncSession

async def audit(db: AsyncSession, admin_id, action: str, application_id=None, metadata=None):
    db.add(AdminAuditLog(
        admin_id=admin_id,
        action=action,
        application_id=application_id,
        metadata_json=metadata,
    ))
