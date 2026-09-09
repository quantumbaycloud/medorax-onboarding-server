# MEDORAX API contract

Base URL: `http://localhost:5000`

All protected onboarding routes use the HttpOnly `access_token` cookie created by login/refresh. JSON uses `application/json`. Document upload/update uses `multipart/form-data` with `File` and `DocumentType` exactly as the supplied API contract.

## Auth

- `POST /api/auth/register` — `{ fullName, email, mobileNumber, password, confirmPassword }`
- `POST /api/auth/login` — `{ email, password }`
- `POST /api/auth/refresh` — optional `{ refreshToken }`; cookie is preferred
- `POST /api/auth/logout` — optional `{ refreshToken }`
- `GET /api/auth/me`
- `POST /api/auth/verify-email` — `{ token }`
- `POST /api/auth/resend-verification` — `{ email }`
- `POST /api/auth/forgot-password` — `{ email }`
- `POST /api/auth/reset-password` — `{ token, newPassword, confirmPassword }`
- `POST /api/auth/send-mobile-otp` — `{ mobileNumber }`
- `POST /api/auth/verify-mobile-otp` — `{ mobileNumber, sessionId, otp }`

## Onboarding

- `POST /api/onboarding/select-business` — `{ businessType: 0|1 }`
- `GET /api/onboarding/select-business`
- `POST /api/onboarding/pharmacy/details`
- `GET /api/onboarding/pharmacy/details`
- `PUT /api/onboarding/pharmacy/details/:id` compatibility route
- `POST /api/onboarding/distributor/details`
- `GET /api/onboarding/distributor/details`
- `PUT /api/onboarding/distributor/details`
- `PUT /api/onboarding/distributor/details/:id` compatibility route
- `POST /api/onboarding/bank-details`
- `GET /api/onboarding/bank-details`
- `POST /api/onboarding/location`
- `GET /api/onboarding/location`
- `GET /api/onboarding/location/:id`
- `PUT /api/onboarding/location/:id`
- `DELETE /api/onboarding/location/:id`
- `POST /api/onboarding/documents/upload`
- `GET /api/onboarding/documents`
- `GET /api/onboarding/documents/:id`
- `PUT /api/onboarding/documents/:id`
- `DELETE /api/onboarding/documents/:id`
- `GET /api/onboarding/documents/:id/download`
- `POST /api/onboarding/documents/:id/reupload`
- `GET /api/onboarding/status`
- `GET /api/onboarding/me` — consolidated review data
- `POST /api/onboarding/plan` — extra server-backed persistence for the existing plan UI
- `POST /api/onboarding/verify` — compatibility alias
- `POST /api/onboarding/complete`
