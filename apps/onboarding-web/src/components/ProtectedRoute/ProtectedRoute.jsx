import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import client from "../../api/client";

export default function ProtectedRoute() {
  const location = useLocation();

  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      console.log("🔒 ProtectedRoute:");
      console.log("   Checking backend session...");
      console.log("   Path:", location.pathname);

      try {
        /*
         * Browser automatically sends:
         *
         * HttpOnly access_token
         *
         * because Axios has:
         *
         * withCredentials: true
         */
        const response = await client.get(
          "/api/auth/me"
        );

        if (!mounted) return;

        console.log(
          "✅ Authenticated:",
          response.data
        );

        setAuthenticated(true);

      } catch (error) {
        /*
         * Access token may have expired.
         *
         * Try refresh once using the HttpOnly
         * refresh_token cookie.
         */
        if (error.response?.status === 401) {
          try {
            console.log(
              "🔄 Access token expired. Refreshing..."
            );

            await client.post(
              "/api/auth/refresh"
            );

            const response = await client.get(
              "/api/auth/me"
            );

            if (!mounted) return;

            console.log(
              "✅ Session refreshed successfully"
            );

            console.log(
              "👤 User:",
              response.data
            );

            setAuthenticated(true);

            return;

          } catch (refreshError) {
            console.error(
              "❌ Refresh failed:",
              refreshError.response?.status,
              refreshError.response?.data
            );
          }
        }

        if (!mounted) return;

        console.error(
          "❌ Not authenticated:",
          error.response?.status,
          error.response?.data || error.message
        );

        setAuthenticated(false);

      } finally {
        if (mounted) {
          setChecking(false);
        }
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, [location.pathname]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006B5F] mx-auto" />

          <p className="mt-4 text-slate-500">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    console.log(
      "❌ Not authenticated, redirecting to login..."
    );

    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  console.log(
    "✅ Access granted:",
    location.pathname
  );

  return <Outlet />;
}   