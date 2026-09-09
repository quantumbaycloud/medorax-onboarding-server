import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function DocumentsFooter({
  onBack,
  onContinue,
  isSubmitting = false,
  uploadedCount = 0,
  totalDocs = 0,
  isAllRequiredUploaded = false,
}) {
  const progress =
    totalDocs === 0
      ? 0
      : Math.round((uploadedCount / totalDocs) * 100);

  return (
    <div
      className="
        bg-white
        border-t
        border-slate-200
        px-4 sm:px-6 lg:px-10
        py-3 sm:py-4
        shadow-[0_-10px_35px_rgba(15,23,42,.05)]
      "
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">

        {/* Left */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full lg:w-auto">
          <button
            onClick={onBack}
            disabled={isSubmitting}
            className="
              h-9 sm:h-10
              px-3 sm:px-5
              rounded-xl
              border
              border-slate-300
              bg-white
              font-semibold
              text-slate-700
              hover:border-[#0EA5A4]
              hover:text-[#0EA5A4]
              transition
              flex
              items-center
              gap-1.5 sm:gap-2
              disabled:opacity-50
              text-xs sm:text-sm
            "
          >
            <ArrowLeft size={16} />
            <span className="hidden xs:inline">Previous</span>
            <span className="inline xs:hidden">Back</span>
          </button>

          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-slate-700">
              Upload Progress
            </p>
            <div className="mt-1 flex items-center gap-3">
              <div className="w-24 sm:w-32 md:w-48 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#0EA5A4]
                    to-[#2563EB]
                    transition-all
                    duration-500
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
              <span className="text-xs font-semibold text-[#0EA5A4]">
                {progress}%
              </span>
            </div>
            <p className="mt-0.5 text-[10px] text-slate-500">
              {uploadedCount} of {totalDocs} documents uploaded
            </p>
          </div>

          {/* Mobile progress indicator */}
          <div className="sm:hidden flex items-center gap-2">
            <span className="text-xs font-semibold text-[#0EA5A4]">
              {progress}%
            </span>
            <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500">
              {uploadedCount}/{totalDocs}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-3 w-full lg:w-auto">
          {isAllRequiredUploaded ? (
            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                bg-green-50
                border
                border-green-200
                px-2.5 sm:px-3
                py-1 sm:py-1.5
                w-full xs:w-auto
                justify-center
              "
            >
              <CheckCircle2
                size={14}
                className="text-green-600"
              />
              <span className="text-[10px] sm:text-xs font-semibold text-green-700 whitespace-nowrap">
                <span className="hidden xs:inline">All Required Documents Uploaded</span>
                <span className="inline xs:hidden">Ready</span>
              </span>
            </div>
          ) : (
            <div
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                bg-orange-50
                border
                border-orange-200
                px-2.5 sm:px-3
                py-1 sm:py-1.5
                w-full xs:w-auto
                justify-center
              "
            >
              <AlertCircle
                size={14}
                className="text-orange-500"
              />
              <span className="text-[10px] sm:text-xs font-semibold text-orange-700 whitespace-nowrap">
                <span className="hidden xs:inline">Upload required documents</span>
                <span className="inline xs:hidden">Pending</span>
              </span>
            </div>
          )}

          <button
            onClick={onContinue}
            disabled={!isAllRequiredUploaded || isSubmitting}
            className={`
              h-9 sm:h-10
              px-4 sm:px-6
              rounded-xl
              font-semibold
              transition
              shadow-lg
              flex
              items-center
              gap-1.5 sm:gap-2
              text-xs sm:text-sm
              w-full xs:w-auto
              justify-center
              ${isAllRequiredUploaded
                ? "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white hover:shadow-xl"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={16} className="hidden xs:inline" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}