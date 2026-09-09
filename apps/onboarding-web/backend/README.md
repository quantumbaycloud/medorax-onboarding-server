# MEDORAX Backend

Node.js/Express API for the supplied MEDORAX frontend. The API is the source of truth; authentication uses HttpOnly cookies, while legacy response token fields are returned for compatibility.

## Start

```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

API: `http://localhost:5000`
Health: `GET /health`

### Frontend
Set the frontend API URL to `http://localhost:5000` and run the existing Vite app. The UI is intentionally preserved; only the data/auth layer is changed.

## Endpoint coverage

Auth: register, login, refresh, logout, verify-email, resend-verification, forgot-password, reset-password, send-mobile-otp, verify-mobile-otp, me.

Onboarding: business selection, pharmacy details, distributor details, bank details, business locations CRUD, documents upload/list/get/update/delete/download/reupload, status, complete, plan persistence, and consolidated onboarding summary.

## Production notes

Use PostgreSQL for production, a private object-storage provider for documents, real SMS/OTP delivery, real SMTP, HTTPS, a strong secrets manager, and rotate JWT/refresh secrets. Never commit `.env` or uploaded documents.
