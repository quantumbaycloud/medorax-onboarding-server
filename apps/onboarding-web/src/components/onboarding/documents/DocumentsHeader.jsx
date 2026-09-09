import ProgressSummary from "./ProgressSummary";

export default function DocumentsHeader({
  uploadedCount,
  total,
  requiredCount,
  uploadedRequired,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-10">
      {/* Left */}
      <div className="max-w-3xl w-full">
        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-[#0EA5A4]/10
            px-3
            py-1
            text-[10px] sm:text-xs
            font-semibold
            text-[#006B5F]
          "
        >
          STEP 3 OF 5
        </span>

        <h1 className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold text-slate-900">
          Upload Business Documents
        </h1>

        <p className="mt-2 sm:mt-3 max-w-2xl text-sm sm:text-[15px] leading-6 sm:leading-7 text-slate-500">
          Upload the required business documents for verification.
          Please ensure all files are clear, valid and within the
          allowed file size.
        </p>

        <div className="mt-3 sm:mt-5 flex flex-wrap gap-2 sm:gap-3">
          <div className="rounded-xl bg-green-50 border border-green-200 px-3 sm:px-4 py-1.5 sm:py-2">
            <p className="text-[10px] sm:text-xs text-slate-500">
              Required
            </p>
            <p className="font-semibold text-green-700 text-sm sm:text-base">
              {uploadedRequired}/{requiredCount} Uploaded
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 border border-blue-200 px-3 sm:px-4 py-1.5 sm:py-2">
            <p className="text-[10px] sm:text-xs text-slate-500">
              Total
            </p>
            <p className="font-semibold text-blue-700 text-sm sm:text-base">
              {uploadedCount}/{total} Uploaded
            </p>
          </div>
        </div>
      </div>

      {/* Right - Progress Summary */}
      <div className="w-full lg:w-auto">
        <ProgressSummary
          uploaded={uploadedCount}
          total={total}
          requiredCount={requiredCount}
          uploadedRequired={uploadedRequired}
        />
      </div>
    </div>
  );
}