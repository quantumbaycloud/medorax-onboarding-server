from redis.asyncio import Redis
from fastapi import Request, HTTPException
from app.core.config import settings
redis=Redis.from_url(settings.redis_url, decode_responses=True)

async def hit(key: str, limit: int, window: int) -> bool:
    pipe=redis.pipeline()
    pipe.incr(key); pipe.expire(key,window)
    count,_=await pipe.execute()
    return int(count)<=limit

def client_ip(request: Request):
    # Do not trust arbitrary X-Forwarded-For. In production put only a trusted reverse proxy in front.
    return request.client.host if request.client else 'unknown'

async def guard(request: Request, bucket: str, limit: int, window: int):
    key=f'rl:{bucket}:{client_ip(request)}'
    if not await hit(key,limit,window):
        raise HTTPException(status_code=429,detail='Too many requests. Please try again later.',headers={'Retry-After':str(window)})
