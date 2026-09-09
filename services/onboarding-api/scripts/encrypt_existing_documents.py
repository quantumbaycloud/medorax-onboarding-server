"""Encrypt legacy document files already stored in /app/storage/documents.
Run once after deploying encrypted document storage.
"""
import asyncio, os
from pathlib import Path
from sqlalchemy import select
from app.core.config import settings
from app.core.security import encrypt_bytes, decrypt_bytes
from app.db.session import SessionLocal
from app.models import Document

STORAGE = Path('/app/storage/documents')

async def main():
    STORAGE.mkdir(parents=True, exist_ok=True)
    try: os.chmod(STORAGE, 0o700)
    except OSError: pass
    encrypted_count = 0
    skipped = 0
    missing = 0
    async with SessionLocal() as db:
        rows = (await db.execute(select(Document))).scalars().all()
        for row in rows:
            path = STORAGE / row.stored_name
            if not path.exists():
                missing += 1
                continue
            raw = path.read_bytes()
            try:
                plain = decrypt_bytes(raw)
                if __import__('hashlib').sha256(plain).hexdigest() != row.sha256:
                    raise RuntimeError(f'integrity mismatch for {row.id}')
                skipped += 1
                continue
            except Exception:
                plain = raw
            encrypted = encrypt_bytes(plain)
            temp = path.with_suffix('.tmp')
            temp.write_bytes(encrypted)
            try: os.chmod(temp, 0o600)
            except OSError: pass
            os.replace(temp, path)
            try: os.chmod(path, 0o600)
            except OSError: pass
            encrypted_count += 1
        await db.commit()
    print(f'encrypted={encrypted_count} already_encrypted={skipped} missing={missing}')

if __name__ == '__main__':
    asyncio.run(main())
