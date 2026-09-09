// OrderSummaryCard.jsx - Clean and responsive
import { Shield, Lock } from "lucide-react";

export default function OrderSummaryCard({
  subtotal = 0,
  gst = 0,
  convenienceFee = 0,
  total = 0,
  loading = false,
  handlePayment,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 md:p-6 shadow-sm flex flex-col h-full">
      <h2 className="text-base sm:text-lg font-bold text-slate-900">Order Summary</h2>

      {/* Divider */}
      <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
        <div className="flex justify-between items-center py-1.5 sm:py-2">
          <span className="text-xs sm:text-sm text-slate-600">Subtotal</span>
          <span className="text-sm sm:text-base font-semibold">₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center py-1.5 sm:py-2 border-t border-slate-100">
          <span className="text-xs sm:text-sm text-slate-600">GST (0%)</span>
          <span className="text-sm sm:text-base font-semibold">₹{gst.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center py-1.5 sm:py-2 border-t border-slate-100">
          <span className="text-xs sm:text-sm text-slate-600">Convenience Fee (2%)</span>
          <span className="text-sm sm:text-base font-semibold">₹{convenienceFee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between items-center py-2 sm:py-3 border-t-2 border-slate-200 mt-1">
          <span className="text-base sm:text-lg font-bold text-slate-900">Total</span>
          <span className="text-xl sm:text-2xl font-bold text-[#006B5F]">
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Progress Steps Indicator */}
      <div className="mt-3 sm:mt-4 flex items-center justify-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#006B5F]"></span>
          <span className="text-[8px] sm:text-[10px] font-medium text-[#006B5F]">Plan</span>
        </div>
        <div className="w-5 sm:w-8 h-[2px] bg-[#006B5F]"></div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#006B5F]"></span>
          <span className="text-[8px] sm:text-[10px] font-medium text-[#006B5F]">Payment</span>
        </div>
        <div className="w-5 sm:w-8 h-[2px] bg-slate-300"></div>
        <div className="flex items-center gap-1 sm:gap-1.5">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-300"></span>
          <span className="text-[8px] sm:text-[10px] font-medium text-slate-400">Bank</span>
        </div>
      </div>

      {/* Payment Button */}
      <div className="mt-3 sm:mt-4">
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`
            w-full h-10 sm:h-12 rounded-xl font-semibold text-white transition-all duration-300
            flex items-center justify-center gap-2 sm:gap-2.5 text-sm sm:text-base
            ${loading
              ? "bg-slate-300 cursor-not-allowed"
              : "bg-gradient-to-r from-[#006B5F] to-[#0EA5A4] hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"}
          `}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 sm:h-5 w-4 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Lock size={14} />
              Pay Securely
            </>
          )}
        </button>
      </div>

      {/* Security Note */}
      <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-500">
        <Shield size={12} className="text-[#0EA5A4]" />
        Secured Payment
        <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-slate-300" />
        <span className="flex items-center gap-0.5 sm:gap-1">
          <Lock size={10} />
          256-bit encryption
        </span>
      </div>

      <p className="mt-2 sm:mt-3 text-center text-[8px] sm:text-[10px] leading-3 sm:leading-4 text-slate-400 px-1">
        By continuing you agree to our{" "}
        <a href="#" className="text-[#006B5F] hover:underline font-medium">Terms</a>
        {" "}&amp;{" "}
        <a href="#" className="text-[#006B5F] hover:underline font-medium">Privacy Policy</a>
      </p>
    </div>
  );
}