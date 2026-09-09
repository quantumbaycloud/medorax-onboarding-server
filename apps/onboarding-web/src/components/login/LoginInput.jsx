// src/components/login/LoginInput.jsx
import { Mail } from "lucide-react";

export default function LoginInput({
  value,
  onChange,
  error,
  disabled = false,
}) {
  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label className="text-sm sm:text-base font-semibold text-slate-700">
        Email Address
      </label>

      <div
        className={`relative rounded-xl transition-all
        ${
          error
            ? "ring-2 ring-red-400"
            : "focus-within:ring-2 focus-within:ring-[#0EA5A4]"
        }`}
      >
        <Mail
          size={18}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="email"
          placeholder="practitioner@medorax.com"
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete="email" // <-- ADD THIS
          className="w-full h-11 sm:h-12 md:h-14 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-3 sm:pr-4 text-sm sm:text-base outline-none transition-all focus:bg-white disabled:opacity-50"
        />
      </div>

      {error && (
        <p className="text-xs sm:text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}