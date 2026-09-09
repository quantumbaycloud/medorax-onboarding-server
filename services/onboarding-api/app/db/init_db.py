import asyncio
from app.db.session import engine
from app.db.base import Base
from app.models import *
async def main():
    async with engine.begin() as conn: await conn.run_sync(Base.metadata.create_all)
    await engine.dispose()
if __name__=='__main__': asyncio.run(main())
