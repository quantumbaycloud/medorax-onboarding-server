from datetime import datetime, timedelta, timezone
import jwt
from cryptography.fernet import Fernet
from pwdlib import PasswordHash
from app.core.config import settings

password_hash = PasswordHash.recommended()
fernet = Fernet(settings.field_encryption_key.encode())


def hash_password(password: str) -> str:
    return password_hash.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return password_hash.verify(password, hashed)


def create_admin_token(admin_id: str, role: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {
        "sub": admin_id,
        "role": role,
        "email": email,
        "type": "admin_access",
        "iat": now,
        "exp": now + timedelta(minutes=settings.admin_access_token_minutes),
        "iss": "MEDORAX_ADMIN",
        "aud": "MEDORAX_ADMIN",
    }
    return jwt.encode(payload, settings.admin_jwt_secret, algorithm="HS256")


def decode_admin_token(token: str):
    return jwt.decode(token, settings.admin_jwt_secret, algorithms=["HS256"], issuer="MEDORAX_ADMIN", audience="MEDORAX_ADMIN")


def encrypt(value: str | None):
    return fernet.encrypt(value.encode()).decode() if value else None


def decrypt(value: str | None):
    return fernet.decrypt(value.encode()).decode() if value else None


def decrypt_bytes(value: bytes):
    return fernet.decrypt(value)
