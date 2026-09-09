import { Eye, EyeOff } from "lucide-react";

export default function AccountNumberField({
  label,
  value,
  onChange,
  show,
  onToggle,
  error = false,
}) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\s/g, ''))}
          className={`
            h-9 sm:h-10
            w-full
            rounded-xl
            border
            px-2.5 sm:px-3
            pr-8 sm:pr-10
            text-xs sm:text-sm
            outline-none
            ${error
              ? "border-red-400 focus:border-red-400 ring-2 ring-red-500/20"
              : "border-slate-300 focus:border-[#0EA5A4] focus:ring-2 focus:ring-[#0EA5A4]/20"}
          `}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2"
        >
          {show ? (
            <EyeOff size={14} className="text-slate-500" />
          ) : (
            <Eye size={14} className="text-slate-500" />
          )}
        </button>
      </div>
    </div>
  );
}