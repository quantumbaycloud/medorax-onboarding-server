import hashlib, secrets
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

def random_token(n=32) -> str:
    return secrets.token_urlsafe(n)

def token_hash(value: str) -> str:
    return hashlib.sha256(value.encode()).hexdigest()

def create_access_token(user_id: str, role: str, business_type: str | None):
    now = datetime.now(timezone.utc)
    payload = {'sub': user_id, 'role': role, 'businessType': business_type, 'type': 'access', 'iat': now, 'exp': now + timedelta(minutes=settings.access_token_minutes), 'iss': 'MEDORAX', 'aud': 'MEDORAX'}
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)

def decode_access_token(token: str):
    return jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm], issuer='MEDORAX', audience='MEDORAX')

def encrypt(value: str | None):
    return fernet.encrypt(value.encode()).decode() if value else None

def decrypt(value: str | None):
    return fernet.decrypt(value.encode()).decode() if value else None


def encrypt_bytes(value: bytes) -> bytes:
    return fernet.encrypt(value)

def decrypt_bytes(value: bytes) -> bytes:
    return fernet.decrypt(value)
