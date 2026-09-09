import asyncio
from sqlalchemy import select
from app.db.session import SessionLocal,engine
from app.models import User
from app.core.config import settings
from app.core.security import hash_password

async def main():
    if not settings.admin_bootstrap_email or not settings.admin_bootstrap_password:
        raise SystemExit('Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD first')
    async with SessionLocal() as db:
        user=(await db.execute(select(User).where(User.email==settings.admin_bootstrap_email.lower()))).scalar_one_or_none()
        if user:
            user.role='Admin'; user.is_active=True
        else:
            user=User(full_name='Medorax Administrator',email=settings.admin_bootstrap_email.lower(),password_hash=hash_password(settings.admin_bootstrap_password),role='Admin',email_verified=True)
            db.add(user)
        await db.commit(); print('Admin bootstrap complete:',user.email)
    await engine.dispose()
if __name__=='__main__': asyncio.run(main())
