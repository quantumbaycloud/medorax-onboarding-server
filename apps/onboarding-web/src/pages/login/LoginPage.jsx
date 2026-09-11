import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../api/client";
import Brand from "../../components/login/Brand";
import LoginForm from "../../components/login/LoginForm";
import RightPanel from "../../components/login/RightPanel";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const response = await client.get("/api/auth/me");

        if (!mounted || !response.data?.authenticated) {
          return;
        }

        try {
          const statusResponse = await client.get(
            "/api/onboarding/application-status"
          );

          const data = statusResponse.data || {};

          if (
            data.status === "approved" &&
            data.temporaryPassword
          ) {
            navigate("/dashboard", { replace: true });
          } else if (data.status === "pending") {
            navigate("/onboarding-complete", {
              replace: true,
            });
          } else {
            navigate("/business-type", {
              replace: true,
            });
          }
        } catch (statusError) {
          if (statusError?.response?.status === 401) {
            return;
          }

          console.error(
            "Application status check failed:",
            statusError
          );

          navigate("/business-type", {
            replace: true,
          });
        }
      } catch (error) {
        if (error?.response?.status !== 401) {
          console.error(
            "Session check failed:",
            error
          );
        }
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex relative overflow-hidden">
      <Brand />

      <main className="w-full lg:w-[40%] min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 py-24 lg:py-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>

      <RightPanel />
    </div>
  );
}
