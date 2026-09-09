export default function ProgressSummary({
  uploaded,
  total,
  requiredCount = 0,
  uploadedRequired = 0,
}) {
  const progress =
    total === 0 ? 0 : (uploaded / total) * 100;

  const isComplete =
    uploadedRequired === requiredCount;

  return (
    <div className="w-full sm:w-[340px] rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">

      <p className="text-xs sm:text-sm text-slate-500">
        Upload Progress
      </p>

      <div className="mt-2 flex items-end gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#006B5F]">
          {uploaded}
        </h2>
        <span className="pb-1 text-slate-500 text-sm sm:text-base">
          / {total} Documents
        </span>
      </div>

      <div className="mt-4 sm:mt-5 h-2 rounded-full bg-slate-200 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-4 sm:mt-5 flex items-center justify-between">
        <div>
          <p className="text-[10px] sm:text-xs text-slate-500">
            Required
          </p>
          <p className="font-semibold text-slate-800 text-sm sm:text-base">
            {uploadedRequired}/{requiredCount}
          </p>
        </div>

        <div
          className={`rounded-full px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold ${
            isComplete
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {isComplete ? "Ready" : "Pending"}
        </div>
      </div>

    </div>
  );
}