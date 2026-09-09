# Medorax Python Backend

Production-oriented FastAPI + PostgreSQL backend matching the Medorax frontend API contract.

## Included
- Same `/api/auth/*` and `/api/onboarding/*` routes used by the supplied frontend, plus compatibility routes used by the frontend code but missing from the old Swagger document.
- PostgreSQL with SQLAlchemy 2 async ORM.
- Redis-backed distributed rate limiting and short-lived OTP/session storage.
- Argon2 password hashing.
- 15-minute JWT access tokens.
- Rotating, revocable refresh tokens stored only as hashes.
- Email verification and password reset tokens stored only as hashes.
- OTP attempts, expiry, resend cooldowns and brute-force protection.
- Strict CORS, security headers, request IDs, trusted-host protection and body/file size limits.
- Ownership checks so users cannot access another user's onboarding records/documents.
- Secure document upload: extension allow-list, MIME/signature checks, size limit, random filenames, private storage, no executable file types.
- Audit log for authentication/security-sensitive events.
- Docker Compose for API + PostgreSQL + Redis.

## Important
The generated `.env` must contain real production secrets before deployment. Do not commit `.env`.

## Run
```bash
cp .env.example .env
# edit .env and replace every CHANGE_ME value

docker compose up --build
```

API: http://localhost:8000
Docs in development: http://localhost:8000/docs
Health: http://localhost:8000/health

For production, put TLS in front of the API (Caddy/Nginx/Cloudflare), set `ENVIRONMENT=production`, disable Swagger with `ENABLE_DOCS=false`, restrict CORS to the exact frontend origin, and use strong randomly generated secrets.
