// src/components/login/LoginForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, AlertCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { loginUser } from "../../api/auth/authApi";
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
      setFormData(prev => ({ ...prev, email: defaultEmail }));
    }
  }, [defaultEmail]);

  // Clear info message after 5 seconds
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
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
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
     * IMPORTANT:
     *
     * accessToken and refreshToken are NOT stored in localStorage.
     *
     * The backend stores them as HttpOnly cookies.
     * The browser automatically sends those cookies with Axios.
     */

    // Remove any old tokens created by the previous implementation.
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("token");

    // Store only non-sensitive user information if needed by the UI.
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

    await successAlert(
      "Welcome Back! 🎉",
      "You have been successfully logged in."
    );

    /*
     * Part 1 is already completed before reaching login.
     * Do NOT check onboardingPart1Complete here.
     *
     * The user is now authenticated and should continue
     * with Part 2.
     */
    navigate("/business-type", {
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
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#131B2E]">Welcome Back</h2>
      <p className="mt-1.5 text-sm text-slate-500">
        Login to continue your onboarding journey
      </p>

      {infoMessage && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 border border-blue-200 px-4 py-3">
          <Info size={16} className="mt-0.5 text-blue-500 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-blue-700">{infoMessage}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
          <AlertCircle size={16} className="mt-0.5 text-red-500 flex-shrink-0" />
          <p className="text-xs sm:text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@pharmacy.com"
              className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-12 text-sm outline-none focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} className="text-slate-400" /> : <Eye size={18} className="text-slate-400" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 rounded accent-[#006B5F]"
            />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <button
            type="button"
            className="text-sm text-[#006B5F] hover:underline font-medium"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="h-11 w-full rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-semibold transition hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-[#006B5F] font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
}