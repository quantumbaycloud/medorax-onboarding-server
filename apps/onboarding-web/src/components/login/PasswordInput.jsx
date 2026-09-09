// src/components/login/PasswordInput.jsx
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

export default function PasswordInput({
  value,
  onChange,
  error,
  disabled = false,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm sm:text-base font-semibold text-slate-700">
          Password
        </label>

        <button
          type="button"
          className="text-[#006B5F] hover:underline text-xs sm:text-sm"
          onClick={() => alert("Password reset functionality coming soon!")}
        >
          Forgot Password?
        </button>
      </div>

      <div
        className={`relative rounded-xl transition-all
        ${
          error
            ? "ring-2 ring-red-400"
            : "focus-within:ring-2 focus-within:ring-[#0EA5A4]"
        }`}
      >
        <Lock
          size={18}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="••••••••"
          autoComplete="current-password" // <-- ADD THIS
          className="w-full h-11 sm:h-12 md:h-14 rounded-xl bg-slate-100 pl-9 sm:pl-12 pr-10 sm:pr-14 text-sm sm:text-base outline-none transition-all focus:bg-white disabled:opacity-50"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
        >
          {show ? <EyeOff size={18} className="sm:w-5 sm:h-5" /> : <Eye size={18} className="sm:w-5 sm:h-5" />}
        </button>
      </div>

      {error && (
        <p className="text-xs sm:text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}