import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ERPCredential(Base):
    __tablename__ = "erp_credentials"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"),
        unique=True,
        index=True,
    )

    application_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey(
            "onboarding_applications.id",
            ondelete="CASCADE",
        ),
        unique=True,
        index=True,
    )

    erp_username: Mapped[str] = mapped_column(
        String(120)
    )

    temporary_password_enc: Mapped[str] = mapped_column(
        Text
    )

    provision_status: Mapped[str] = mapped_column(
        String(30),
        default="not_started",
    )

    erp_external_id: Mapped[str | None] = mapped_column(
        String(120),
        nullable=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
