from fastapi import APIRouter, Depends
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.deps import current_admin
from app.db.session import get_db
from app.models import OnboardingApplication, User, PaymentTransaction, Document

router = APIRouter(prefix="/admin/dashboard", tags=["Admin Dashboard"])

@router.get("/stats")
async def stats(admin=Depends(current_admin), db: AsyncSession = Depends(get_db)):
    pending = await db.scalar(select(func.count()).select_from(OnboardingApplication).where(OnboardingApplication.status == "pending"))
    approved = await db.scalar(select(func.count()).select_from(OnboardingApplication).where(OnboardingApplication.status == "approved"))
    rejected = await db.scalar(select(func.count()).select_from(OnboardingApplication).where(OnboardingApplication.status == "rejected"))
    users = await db.scalar(select(func.count()).select_from(User))
    payments = await db.scalar(select(func.count()).select_from(PaymentTransaction).where(PaymentTransaction.status == "verified"))
    documents = await db.scalar(select(func.count()).select_from(Document))
    return {"pending": pending or 0, "approved": approved or 0, "rejected": rejected or 0, "users": users or 0, "verifiedPayments": payments or 0, "documents": documents or 0}
