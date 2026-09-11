from datetime import datetime,timedelta,timezone
import secrets
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models import User,RefreshToken,OneTimeToken,MobileOtpSession
from app.core.security import hash_password,verify_password,create_access_token,random_token,token_hash
from app.core.config import settings
from app.services.mailer import send_email

async def issue_tokens(db:AsyncSession,user:User,request=None):
    raw=random_token(48); now=datetime.now(timezone.utc)
    db.add(RefreshToken(user_id=user.id,token_hash=token_hash(raw),expires_at=now+timedelta(days=settings.refresh_token_days),user_agent=request.headers.get('user-agent','')[:500] if request else None,ip_address=request.client.host if request and request.client else None))
    await db.flush()
    return create_access_token(str(user.id),user.role,user.business_type),raw

async def create_one_time(db,user_id,purpose,ttl,metadata=None):
    raw=random_token(32); db.add(OneTimeToken(user_id=user_id,purpose=purpose,token_hash=token_hash(raw),expires_at=datetime.now(timezone.utc)+timedelta(seconds=ttl),metadata_json=metadata)); return raw

async def send_verification(db,user):
    raw=await create_one_time(db,user.id,'email_verify',86400)
    await send_email(user.email,'Verify your Medorax account',f'{settings.public_base_url}/email-verification?token={raw}\nThis link expires in 24 hours.')

async def send_reset(db,user):
    raw=await create_one_time(db,user.id,'password_reset',1800)
    await send_email(user.email,'Reset your Medorax password',f'{settings.public_base_url}/reset-password?token={raw}\nThis link expires in 30 minutes.')
