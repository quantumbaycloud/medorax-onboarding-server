from functools import lru_cache
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore', case_sensitive=False)
    environment: str = 'development'
    app_name: str = 'Medorax API'
    api_prefix: str = '/api'
    host: str = '0.0.0.0'
    port: int = 8000
    enable_docs: bool = True
    database_url: str
    redis_url: str
    jwt_secret_key: str
    jwt_algorithm: str = 'HS256'
    access_token_minutes: int = 15
    refresh_token_days: int = 30
    field_encryption_key: str
    frontend_origins: list[str] = ['http://localhost:5173']
    trusted_hosts: list[str] = ['localhost', '127.0.0.1']
    max_request_bytes: int = 10 * 1024 * 1024
    max_upload_bytes: int = 10 * 1024 * 1024
    smtp_host: str = ''
    smtp_port: int = 587
    smtp_username: str = ''
    smtp_password: str = ''
    smtp_from: str = 'no-reply@medorax.in'
    smtp_starttls: bool = True
    public_base_url: str = 'http://localhost:8000'
    otp_length: int = 6
    otp_ttl_seconds: int = 300
    otp_max_attempts: int = 5
    otp_resend_seconds: int = 60
    rate_limit_global: str = '120/minute'
    rate_limit_auth: str = '10/minute'
    rate_limit_login: str = '5/minute'
    rate_limit_otp: str = '3/10minutes'
    rate_limit_upload: str = '10/minute'
    admin_bootstrap_email: str = ''
    admin_bootstrap_password: str = ''
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_verify_service_sid: str = ""
    razorpay_key_id: str = ''
    razorpay_key_secret: str = ''
    razorpay_plan_id: str = ''
    razorpay_webhook_secret: str = ''
    razorpay_mode: str = 'test'

    @field_validator('frontend_origins', 'trusted_hosts', mode='before')
    @classmethod
    def split_csv(cls, v):
        if isinstance(v, str): return [x.strip() for x in v.split(',') if x.strip()]
        return v

    def validate_secrets(self):
        if self.environment == 'production':
            bad = ['CHANGE_ME', 'change_me']
            if any(x in self.jwt_secret_key for x in bad) or any(x in self.field_encryption_key for x in bad):
                raise RuntimeError('Production secrets are not configured')
            if len(self.jwt_secret_key) < 64:
                raise RuntimeError('JWT_SECRET_KEY must be at least 64 characters in production')

@lru_cache
def get_settings() -> Settings:
    s = Settings()
    s.validate_secrets()
    return s

settings = get_settings()
