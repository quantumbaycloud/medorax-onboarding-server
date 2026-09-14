from functools import lru_cache

from pydantic_settings import (
    BaseSettings,
    SettingsConfigDict,
)


class Settings(BaseSettings):

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        case_sensitive=False,
    )

    # -----------------------------------------------------
    # Application
    # -----------------------------------------------------

    environment: str = "production"

    app_name: str = "Medorax Admin API"

    app_version: str = "1.0.0"

    host: str = "0.0.0.0"

    port: int = 8001

    enable_docs: bool = True

    debug: bool = False

    log_level: str = "INFO"

    # -----------------------------------------------------
    # Database
    # -----------------------------------------------------

    database_url: str

    # -----------------------------------------------------
    # Admin authentication
    # -----------------------------------------------------

    admin_jwt_secret: str

    admin_jwt_algorithm: str = "HS256"

    admin_access_token_minutes: int = 1440

    admin_cookie_name: str = (
        "medorax_admin_access"
    )

    admin_cookie_secure: bool = False

    admin_cookie_httponly: bool = True

    admin_cookie_samesite: str = "lax"

    # -----------------------------------------------------
    # Bootstrap admin
    # -----------------------------------------------------

    admin_bootstrap_email: str = ""

    admin_bootstrap_password: str = ""

    # -----------------------------------------------------
    # CORS
    # -----------------------------------------------------

    admin_frontend_origins: list[str] = []

    trusted_hosts: list[str] = ["*"]

    # -----------------------------------------------------
    # Encryption
    # -----------------------------------------------------

    field_encryption_key: str

    # -----------------------------------------------------
    # Documents
    # -----------------------------------------------------

    onboarding_storage_path: str = (
        "./storage/documents"
    )

    document_storage_path: str = (
        "./storage/documents"
    )

    max_upload_size_mb: int = 20

    # -----------------------------------------------------
    # ERP provisioning
    # -----------------------------------------------------

    erp_provision_url: str = ""

    erp_provision_token: str = ""

    erp_timeout_seconds: int = 20

    # -----------------------------------------------------
    # Commercial MEDORAX ERP licensing
    # -----------------------------------------------------

    license_issuer_url: str = ""

    license_issuer_token: str = ""

    license_plan: str = "professional-annual"

    license_max_devices: int = 1

    license_modules: list[str] = [
        "authentication",
        "pharmacy",
        "branches",
        "staff",
        "medicine",
        "inventory",
        "suppliers",
        "purchases",
        "customers",
        "billing",
        "prescriptions",
        "reports",
        "notifications",
        "settings",
        "audit",
    ]

    # -----------------------------------------------------
    # License
    # -----------------------------------------------------

    license_days: int = 365

    license_prefix: str = "MEDX"

    pharmacy_id_prefix: str = "PHM"

    # -----------------------------------------------------
    # Temporary password
    # -----------------------------------------------------

    temp_password_length: int = 16

    # -----------------------------------------------------
    # Helpers
    # -----------------------------------------------------

    @staticmethod
    def _csv(value):

        if isinstance(value, str):

            return [
                item.strip()
                for item in value.split(",")
                if item.strip()
            ]

        return value

    def model_post_init(
        self,
        __context,
    ):

        self.admin_frontend_origins = (
            self._csv(
                self.admin_frontend_origins
            )
        )

        self.trusted_hosts = (
            self._csv(
                self.trusted_hosts
            )
        )

        # -------------------------------------------------
        # Validate JWT secret
        # -------------------------------------------------

        if (
            not self.admin_jwt_secret
            or len(self.admin_jwt_secret) < 64
        ):
            raise RuntimeError(
                "ADMIN_JWT_SECRET must be "
                "at least 64 characters"
            )

        # -------------------------------------------------
        # Validate encryption key
        # -------------------------------------------------

        if not self.field_encryption_key:
            raise RuntimeError(
                "FIELD_ENCRYPTION_KEY is required"
            )

        # -------------------------------------------------
        # Validate password length
        # -------------------------------------------------

        if (
            self.temp_password_length < 8
            or self.temp_password_length > 128
        ):
            raise RuntimeError(
                "TEMP_PASSWORD_LENGTH must "
                "be between 8 and 128"
            )

        # -------------------------------------------------
        # Normalize environment
        # -------------------------------------------------

        self.environment = (
            self.environment
            .strip()
            .lower()
        )


@lru_cache
def get_settings():

    return Settings()


settings = get_settings()