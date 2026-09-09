import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../api";
import { OnboardingData } from "../../utils/onboardingData";

import {
    successAlert,
    errorAlert,
    warningAlert
} from "../../utils/alerts";
import { resendVerification } from "../../api/auth/authApi";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  BadgeCheck,
} from "lucide-react";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  // Load saved data on mount
  useEffect(() => {
    const saved = OnboardingData.get('registration');
    if (saved) {
      setForm(prev => ({
        ...prev,
        fullName: saved.fullName || "",
        email: saved.email || "",
        phone: saved.phone || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Save to onboarding data
    if (name !== "password" && name !== "confirmPassword" && name !== "terms") {
      const saved = OnboardingData.get('registration', {});
      OnboardingData.save('registration', {
        ...saved,
        [name]: newValue
      });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Empty Fields
if (
    !form.fullName.trim() ||
    !form.email.trim() ||
    !form.phone.trim() ||
    !form.password ||
    !form.confirmPassword
) {

    warningAlert(
        "Missing Information",
        "Please fill in all required fields."
    );

    return;
}

// Full Name
if (form.fullName.trim().length < 3) {

    warningAlert(
        "Invalid Name",
        "Please enter your full name."
    );

    return;
}

// Email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(form.email)) {

    warningAlert(
        "Invalid Email",
        "Please enter a valid email address."
    );

    return;
}

// Mobile
if (!/^[6-9]\d{9}$/.test(form.phone)) {

    warningAlert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
    );

    return;
}

// Password Length
if (form.password.length < 8) {

    warningAlert(
        "Weak Password",
        "Password must contain at least 8 characters."
    );

    return;
}

// Password Match
if (form.password !== form.confirmPassword) {

    warningAlert(
        "Password Mismatch",
        "Password and Confirm Password must match."
    );

    return;
}

// Terms
if (!form.terms) {

    warningAlert(
        "Terms Required",
        "Please accept the Terms & Conditions."
    );

    return;
}

    try {

        setLoading(true);

        const response = await registerUser({

            fullName: form.fullName,

            email: form.email,

            mobileNumber: form.phone,

            password: form.password,

            confirmPassword: form.confirmPassword,

        });

        console.log(response);

        OnboardingData.save("registration", {

            fullName: form.fullName,

            email: form.email,

            phone: form.phone,

        });

        localStorage.setItem(
            "registrationEmail",
            form.email
        );

      localStorage.setItem(
        "registrationPhone",
        form.phone
      );

      await successAlert(
        "Registration Successful 🎉",
        "Your account has been created successfully.\n\nPlease check your email to verify your account."
      );

      navigate("/email-verification", {
        state: {
          email: form.email
        }
      });




    } catch (error) {

      console.log("Registration Error:", error);

      const message = (
        error.message ||
        error.title ||
        ""
      ).toLowerCase();

      // ==========================
      // ASP.NET Validation Errors
      // ==========================
      if (error.errors) {

        const validationErrors = Object.values(error.errors)
          .flat()
          .join("\n");

        await errorAlert(
          "Validation Error",
          validationErrors
        );

        return;
      }

      // ==========================
      // Duplicate Email
      // ==========================
      if (
        error.status === 409 ||
        message.includes("email already") ||
        message.includes("email exists") ||
        message.includes("email is already") ||
        (message.includes("email") && message.includes("exist"))
      ) {

        await errorAlert(
          "Email Already Registered",
          "An account already exists with this email address. Please sign in or use another email."
        );

        return;
      }

      // ==========================
      // Duplicate Mobile Number
      // ==========================
      if (
        message.includes("mobile") ||
        message.includes("phone") ||
        message.includes("mobile number") ||
        (message.includes("already") && message.includes("mobile"))
      ) {

        await errorAlert(
          "Mobile Number Already Registered",
          "This mobile number is already linked with another Medorax account."
        );

        return;
      }

      // ==========================
      // Invalid Password
      // ==========================
      if (message.includes("password")) {

        await errorAlert(
          "Invalid Password",
          error.message || "Please enter a valid password."
        );

        return;
      }

      // ==========================
      // Invalid Email
      // ==========================
      if (message.includes("invalid email")) {

        await errorAlert(
          "Invalid Email",
          "Please enter a valid email address."
        );

        return;
      }

      // ==========================
      // No Internet
      // ==========================
      if (!navigator.onLine) {

        await errorAlert(
          "No Internet Connection",
          "Please check your internet connection and try again."
        );

        return;
      }

      // ==========================
      // Server Error
      // ==========================
      if (
        error.status >= 500 ||
        message.includes("internal") ||
        message.includes("500")
      ) {

        await errorAlert(
          "Server Error",
          "Something went wrong on our server. Please try again later."
        );

        return;
      }

      // ==========================
      // Default
      // ==========================
      await errorAlert(
        "Registration Failed",
        error.message ||
        "Unable to create your account. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <section className="relative w-full lg:w-1/2 flex items-start justify-center bg-[#F8FAFC] px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-0.5 flex-shrink-0">
      <div className="absolute -top-24 right-0 w-72 h-72 rounded-full bg-teal-100 blur-[120px] opacity-70" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-100 blur-[130px] opacity-70" />

      <div className="relative w-full max-w-[560px] px-1 py-1">
        <div className="bg-white rounded-[24px] sm:rounded-[28px] border border-slate-200 shadow-xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-7">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">Create your account</h2>

          <form onSubmit={handleSubmit} className="mt-2 sm:mt-3 lg:mt-4 space-y-2 sm:space-y-2.5 lg:space-y-3">
            <div>
              <label className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-1.5 lg:mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Dr. John Doe"
                  className="w-full h-10 sm:h-11 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-3 sm:pr-4 outline-none focus:ring-2 focus:ring-[#2563EB] text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-1.5 lg:mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@pharmacy.com"
                  className="w-full h-10 sm:h-11 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-3 sm:pr-4 outline-none focus:ring-2 focus:ring-[#2563EB] text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-1.5 lg:mb-2 block">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="phone"
                  type="text"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 9876543210"
                  className="w-full h-10 sm:h-11 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-3 sm:pr-4 outline-none focus:ring-2 focus:ring-[#2563EB] text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-1.5 lg:mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-10 sm:h-11 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-10 sm:pr-12 outline-none focus:ring-2 focus:ring-[#2563EB] text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs sm:text-sm text-slate-600 mb-1 sm:mb-1.5 lg:mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full h-10 sm:h-11 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-10 sm:pr-12 outline-none focus:ring-2 focus:ring-[#2563EB] text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="mt-1 w-3.5 h-3.5 sm:w-4 sm:h-4 accent-[#006B5F] shrink-0"
              />
              <span className="text-[11px] sm:text-xs lg:text-sm text-slate-600 leading-5 sm:leading-6">
                I agree to the{" "}
                <Link to="/terms" className="text-[#006B5F] font-semibold hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy-policy" className="text-[#006B5F] font-semibold hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-semibold text-sm sm:text-base hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-2">
                  <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
                    <path fill="white" d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z" />
                  </svg>
                  Creating Your Medorax Account...
                </div>
              ) : (
                "Get Started"
              )}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 mt-4 sm:mt-5 lg:mt-6 text-[10px] sm:text-xs text-slate-500">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <ShieldCheck size={15} className="sm:size-[18px]" /> HIPAA
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <BadgeCheck size={15} className="sm:size-[18px]" /> SOC2
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Lock size={15} className="sm:size-[18px]" /> ENCRYPTED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}