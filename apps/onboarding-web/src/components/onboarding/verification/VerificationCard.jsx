// src/components/onboarding/verification/VerificationCard.jsx

import OTPInput from "./OTPInput";

export default function VerificationCard({
  icon,
  title,
  description,
  otp,
  setOtp,
  buttonText = "Verify",
  loading = false,
  onVerify,
  onResend,
  error = "",
  timer = 60,
  formatTime,
  isResending = false,
}) {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-[#E8F5F3] flex items-center justify-center">
          {icon}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-center text-[#131B2E] mb-2">
        {title}
      </h2>

      {/* Description */}
      <div className="text-center text-slate-600 text-sm sm:text-base mb-6">
        {description}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 animate-shake">
          <span className="block sm:inline text-sm">{error}</span>
        </div>
      )}

      {/* OTP Input */}
      <OTPInput value={otp} onChange={setOtp} length={6} />

      {/* Verify Button */}
      <button
        type="button"
        onClick={onVerify}
        disabled={loading}
        className="
          w-full
          py-3
          rounded-xl
          bg-gradient-to-r
          from-[#0EA5A4]
          to-[#2563EB]
          text-white
          font-semibold
          shadow-md
          transition-all
          duration-300
          hover:opacity-95
          disabled:opacity-50
          disabled:cursor-not-allowed
          flex
          items-center
          justify-center
          gap-2
        "
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </>
        ) : (
          buttonText
        )}
      </button>

      {/* Resend Section */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResend}
            disabled={timer > 0 || loading || isResending}
            className={`
              text-sm font-medium transition-colors
              ${timer > 0 || loading || isResending
                ? "text-slate-400 cursor-not-allowed"
                : "text-[#006B5F] hover:underline cursor-pointer"
              }
            `}
          >
            {isResending ? "Resending..." : "Resend Code"}
          </button>
        </div>

        {timer > 0 && (
          <p className="text-xs sm:text-sm text-slate-500">
            Request new code in{" "}
            <span className="font-bold text-[#131B2E]">
              {formatTime ? formatTime(timer) : `${String(Math.floor(timer / 60)).padStart(2, '0')}:${String(timer % 60).padStart(2, '0')}`}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}