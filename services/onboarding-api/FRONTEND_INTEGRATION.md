# Frontend integration

The supplied frontend currently uses these API paths. This backend keeps the same paths so you do not need to rewrite the route names.

## 1. Point Axios at the Python API
In `src/api/client.js`, keep:
```js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
```
Production example:
```env
VITE_API_URL=https://api.medorax.in
```

## 2. Authentication
The backend returns exactly the fields the existing `useLogin` code looks for:
```json
{
  "userId": "uuid",
  "fullName": "...",
  "email": "...",
  "role": "Owner",
  "accessToken": "...",
  "refreshToken": "...",
  "expiresIn": 900
}
```

## 3. Routes kept compatible
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/refresh`
- POST `/api/auth/logout`
- POST `/api/auth/verify-email`
- POST `/api/auth/resend-verification`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`
- POST `/api/auth/send-mobile-otp`
- POST `/api/auth/verify-mobile-otp`
- POST `/api/onboarding/select-business`
- POST `/api/onboarding/pharmacy/details`
- GET/PUT `/api/onboarding/pharmacy/details/{id}`
- POST `/api/onboarding/distributor/details`
- GET/PUT `/api/onboarding/distributor/details/{id}`
- POST `/api/onboarding/bank-details`
- POST/GET `/api/onboarding/location`
- GET/PUT/DELETE `/api/onboarding/location/{id}`
- POST `/api/onboarding/documents/upload`
- GET `/api/onboarding/documents`
- GET/PUT/DELETE `/api/onboarding/documents/{id}`
- GET `/api/onboarding/documents/{id}/download`
- POST `/api/onboarding/documents/{id}/reupload`
- GET `/api/onboarding/status`
- POST `/api/onboarding/verify`

## 4. One frontend bug to fix
Your supplied `src/api/onboarding/locationApi.js` imports `../axios`, while the project has `src/api/client.js`. Change that import to:
```js
import client from "../client";
```
and replace the calls from `axios.get/post/put/delete` to `client.get/post/put/delete`.

## 5. Security recommendation
Do not keep refresh tokens in localStorage for a production browser application if you can change the frontend. The strongest browser setup is an HttpOnly, Secure, SameSite refresh-token cookie and a short-lived access token kept in memory. The current backend still supports the existing frontend's JSON refresh-token flow for compatibility.
