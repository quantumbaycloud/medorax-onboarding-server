import copy
import os
from typing import Any

import httpx
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.openapi.docs import get_swagger_ui_html


DOCS_USERNAME = os.environ.get("DOCS_USERNAME", "")
DOCS_PASSWORD = os.environ.get("DOCS_PASSWORD", "")

if not DOCS_USERNAME or not DOCS_PASSWORD:
    raise RuntimeError(
        "DOCS_USERNAME and DOCS_PASSWORD must be configured"
    )


security = HTTPBasic()

app = FastAPI(
    title="MEDORAX Unified API",
    version="1.0.0",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)


def require_docs_auth(
    credentials: HTTPBasicCredentials = Depends(security),
):
    import secrets

    username_ok = secrets.compare_digest(
        credentials.username,
        DOCS_USERNAME,
    )

    password_ok = secrets.compare_digest(
        credentials.password,
        DOCS_PASSWORD,
    )

    if not (username_ok and password_ok):
        from fastapi import status
        from fastapi.responses import Response

        return Response(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": 'Basic realm="MEDORAX API Documentation"'},
        )

    return credentials


def prefix_refs(
    value: Any,
    component_prefix: str,
):
    """
    Rewrite OpenAPI component references so schemas from different
    services cannot collide.
    """

    if isinstance(value, dict):
        result = {}

        for key, item in value.items():
            if key == "$ref" and isinstance(item, str):
                prefix = "#/components/"

                if item.startswith(prefix):
                    remainder = item[len(prefix):]

                    if "/" in remainder:
                        section, name = remainder.split("/", 1)

                        if section == "schemas":
                            item = (
                                f"#/components/schemas/"
                                f"{component_prefix}{name}"
                            )

            result[key] = prefix_refs(item, component_prefix)

        return result

    if isinstance(value, list):
        return [
            prefix_refs(item, component_prefix)
            for item in value
        ]

    return value


async def fetch_openapi(
    client: httpx.AsyncClient,
    url: str,
):
    response = await client.get(
        url,
        headers={"Host": "api.medorax.in"},
        timeout=15,
    )

    response.raise_for_status()

    return response.json()


def merge_components(
    target: dict,
    source: dict,
    prefix: str,
):
    components = source.get("components", {})

    target_components = target.setdefault(
        "components",
        {},
    )

    for section, values in components.items():
        if not isinstance(values, dict):
            continue

        target_section = target_components.setdefault(
            section,
            {},
        )

        for name, value in values.items():
            new_name = (
                f"{prefix}{name}"
                if section == "schemas"
                else name
            )

            if section == "schemas":
                value = prefix_refs(
                    value,
                    prefix,
                )

            target_section[new_name] = value


def add_paths(
    target: dict,
    source: dict,
    path_prefix: str = "",
):
    target_paths = target.setdefault(
        "paths",
        {},
    )

    for path, operations in source.get(
        "paths",
        {},
    ).items():

        final_path = f"{path_prefix}{path}"

        if final_path not in target_paths:
            target_paths[final_path] = {}

        for method, operation in operations.items():

            if method.startswith("x-"):
                continue

            target_paths[final_path][method] = operation


def rewrite_schema_refs_for_prefix(
    spec: dict,
    prefix: str,
):
    return prefix_refs(
        spec,
        prefix,
    )


async def build_unified_openapi():
    async with httpx.AsyncClient() as client:

        onboarding = await fetch_openapi(
            client,
            "http://onboarding-api:8000/openapi.json",
        )

        admin = await fetch_openapi(
            client,
            "http://admin-api:8001/openapi.json",
        )

        licensing = await fetch_openapi(
            client,
            "http://licensing-issuer:8100/openapi.json",
        )

    result = {
        "openapi": "3.0.3",
        "info": {
            "title": "MEDORAX Unified API",
            "version": "1.0.0",
            "description": (
                "Unified interactive API documentation for "
                "MEDORAX Onboarding, Administration, Payments "
                "and Licensing services."
            ),
        },
        "servers": [
            {
                "url": "https://api.medorax.in",
                "description": "MEDORAX Production API",
            }
        ],
        "tags": [
            {
                "name": "Authentication",
                "description": "User authentication and account access.",
            },
            {
                "name": "Onboarding",
                "description": "Business and onboarding operations.",
            },
            {
                "name": "Payments",
                "description": "Plans, subscriptions, invoices and payments.",
            },
            {
                "name": "Admin Authentication",
                "description": "MEDORAX administrator authentication.",
            },
            {
                "name": "Admin Dashboard",
                "description": "Administrative dashboard and statistics.",
            },
            {
                "name": "Admin Applications",
                "description": "Application review, approval and ERP provisioning.",
            },
            {
                "name": "Admin Users",
                "description": "Administrative user management.",
            },
            {
                "name": "Licensing",
                "description": "Central MEDORAX ERP licensing and activation.",
            },
        ],
        "paths": {},
        "components": {},
    }

    # ---------------------------------------------------------
    # ONBOARDING
    # ---------------------------------------------------------

    onboarding = copy.deepcopy(onboarding)

    onboarding_tag_map = {
        "Auth": "Authentication",
        "Onboarding": "Onboarding",
        "Payments": "Payments",
        "Onboarding Approval": "Onboarding",
        "Admin": "Admin Dashboard",
    }

    for path_item in onboarding.get(
        "paths",
        {},
    ).values():

        for operation in path_item.values():

            if not isinstance(operation, dict):
                continue

            tags = operation.get("tags", [])

            operation["tags"] = [
                onboarding_tag_map.get(
                    tag,
                    tag,
                )
                for tag in tags
            ]

    onboarding = rewrite_schema_refs_for_prefix(
        onboarding,
        "Onboarding_",
    )

    merge_components(
        result,
        onboarding,
        "Onboarding_",
    )

    # ---------------------------------------------------------
    # ADMIN
    # ---------------------------------------------------------

    admin = copy.deepcopy(admin)

    admin_tag_map = {
        "Admin Auth": "Admin Authentication",
        "Admin Dashboard": "Admin Dashboard",
        "Admin Applications": "Admin Applications",
        "Admin Users": "Admin Users",
    }

    for path_item in admin.get(
        "paths",
        {},
    ).values():

        for operation in path_item.values():

            if not isinstance(operation, dict):
                continue

            tags = operation.get("tags", [])

            operation["tags"] = [
                admin_tag_map.get(
                    tag,
                    tag,
                )
                for tag in tags
            ]

    admin = rewrite_schema_refs_for_prefix(
        admin,
        "Admin_",
    )

    merge_components(
        result,
        admin,
        "Admin_",
    )

    # ---------------------------------------------------------
    # LICENSING
    # ---------------------------------------------------------

    licensing = copy.deepcopy(licensing)

    for path_item in licensing.get(
        "paths",
        {},
    ).values():

        for operation in path_item.values():

            if not isinstance(operation, dict):
                continue

            operation["tags"] = ["Licensing"]

    licensing = rewrite_schema_refs_for_prefix(
        licensing,
        "Licensing_",
    )

    merge_components(
        result,
        licensing,
        "Licensing_",
    )

    # ---------------------------------------------------------
    # PATHS
    # ---------------------------------------------------------

    add_paths(
        result,
        onboarding,
    )

    add_paths(
        result,
        admin,
    )

    # Licensing issuer internally exposes /v1/*
    # but publicly it lives behind /licensing/*.
    add_paths(
        result,
        licensing,
        "/licensing",
    )

    # Ensure production server URL is used.
    result["servers"] = [
        {
            "url": "https://api.medorax.in",
            "description": "MEDORAX Production API",
        }
    ]

    return result


@app.get(
    "/openapi.json",
    include_in_schema=False,
)
async def unified_openapi(
    credentials: HTTPBasicCredentials = Depends(
        require_docs_auth
    ),
):
    try:
        schema = await build_unified_openapi()
        return JSONResponse(schema)

    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,
            detail=f"Unable to build unified OpenAPI specification: {exc}",
        )


@app.get(
    "/docs",
    include_in_schema=False,
)
async def unified_docs(
    credentials: HTTPBasicCredentials = Depends(
        require_docs_auth
    ),
):
    return get_swagger_ui_html(
        openapi_url="/openapi.json",
        title="MEDORAX Unified API Documentation",
        swagger_ui_parameters={
            "deepLinking": True,
            "displayRequestDuration": True,
            "filter": True,
            "persistAuthorization": True,
            "tryItOutEnabled": False,
        },
    )


@app.get(
    "/health",
    include_in_schema=False,
)
async def health():
    return {
        "status": "ok",
        "service": "unified-docs",
    }
