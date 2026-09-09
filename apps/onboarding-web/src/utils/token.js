// src/utils/token.js
// Legacy compatibility helpers. Real authentication uses HttpOnly cookies.
export const saveTokens = () => {};
export const getToken = () => null;
export const isAuthenticated = () => false;
export const getAuthHeaders = () => ({});
export const setupAuthInterceptor = (axiosInstance) => axiosInstance;

export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  try {
    const value = localStorage.getItem("user");
    return value ? JSON.parse(value) : null;
  } catch { return null; }
};

export const saveUser = (user) => {
  if (user) localStorage.setItem("user", JSON.stringify(user));
};
export const clearUser = () => localStorage.removeItem("user");
export const hasRole = (role) => { const user=getUser(); return !!user && (user.role===role || user.roles?.includes(role)); };
export const hasPermission = (permission) => { const user=getUser(); return !!user && user.permissions?.includes(permission); };
