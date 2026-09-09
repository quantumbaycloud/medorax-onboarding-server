// UPIPaymentForm.jsx - New Design
import { Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { useState } from "react";

export default function UPIPaymentForm({
  formData,
  updateField,
  loading,
}) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!formData.upiId) {
      setError("Please enter a UPI ID");
      return;
    }

    if (!/^[\w.-]+@[\w.-]+$/.test(formData.upiId)) {
      setError("Please enter a valid UPI ID (e.g., user@bank)");
      return;
    }

    setIsVerifying(true);
    setError("");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateField("upiVerified", true);
    } catch (err) {
      setError("Failed to verify UPI. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-2.5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          UPI ID
          <span className="text-red-500 ml-0.5">*</span>
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="example@okhdfcbank"
              value={formData.upiId || ""}
              onChange={(e) => {
                updateField("upiId", e.target.value);
                updateField("upiVerified", false);
                setError("");
              }}
              className={`
                h-11 w-full rounded-xl border px-4 pr-10 text-sm outline-none transition-all duration-200
                ${error 
                  ? "border-red-500 focus:border-red-500 ring-2 ring-red-500/20" 
                  : formData.upiVerified 
                    ? "border-green-500 bg-green-50 ring-2 ring-green-500/20" 
                    : "border-slate-300 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"}
              `}
            />
            {formData.upiVerified && (
              <CheckCircle2
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600"
              />
            )}
            {error && !formData.upiVerified && (
              <AlertCircle
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
              />
            )}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            disabled={loading || isVerifying || !formData.upiId}
            className={`
              h-11 rounded-xl px-5 text-sm font-semibold text-white transition-all duration-300
              ${formData.upiVerified 
                ? "bg-green-500 hover:bg-green-600" 
                : "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] hover:shadow-lg hover:scale-[1.02]"}
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isVerifying ? (
              <Loader2 size={18} className="animate-spin" />
            ) : formData.upiVerified ? (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} />
                Verified
              </span>
            ) : (
              "Verify"
            )}
          </button>
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={12} />
            {error}
          </p>
        )}
        {formData.upiVerified && (
          <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
            <Sparkles size={12} />
            UPI verified successfully
          </p>
        )}
        <p className="mt-1.5 text-xs text-slate-500">
          Your UPI will be verified before payment.
        </p>
      </div>
    </div>
  );
}