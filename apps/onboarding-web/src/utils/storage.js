// src/utils/storage.js
// Authentication tokens are HttpOnly cookies and are intentionally inaccessible to JS.

export const saveToken = () => {};
export const getToken = () => null;
export const getAccessToken = () => null;
export const removeToken = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

export const saveUser = (user) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  try {
    const value = localStorage.getItem("user");
    return value ? JSON.parse(value) : null;
  } catch { return null; }
};

// Cannot determine authentication from JS. ProtectedRoute calls /api/auth/me.
export const isAuthenticated = () => false;
