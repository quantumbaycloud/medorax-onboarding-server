// src/pages/onboarding/OnboardingComplete.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Lock, Mail, Phone, Building2, FileText, CreditCard } from "lucide-react";
import VerificationLayout from "../../components/onboarding/verification/VerificationLayout";

export default function OnboardingComplete() {
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const email = localStorage.getItem("registrationEmail") || "your@email.com";
  const phone = localStorage.getItem("registrationPhone") || "+91 XXXXX XXXXX";
  const fullName = localStorage.getItem("registrationFullName") || "User";
  
  // Check if Part 1 is complete
  const part1Complete = localStorage.getItem("onboardingPart1Complete") === "true";

  const handleLogin = () => {
    console.log("🔐 Navigating to login page...");
    console.log("📧 Email:", email);
    console.log("✅ Part 1 Complete:", part1Complete);
    
    // ✅ Navigate to login WITHOUT the 'from' parameter
    navigate("/login", {
      state: {
        email: email,
        message: "Please login to complete your business setup",
        part1Complete: part1Complete
        // ❌ REMOVED: from: "/business-type" - This was causing the redirect
      },
      replace: true
    });
  };

  // If Part 1 is not complete, redirect back to registration
  if (!part1Complete) {
    console.warn("⚠️ Part 1 not complete, redirecting to registration...");
    navigate("/register", { replace: true });
    return null;
  }

  return (
    <VerificationLayout active="Verification">
      {/* Scrollable container for mobile */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 sm:py-4 md:py-6">
        <div className="flex flex-col items-center justify-center px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 min-h-[60vh] sm:min-h-[65vh] md:min-h-[70vh] max-w-3xl mx-auto">
          
          {/* Success Icon with Animation */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-50" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={36} className="text-green-600 sm:size-[44px]" />
            </div>
          </div>

          <h1 className="mt-4 sm:mt-5 md:mt-6 text-xl sm:text-2xl md:text-3xl font-bold text-center text-[#131B2E]">
            Account Verified Successfully! 🎉
          </h1>

          <p className="mt-2 sm:mt-3 text-center text-slate-600 max-w-md text-xs sm:text-sm md:text-base leading-relaxed px-2">
            Welcome <span className="font-semibold text-[#131B2E]">{fullName}</span>!
            Your email and mobile number have been successfully verified.
          </p>

          {/* Verified Details Cards */}
          <div className="mt-4 sm:mt-5 md:mt-6 w-full max-w-md space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-blue-600 sm:size-[16px]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-slate-500">Email</p>
                <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">{email}</p>
              </div>
              <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 sm:size-[16px]" />
            </div>

            <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                <Phone size={14} className="text-teal-600 sm:size-[16px]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] sm:text-xs text-slate-500">Mobile Number</p>
                <p className="text-xs sm:text-sm font-medium text-slate-800 truncate">{phone}</p>
              </div>
              <CheckCircle2 size={14} className="text-green-500 flex-shrink-0 sm:size-[16px]" />
            </div>
          </div>

          {/* Divider */}
          <div className="relative w-full max-w-md my-4 sm:my-5 md:my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 sm:px-4 bg-transparent text-[10px] sm:text-xs md:text-sm text-slate-500">
                Complete Your Business Setup
              </span>
            </div>
          </div>

          {/* Locked Part 2 Preview */}
          <div className="w-full max-w-md bg-gradient-to-r from-slate-50 to-white rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 md:mb-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Lock size={16} className="text-slate-400 sm:size-[18px]" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-700 text-xs sm:text-sm">Business Setup</p>
                <p className="text-[10px] sm:text-xs text-slate-500">
                  Complete your business profile after logging in
                </p>
              </div>
            </div>
            
            <div className="mt-2.5 sm:mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
              <div className="flex flex-col items-center p-1.5 sm:p-2 bg-white rounded-lg border border-slate-100">
                <Building2 size={12} className="text-slate-400 sm:size-[14px]" />
                <span className="text-[7px] sm:text-[8px] text-slate-500 mt-0.5 sm:mt-1 text-center">Business Type</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 bg-white rounded-lg border border-slate-100">
                <FileText size={12} className="text-slate-400 sm:size-[14px]" />
                <span className="text-[7px] sm:text-[8px] text-slate-500 mt-0.5 sm:mt-1 text-center">Documents</span>
              </div>
              <div className="flex flex-col items-center p-1.5 sm:p-2 bg-white rounded-lg border border-slate-100">
                <CreditCard size={12} className="text-slate-400 sm:size-[14px]" />
                <span className="text-[7px] sm:text-[8px] text-slate-500 mt-0.5 sm:mt-1 text-center">Payment</span>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full max-w-md py-3 sm:py-3.5 md:py-4 rounded-xl bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] px-4"
          >
            Login to Continue
            <ArrowRight size={16} className="sm:size-[18px]" />
          </button>

          <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs md:text-sm text-slate-500 text-center px-2">
            Login to complete your business setup
          </p>

          {/* Extra bottom spacing for mobile */}
          <div className="h-2 sm:h-4 md:h-6" />
        </div>
      </div>
    </VerificationLayout>
  );
}