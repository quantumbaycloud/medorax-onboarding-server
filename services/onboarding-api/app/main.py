import uuid
from contextlib import asynccontextmanager
from fastapi import FastAPI,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from starlette.middleware.gzip import GZipMiddleware
from app.core.config import settings
from app.db.session import engine
from app.db.base import Base
from app.models import *
from app.api.router import api
from app.core.rate_limit import guard

@asynccontextmanager
async def lifespan(app:FastAPI):
    # For first boot simplicity. For mature production deployments, replace this with Alembic migrations.
    async with engine.begin() as conn: await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

app=FastAPI(title=settings.app_name,version='1.0.0',docs_url='/docs' if settings.enable_docs else None,redoc_url='/redoc' if settings.enable_docs else None,lifespan=lifespan)
app.add_middleware(TrustedHostMiddleware,allowed_hosts=settings.trusted_hosts)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.frontend_origins,
    allow_credentials=True,
    allow_methods=[
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
    allow_headers=[
        "Authorization",
        "Content-Type",
        "Accept",
        "X-Request-ID",
    ],
)
app.add_middleware(GZipMiddleware,minimum_size=1000)

@app.middleware('http')
async def security_middleware(request:Request,call_next):
    rid=request.headers.get('X-Request-ID') or str(uuid.uuid4())
    try:
        cl=request.headers.get('content-length')
        if cl and int(cl)>settings.max_request_bytes: return JSONResponse({'message':'Request too large'},status_code=413,headers={'X-Request-ID':rid})
    except ValueError: return JSONResponse({'message':'Invalid Content-Length'},status_code=400,headers={'X-Request-ID':rid})
    response=await call_next(request)
    response.headers['X-Request-ID']=rid
    response.headers['X-Content-Type-Options']='nosniff'
    response.headers['X-Frame-Options']='DENY'
    response.headers['Referrer-Policy']='no-referrer'
    response.headers['Permissions-Policy']='camera=(), microphone=(), geolocation=(self)'
    response.headers['Cache-Control']='no-store' if request.url.path.startswith('/api') else response.headers.get('Cache-Control','')
    if settings.environment=='production': response.headers['Strict-Transport-Security']='max-age=31536000; includeSubDomains'
    return response

@app.get('/health')
async def health(): return {'status':'ok'}
@app.get('/')
async def root(): return {'name':settings.app_name,'status':'ok'}
app.include_router(api,prefix=settings.api_prefix)
