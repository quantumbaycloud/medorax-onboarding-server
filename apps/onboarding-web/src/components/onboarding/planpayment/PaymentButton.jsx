// PaymentButton.jsx - Clean Redesign (Optional, can be removed if using inline button)
import { Lock, Loader2 } from "lucide-react";

export default function PaymentButton({ 
  loading, 
  payNow, 
  disabled = false,
  text = "Pay Securely"
}) {
  return (
    <button
      onClick={payNow}
      disabled={loading || disabled}
      className={`
        w-full h-12 rounded-xl font-semibold text-white transition-all duration-300
        flex items-center justify-center gap-2.5
        ${loading || disabled
          ? "bg-slate-300 cursor-not-allowed"
          : "bg-gradient-to-r from-[#006B5F] to-[#0EA5A4] hover:shadow-lg hover:scale-[1.01] active:scale-[0.98]"}
      `}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Lock size={16} />
          {text}
        </>
      )}
    </button>
  );
}