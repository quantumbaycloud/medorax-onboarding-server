import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { loginUser } from "../../api/auth/authApi";
import client from "../../api/client";
import { successAlert, errorAlert } from "../../utils/alerts";

export default function LoginForm({ defaultEmail = "", onSuccess, message }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: defaultEmail || "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState(message || "");

  useEffect(() => {
    if (defaultEmail) {
      setFormData((prev) => ({
        ...prev,
        email: defaultEmail,
      }));
    }
  }, [defaultEmail]);

  useEffect(() => {
    if (infoMessage) {
      const timer = setTimeout(() => {
        setInfoMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [infoMessage]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const getPostLoginDestination = async () => {
    try {
      const response = await client.get(
        "/api/onboarding/application-status"
      );

      const data = response.data || {};

      console.log("📋 Application status after login:", data);

      /*
       * APPROVED
       *
       * User completed onboarding and admin approved
       * the application. Send them to the dashboard.
       */
      if (data.status === "approved") {
        console.log("✅ Application approved → /dashboard");
        return "/dashboard";
      }

      /*
       * PENDING
       *
       * User has submitted the application and is
       * waiting for admin approval.
       */
      if (data.status === "pending") {
        console.log(
          "⏳ Application pending → /onboarding-complete"
        );
        return "/onboarding-complete";
      }

      /*
       * NOT SUBMITTED / NEW USER
       *
       * User has completed Part 1 but has not completed
       * the business setup yet.
       */
      console.log(
        "📝 Application not submitted → /business-type"
      );

      return "/business-type";
    } catch (statusError) {
      console.error(
        "❌ Failed to get application status:",
        statusError
      );

      if (statusError?.response?.status === 401) {
        return "/login";
      }

      /*
       * Keep the existing onboarding behavior if the
       * status endpoint cannot be checked.
       */
      return "/business-type";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });

      console.log("✅ Login successful");

      /*
       * Authentication is stored in secure HttpOnly cookies.
       * Never store access/refresh tokens in localStorage.
       */
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("token");

      /*
       * Store only non-sensitive user information.
       */
      if (response?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.user)
        );
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: response?.userId,
            fullName: response?.fullName,
            email: response?.email,
            role: response?.role,
          })
        );
      }

      /*
       * Check the actual onboarding application state
       * AFTER authentication has been established.
       */
      const destination = await getPostLoginDestination();

      console.log(
        "➡️ Post-login destination:",
        destination
      );

      await successAlert(
        "Welcome Back! 🎉",
        "You have been successfully logged in."
      );

      /*
       * Optional callback for parent components.
       */
      if (typeof onSuccess === "function") {
        onSuccess(response);
      }

      navigate(destination, {
        replace: true,
      });
    } catch (error) {
      console.error("❌ Login error:", error);

      let errorMessage =
        "Invalid email or password. Please try again.";

      if (error?.message) {
        errorMessage = error.message;
      }

      if (error?.data?.message) {
        errorMessage = error.data.message;
      }

      if (error?.data?.title) {
        errorMessage = error.data.title;
      }

      const lowerMessage = errorMessage.toLowerCase();

      if (
        lowerMessage.includes("email not confirmed") ||
        lowerMessage.includes("verify your email")
      ) {
        errorMessage =
          "Please verify your email before logging in. Check your inbox for the verification link.";

        await errorAlert(
          "Email Not Verified",
          errorMessage
        );

        setError(errorMessage);
        return;
      }

      if (
        lowerMessage.includes("account locked") ||
        lowerMessage.includes("too many")
      ) {
        errorMessage =
          "Your account has been locked due to too many failed attempts. Please reset your password or contact support.";

        await errorAlert(
          "Account Locked",
          errorMessage
        );

        setError(errorMessage);
        return;
      }

      setError(errorMessage);

      await errorAlert(
        "Login Failed",
        errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {infoMessage && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <Info
            size={18}
            className="mt-0.5 flex-shrink-0 text-blue-600"
          />

          <p className="text-sm text-blue-800">
            {infoMessage}
          </p>
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle
            size={18}
            className="mt-0.5 flex-shrink-0 text-red-600"
          />

          <p className="text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Email
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@pharmacy.com"
              disabled={loading}
              className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20 disabled:bg-slate-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-12 text-sm outline-none focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20 disabled:bg-slate-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword((current) => !current)
              }
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 disabled:opacity-50"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={loading}
              className="h-4 w-4 rounded border-slate-300"
            />

            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-sm font-semibold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </motion.div>
  );
}
