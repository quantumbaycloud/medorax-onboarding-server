import { Loader2, CheckCircle2 } from "lucide-react";

export default function IFSCInput({
  value,
  onChange,
  onVerify,
  loading,
  verified,
  error,
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-700">
        IFSC Code
      </label>
      <div className="relative">
        <input
          value={value}
          maxLength={11}
          onChange={(e) => onChange(e.target.value.toUpperCase())}
          onBlur={onVerify}
          placeholder="HDFC0001234"
          className={`
            h-9 sm:h-10
            w-full
            rounded-xl
            border
            px-2.5 sm:px-3
            pr-8 sm:pr-10
            text-xs sm:text-sm
            uppercase
            outline-none
            ${error 
              ? "border-red-400 focus:border-red-400 ring-2 ring-red-500/20" 
              : "border-slate-300 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"}
          `}
        />
        <div className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2">
          {loading ? (
            <Loader2 size={14} className="animate-spin text-[#0EA5A4]" />
          ) : verified ? (
            <CheckCircle2 size={14} className="text-green-500" />
          ) : null}
        </div>
      </div>
      {error && (
        <p className="mt-1 text-[10px] sm:text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}