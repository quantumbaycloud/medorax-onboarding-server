// BankFooter.jsx - Updated with bankData prop
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";

export default function BankFooter({
  canContinue,
  loading = false,
  onBack,
  onFinish,
  bankData, // Add this prop
}) {
  return (
    <div
      className="
        rounded-xl sm:rounded-2xl
        border
        border-slate-200
        bg-white/95
        backdrop-blur
        shadow-md sm:shadow-lg
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5 p-2 sm:p-3.5 lg:p-4">
        {/* Left - Hidden on very small screens */}
        <div className="hidden xs:flex items-center gap-2">
          <div className="w-0.5 h-5 sm:h-8 rounded-full bg-gradient-to-b from-[#0EA5A4] to-[#2563EB]" />
          <div>
            <h3 className="text-xs sm:text-sm lg:text-base font-bold text-slate-900">
              Final Step
            </h3>
            <p className="text-[8px] sm:text-[10px] lg:text-xs text-slate-500">
              Verify bank details & finish onboarding
            </p>
          </div>
        </div>

        {/* Left - Mobile only */}
        <div className="flex xs:hidden items-center justify-center gap-1.5">
          <div className="w-1 h-4 rounded-full bg-gradient-to-b from-[#0EA5A4] to-[#2563EB]" />
          <span className="text-xs font-semibold text-slate-900">Final Step</span>
          <span className="text-[8px] text-slate-400">•</span>
          <span className="text-[8px] text-slate-500">Verify bank details</span>
        </div>

        {/* Right - Buttons */}
        <div className="flex flex-col xs:flex-row items-center gap-1.5 sm:gap-2.5">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="
              flex
              h-7 sm:h-8 lg:h-10
              w-full xs:w-auto
              items-center
              justify-center
              gap-1 sm:gap-1.5 lg:gap-2
              rounded-lg sm:rounded-xl
              border
              border-slate-300
              bg-white
              px-2.5 sm:px-3.5 lg:px-5
              text-[10px] sm:text-xs lg:text-sm
              font-semibold
              text-slate-700
              transition
              hover:border-[#0EA5A4]
              hover:text-[#0EA5A4]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ArrowLeft size={12} />
            Back
          </button>

          <button
            type="button"
            onClick={onFinish}
            disabled={!canContinue || loading}
            className={`
              flex
              h-7 sm:h-8 lg:h-10
              w-full xs:w-auto
              min-w-[100px] sm:min-w-[130px] lg:min-w-[180px]
              items-center
              justify-center
              gap-1 sm:gap-1.5 lg:gap-2
              rounded-lg sm:rounded-xl
              px-3 sm:px-4 lg:px-6
              text-[10px] sm:text-xs lg:text-sm
              font-semibold
              transition-all
              ${canContinue && !loading
                ? "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white hover:shadow-lg"
                : "cursor-not-allowed bg-slate-200 text-slate-500"}
              ${loading ? "opacity-90" : ""}
            `}
          >
            {loading ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                <span className="hidden xs:inline">Saving...</span>
                <span className="inline xs:hidden">...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={12} />
                <span className="hidden xs:inline">Review & Finish</span>
                <span className="inline xs:hidden">Finish</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Info - Ultra thin */}
      <div className="border-t border-slate-200 bg-slate-50/80 px-2 sm:px-3.5 lg:px-4 py-0.5 sm:py-1 lg:py-1.5">
        {loading ? (
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-[8px] sm:text-[9px] lg:text-xs text-[#0EA5A4]">
            <Loader2 size={10} className="animate-spin" />
            <span className="truncate">Saving your bank details...</span>
          </div>
        ) : canContinue ? (
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-[8px] sm:text-[9px] lg:text-xs text-green-600">
            <CheckCircle2 size={10} />
            <span className="truncate">All required bank details completed. Review to finish.</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 text-[8px] sm:text-[9px] lg:text-xs text-slate-500">
            <div className="w-1 h-1 rounded-full bg-[#0EA5A4] flex-shrink-0" />
            <span className="truncate">
              {!bankData?.accountHolderName?.trim() && "Add account holder name • "}
              {!bankData?.accountNumber?.trim() && "Add account number • "}
              {bankData?.accountNumber && bankData?.confirmAccountNumber && bankData?.accountNumber !== bankData?.confirmAccountNumber && "Account numbers don't match • "}
              {!bankData?.ifscVerified && !(bankData?.bankName && (bankData?.branch || bankData?.branchName)) && "Verify IFSC or enter bank details • "}
              {!bankData?.chequeUploaded && "Upload cancelled cheque"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}