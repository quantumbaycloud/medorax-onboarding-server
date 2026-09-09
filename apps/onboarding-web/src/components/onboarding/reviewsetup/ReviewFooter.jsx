// ReviewFooter.jsx
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ReviewFooter({ onBack, onSubmit }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (onSubmit) await onSubmit();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col xs:flex-row items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5">
      <button
        onClick={onBack}
        className="
          flex
          items-center
          justify-center
          gap-1.5 sm:gap-2
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4 sm:px-5 lg:px-6
          py-2 sm:py-2.5 lg:py-3
          font-semibold
          text-slate-700
          transition-all
          hover:bg-slate-100
          w-full xs:w-auto
          text-sm sm:text-base
        "
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="
          flex
          items-center
          justify-center
          gap-2 sm:gap-2.5 lg:gap-3
          rounded-xl
          bg-gradient-to-r
          from-[#0EA5A4]
          to-[#2563EB]
          px-5 sm:px-6 lg:px-8
          py-2 sm:py-2.5 lg:py-3
          font-bold
          text-white
          shadow-[0_10px_30px_rgba(37,99,235,.25)]
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-70
          w-full xs:w-auto
          text-sm sm:text-base
        "
      >
        {loading ? (
          <>
            <svg className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" opacity="0.25" />
              <path fill="white" d="M22 12a10 10 0 00-10-10v4a6 6 0 016 6h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <span className="hidden xs:inline">Submit Final Application</span>
            <span className="inline xs:hidden">Submit</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </div>
  );
}