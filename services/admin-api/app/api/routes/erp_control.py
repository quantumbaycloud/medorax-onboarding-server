from uuid import UUID, uuid4

from fastapi import APIRouter, Depends, Header, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import require_admin
from app.db.session import get_db
from app.models import ERPConfigOption, OnboardingApplication, Pharmacy


router = APIRouter(
    prefix="/admin/erp-configuration",
    tags=["ERP Configuration"],
)

# ERP machine-to-machine synchronization endpoint.
# This becomes /api/erp-sync/{pharmacy_id}/catalog
machine_router = APIRouter(
    prefix="/erp-sync",
    tags=["ERP Sync"],
)


OPTION_TYPES = {
    "supplier_category",
    "medicine_category",
    "payment_term",
    "customer_type",
    "dosage_form",
    "unit",
}


class OptionCreate(BaseModel):
    option_type: str
    code: str = Field(min_length=1, max_length=80)
    name: str = Field(min_length=1, max_length=160)
    is_active: bool = True
    sort_order: int = 0
    metadata_json: dict | None = None


class OptionUpdate(BaseModel):
    code: str | None = Field(default=None, max_length=80)
    name: str | None = Field(default=None, max_length=160)
    is_active: bool | None = None
    sort_order: int | None = None
    metadata_json: dict | None = None


def validate_option_type(option_type: str):
    if option_type not in OPTION_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported option_type: {option_type}",
        )


async def get_application_for_pharmacy(
    pharmacy_id: str,
    db: AsyncSession,
):
    application = (
        await db.execute(
            select(OnboardingApplication)
            .where(OnboardingApplication.pharmacy_id == pharmacy_id)
            .limit(1)
        )
    ).scalar_one_or_none()

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Pharmacy onboarding record not found",
        )

    return application


@router.get("/pharmacies")
async def list_pharmacies(
    admin=Depends(require_admin("Owner", "Admin")),
    db: AsyncSession = Depends(get_db),
):
    rows = (
        await db.execute(
            select(Pharmacy)
            .order_by(Pharmacy.pharmacy_name.asc())
            .limit(1000)
        )
    ).scalars().all()

    return [
        {
            "id": str(row.id),
            "name": row.pharmacy_name,
            "contactPerson": row.contact_person,
            "email": row.email,
            "gstNumber": row.gst_number,
        }
        for row in rows
    ]


@router.get("/options")
async def list_options(
    pharmacy_id: str,
    option_type: str | None = None,
    admin=Depends(require_admin("Owner", "Admin")),
    db: AsyncSession = Depends(get_db),
):
    await get_application_for_pharmacy(pharmacy_id, db)

    stmt = (
        select(ERPConfigOption)
        .where(ERPConfigOption.pharmacy_id == pharmacy_id)
        .order_by(
            ERPConfigOption.option_type.asc(),
            ERPConfigOption.sort_order.asc(),
            ERPConfigOption.name.asc(),
        )
    )

    if option_type:
        validate_option_type(option_type)
        stmt = stmt.where(
            ERPConfigOption.option_type == option_type
        )

    rows = (await db.execute(stmt)).scalars().all()

    return [
        {
            "id": str(row.id),
            "pharmacyId": row.pharmacy_id,
            "optionType": row.option_type,
            "code": row.code,
            "name": row.name,
            "isActive": row.is_active,
            "sortOrder": row.sort_order,
            "metadata": row.metadata_json,
            "createdAt": row.created_at,
            "updatedAt": row.updated_at,
        }
        for row in rows
    ]


@router.post("/options")
async def create_option(
    payload: OptionCreate,
    pharmacy_id: str,
    admin=Depends(require_admin("Owner", "Admin")),
    db: AsyncSession = Depends(get_db),
):
    validate_option_type(payload.option_type)
    await get_application_for_pharmacy(pharmacy_id, db)

    existing = (
        await db.execute(
            select(ERPConfigOption)
            .where(
                ERPConfigOption.pharmacy_id == pharmacy_id,
                ERPConfigOption.option_type == payload.option_type,
                ERPConfigOption.code == payload.code,
            )
            .limit(1)
        )
    ).scalar_one_or_none()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="An option with this code already exists for this pharmacy",
        )

    row = ERPConfigOption(
        id=uuid4(),
        pharmacy_id=pharmacy_id,
        option_type=payload.option_type,
        code=payload.code.strip(),
        name=payload.name.strip(),
        is_active=payload.is_active,
        sort_order=payload.sort_order,
        metadata_json=payload.metadata_json,
    )

    db.add(row)
    await db.commit()
    await db.refresh(row)

    return {
        "id": str(row.id),
        "pharmacyId": row.pharmacy_id,
        "optionType": row.option_type,
        "code": row.code,
        "name": row.name,
        "isActive": row.is_active,
        "sortOrder": row.sort_order,
        "metadata": row.metadata_json,
    }


@router.patch("/options/{option_id}")
async def update_option(
    option_id: UUID,
    payload: OptionUpdate,
    pharmacy_id: str,
    admin=Depends(require_admin("Owner", "Admin")),
    db: AsyncSession = Depends(get_db),
):
    row = await db.get(ERPConfigOption, option_id)

    if not row:
        raise HTTPException(404, "ERP configuration option not found")

    if row.pharmacy_id != pharmacy_id:
        raise HTTPException(403, "Option does not belong to this pharmacy")

    if payload.code is not None:
        row.code = payload.code.strip()

    if payload.name is not None:
        row.name = payload.name.strip()

    if payload.is_active is not None:
        row.is_active = payload.is_active

    if payload.sort_order is not None:
        row.sort_order = payload.sort_order

    if payload.metadata_json is not None:
        row.metadata_json = payload.metadata_json

    await db.commit()
    await db.refresh(row)

    return {
        "id": str(row.id),
        "pharmacyId": row.pharmacy_id,
        "optionType": row.option_type,
        "code": row.code,
        "name": row.name,
        "isActive": row.is_active,
        "sortOrder": row.sort_order,
        "metadata": row.metadata_json,
    }


@router.delete("/options/{option_id}")
async def delete_option(
    option_id: UUID,
    pharmacy_id: str,
    admin=Depends(require_admin("Owner", "Admin")),
    db: AsyncSession = Depends(get_db),
):
    row = await db.get(ERPConfigOption, option_id)

    if not row:
        raise HTTPException(404, "ERP configuration option not found")

    if row.pharmacy_id != pharmacy_id:
        raise HTTPException(403, "Option does not belong to this pharmacy")

    # Soft delete instead of physically deleting master data.
    row.is_active = False

    await db.commit()

    return {"message": "ERP configuration option disabled"}


@router.post("/sync/{pharmacy_id}")
@machine_router.post("/{pharmacy_id}/catalog")
async def erp_catalog_sync(
    pharmacy_id: str,
    x_erp_license_key: str | None = Header(default=None),
    x_erp_license_signature: str | None = Header(default=None),
    db: AsyncSession = Depends(get_db),
):
    """
    Machine-to-machine endpoint used by the ERP.

    The ERP sends its provisioned license key and signature.
    We verify that they belong to this pharmacy before returning
    the pharmacy-specific master-data catalog.
    """

    if not x_erp_license_key or not x_erp_license_signature:
        raise HTTPException(
            status_code=401,
            detail="ERP license credentials required",
        )

    application = await get_application_for_pharmacy(
        pharmacy_id,
        db,
    )

    if application.license_key != x_erp_license_key:
        raise HTTPException(
            status_code=401,
            detail="Invalid ERP license key",
        )

    # licenseSignature is stored inside the approved ERP payload.
    stored_signature = None

    if application.erp_payload_json:
        try:
            payload = application.erp_payload_json

            if isinstance(payload, str):
                import json
                payload = json.loads(payload)

            stored_signature = (
                payload.get("licenseSignature")
                or payload.get("license_signature")
            )
        except Exception:
            stored_signature = None

    if not stored_signature:
        raise HTTPException(
            status_code=409,
            detail="ERP license signature is not provisioned",
        )

    if stored_signature != x_erp_license_signature:
        raise HTTPException(
            status_code=401,
            detail="Invalid ERP license signature",
        )

    rows = (
        await db.execute(
            select(ERPConfigOption)
            .where(
                ERPConfigOption.pharmacy_id == pharmacy_id,
                ERPConfigOption.is_active.is_(True),
            )
            .order_by(
                ERPConfigOption.option_type.asc(),
                ERPConfigOption.sort_order.asc(),
                ERPConfigOption.name.asc(),
            )
        )
    ).scalars().all()

    return {
        "pharmacyId": pharmacy_id,
        "licenseKey": application.license_key,
        "options": [
            {
                "id": str(row.id),
                "optionType": row.option_type,
                "code": row.code,
                "name": row.name,
                "isActive": row.is_active,
                "sortOrder": row.sort_order,
                "metadata": row.metadata_json,
            }
            for row in rows
        ],
    }
