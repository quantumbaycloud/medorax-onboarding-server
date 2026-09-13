import uuid
from datetime import datetime, timezone, date, time
from sqlalchemy import String, Boolean, DateTime, Date, Time, Integer, Numeric, Text, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base

class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    full_name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(320), index=True)
    mobile_number: Mapped[str | None] = mapped_column(String(30), nullable=True)
    password_hash: Mapped[str] = mapped_column(Text)
    role: Mapped[str] = mapped_column(String(30), default="Owner", index=True)
    business_type: Mapped[str | None] = mapped_column(String(30), nullable=True)
    email_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    mobile_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class Pharmacy(Base):
    __tablename__ = "pharmacies"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    pharmacy_name: Mapped[str] = mapped_column(String(200))
    contact_person: Mapped[str | None] = mapped_column(String(120))
    contact_number: Mapped[str | None] = mapped_column(String(30))
    email: Mapped[str | None] = mapped_column(String(320))
    gst_number: Mapped[str | None] = mapped_column(String(30))
    pan_number: Mapped[str | None] = mapped_column(String(20))
    drug_license_number: Mapped[str | None] = mapped_column(String(80))
    drug_license_expiry_date: Mapped[date | None] = mapped_column(Date)
    pharmacy_registration_number: Mapped[str | None] = mapped_column(String(80))
    store_open_time: Mapped[time | None] = mapped_column(Time)
    store_close_time: Mapped[time | None] = mapped_column(Time)
    is_24x7: Mapped[bool] = mapped_column(Boolean)
    emergency_contact_number: Mapped[str | None] = mapped_column(String(30))
    formatted_address: Mapped[str | None] = mapped_column(Text)
    latitude: Mapped[float | None] = mapped_column(Numeric(10,7))
    longitude: Mapped[float | None] = mapped_column(Numeric(10,7))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class Distributor(Base):
    __tablename__ = "distributors"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    company_name: Mapped[str] = mapped_column(String(200))
    contact_person: Mapped[str | None] = mapped_column(String(120))
    contact_number: Mapped[str | None] = mapped_column(String(30))
    email: Mapped[str | None] = mapped_column(String(320))
    gst_number: Mapped[str | None] = mapped_column(String(30))
    pan_number: Mapped[str | None] = mapped_column(String(20))
    drug_license_number: Mapped[str | None] = mapped_column(String(80))
    drug_license_expiry_date: Mapped[date | None] = mapped_column(Date)
    distributor_registration_number: Mapped[str | None] = mapped_column(String(80))
    service_cities: Mapped[list] = mapped_column(JSON)
    minimum_order_value: Mapped[float | None] = mapped_column(Numeric(14,2))
    is_credit_available: Mapped[bool] = mapped_column(Boolean)
    credit_days: Mapped[int | None] = mapped_column(Integer)
    maximum_credit_limit: Mapped[float | None] = mapped_column(Numeric(14,2))
    has_own_delivery: Mapped[bool] = mapped_column(Boolean)
    delivery_vehicle_types: Mapped[list] = mapped_column(JSON)
    warehouse_open_time: Mapped[time | None] = mapped_column(Time)
    warehouse_close_time: Mapped[time | None] = mapped_column(Time)
    is_24x7: Mapped[bool] = mapped_column(Boolean)
    emergency_contact_number: Mapped[str | None] = mapped_column(String(30))
    formatted_address: Mapped[str | None] = mapped_column(Text)
    latitude: Mapped[float | None] = mapped_column(Numeric(10,7))
    longitude: Mapped[float | None] = mapped_column(Numeric(10,7))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class BankDetails(Base):
    __tablename__ = "bank_details"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), unique=True)
    account_holder_name_enc: Mapped[str] = mapped_column(Text)
    bank_name_enc: Mapped[str] = mapped_column(Text)
    account_number_enc: Mapped[str] = mapped_column(Text)
    ifsc_code: Mapped[str] = mapped_column(String(20))
    branch_name_enc: Mapped[str | None] = mapped_column(Text)
    upi_id_enc: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class BusinessLocation(Base):
    __tablename__ = "business_locations"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    location_type: Mapped[int] = mapped_column(Integer)
    warehouse_name: Mapped[str | None] = mapped_column(String(200))
    contact_person: Mapped[str | None] = mapped_column(String(120))
    contact_number: Mapped[str | None] = mapped_column(String(30))
    latitude: Mapped[float | None] = mapped_column(Numeric(10,7))
    longitude: Mapped[float | None] = mapped_column(Numeric(10,7))
    accuracy: Mapped[float | None] = mapped_column(Numeric(12,3))
    formatted_address: Mapped[str | None] = mapped_column(Text)
    address_line1: Mapped[str | None] = mapped_column(String(250))
    address_line2: Mapped[str | None] = mapped_column(String(250))
    city: Mapped[str | None] = mapped_column(String(100))
    state: Mapped[str | None] = mapped_column(String(100))
    country: Mapped[str | None] = mapped_column(String(100))
    pincode: Mapped[str | None] = mapped_column(String(20))
    is_primary: Mapped[bool] = mapped_column(Boolean)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class Document(Base):
    __tablename__ = "documents"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    document_type: Mapped[int] = mapped_column(Integer)
    file_name: Mapped[str] = mapped_column(String(255))
    stored_name: Mapped[str] = mapped_column(String(255), unique=True)
    mime_type: Mapped[str] = mapped_column(String(100))
    file_size: Mapped[int] = mapped_column(Integer)
    sha256: Mapped[str] = mapped_column(String(64))
    status: Mapped[str] = mapped_column(String(30))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class PaymentTransaction(Base):
    __tablename__ = "payment_transactions"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    subscription_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True)
    razorpay_payment_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    razorpay_subscription_id: Mapped[str | None] = mapped_column(String(100), nullable=True)
    amount_paise: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(10))
    status: Mapped[str] = mapped_column(String(40), index=True)
    signature_verified: Mapped[bool] = mapped_column(Boolean)
    metadata_json: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class PaymentSubscription(Base):
    __tablename__ = "payment_subscriptions"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    plan_code: Mapped[str] = mapped_column(String(80))
    razorpay_plan_id: Mapped[str] = mapped_column(String(100))
    razorpay_subscription_id: Mapped[str] = mapped_column(String(100), unique=True)
    status: Mapped[str] = mapped_column(String(40), index=True)
    amount_paise: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(10))
    total_count: Mapped[int] = mapped_column(Integer)
    paid_count: Mapped[int] = mapped_column(Integer)
    current_start: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    current_end: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    last_payment_id: Mapped[str | None] = mapped_column(String(100))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))

class OnboardingApplication(Base):
    __tablename__ = "onboarding_applications"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    application_number: Mapped[str] = mapped_column(String(40), unique=True, index=True)
    status: Mapped[str] = mapped_column(String(20), index=True)
    rejection_reason: Mapped[str | None] = mapped_column(Text)
    submitted_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    reviewed_by: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True))
    pharmacy_id: Mapped[str | None] = mapped_column(String(60), unique=True)
    license_key: Mapped[str | None] = mapped_column(String(120), unique=True)
    license_expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    erp_username: Mapped[str | None] = mapped_column(String(120))
    temporary_password_enc: Mapped[str | None] = mapped_column(Text)
    erp_provision_status: Mapped[str] = mapped_column(String(30))
    erp_external_id: Mapped[str | None] = mapped_column(String(120))
    erp_provision_error: Mapped[str | None] = mapped_column(Text)
    erp_payload_json: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))


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

class AdminUser(Base):
    __tablename__ = "admin_users"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String(320), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(Text)
    full_name: Mapped[str] = mapped_column(String(120), default="Medorax Admin")
    role: Mapped[str] = mapped_column(String(30), default="Admin")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class AdminAuditLog(Base):
    __tablename__ = "admin_audit_logs"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    admin_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("admin_users.id", ondelete="SET NULL"), nullable=True)
    action: Mapped[str] = mapped_column(String(100), index=True)
    application_id: Mapped[uuid.UUID | None] = mapped_column(UUID(as_uuid=True), nullable=True, index=True)
    metadata_json: Mapped[dict | None] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

# ---------------------------------------------------------
# ERP pharmacy-specific master data
# ---------------------------------------------------------

class ERPConfigOption(Base):
    __tablename__ = "erp_config_options"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    pharmacy_id: Mapped[str] = mapped_column(
        String(60),
        index=True,
        nullable=False,
    )

    option_type: Mapped[str] = mapped_column(
        String(60),
        index=True,
        nullable=False,
    )

    code: Mapped[str] = mapped_column(
        String(80),
        nullable=False,
    )

    name: Mapped[str] = mapped_column(
        String(160),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
        index=True,
    )

    sort_order: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    metadata_json: Mapped[dict | None] = mapped_column(
        JSON,
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
