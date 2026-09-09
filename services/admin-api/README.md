# Medorax Admin FastAPI Backend

This service uses the same PostgreSQL database as the onboarding backend.
It reads onboarding users, pharmacy/distributor details, bank details, locations,
documents, payments and the `onboarding_applications` table.

## Run

```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --host 0.0.0.0 --port 8010
```

For Linux/macOS use `cp .env.example .env` and `.venv/bin/uvicorn ...`.

## Admin bootstrap

Set these in `.env` before the first startup:

```env
ADMIN_BOOTSTRAP_EMAIL=admin@your-domain.com
ADMIN_BOOTSTRAP_PASSWORD=Use-A-Strong-Password-Here
```

The first startup creates an Owner in `admin_users`.

## Required shared values

`DATABASE_URL` must point to the same PostgreSQL database used by onboarding.
`FIELD_ENCRYPTION_KEY` must be exactly the same Fernet key used by onboarding,
otherwise bank/document decryption will fail.

## ERP provisioning

Approval always generates the ERP-ready identity:

- `pharmacyId` / distributor ID
- `licenseKey`
- `licenseExpiresAt`
- `erpUsername`
- `temporaryPassword`

If `ERP_PROVISION_URL` is configured, the admin backend POSTs the complete
approved payload to that ERP endpoint. If it is not configured, approval remains
successful and `erpProvisionStatus` is `pending`.
