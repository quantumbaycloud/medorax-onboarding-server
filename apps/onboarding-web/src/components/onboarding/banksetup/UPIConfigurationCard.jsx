import { Smartphone, Loader2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function UPIConfigurationCard({
  bankData,
  updateField,
  verifyBusinessUPI,
  loading = false,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-[#0EA5A4]/10">
          <Smartphone size={18} className="text-[#0EA5A4]" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">UPI Configuration</h2>
          <p className="text-xs text-slate-500">
            Add your business UPI ID for instant settlements (Optional).
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="mt-3 sm:mt-4">
        <label className="mb-1 block text-xs font-medium text-slate-700">
          Business UPI ID
        </label>

        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={bankData.upiId}
              placeholder="example@okhdfcbank"
              onChange={(e) => {
                updateField("upiId", e.target.value);
                updateField("upiVerified", false);
              }}
              className="h-9 sm:h-10 w-full rounded-xl border border-slate-300 px-3 pr-8 sm:pr-10 text-sm outline-none focus:border-[#0EA5A4]"
            />

            {bankData.upiVerified && (
              <CheckCircle2
                size={14}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-green-500"
              />
            )}
          </div>

          <button
            type="button"
            disabled={loading || !bankData.upiId.trim()}
            onClick={verifyBusinessUPI}
            className={`
              h-9 sm:h-10 rounded-xl px-3 sm:px-5 text-xs sm:text-sm font-semibold transition-all 
              flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap
              ${loading
                ? "cursor-not-allowed bg-slate-300 text-white"
                : bankData.upiVerified
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white hover:shadow-lg"}
            `}
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Verifying...
              </>
            ) : bankData.upiVerified ? (
              "✓ Verified"
            ) : (
              "Verify UPI"
            )}
          </button>
        </div>

        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs text-slate-500">
          Your UPI ID will be used for faster settlements and payment reconciliation.
        </p>
      </div>

      {/* Success Message */}
      {bankData.upiVerified && (
        <div className="mt-3 sm:mt-4 rounded-xl border border-green-200 bg-green-50 p-2.5 sm:p-3 flex items-center gap-2">
          <ShieldCheck size={16} className="text-green-600 flex-shrink-0" />
          <div className="min-w-0">
            <h4 className="text-xs sm:text-sm font-semibold text-green-700">
              UPI Verified Successfully
            </h4>
            <p className="text-[10px] sm:text-xs text-green-600">
              Your Business UPI ID is ready for instant settlements.
            </p>
          </div>
        </div>
      )}
    </div>
  );
} 