import {
  Check,
  Loader2,
  Circle,
} from "lucide-react";

export default function TimelineStep({
  title,
  subtitle,
  status = "pending",
}) {
  const isCompleted = status === "completed";
  const isActive = status === "active";

  return (
    <div className="relative z-10 flex flex-col items-center flex-1 min-w-0">
      {/* Circle */}
      <div
        className={`
          w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
          rounded-full
          flex
          items-center
          justify-center
          border-2
          shadow-lg
          transition-all
          flex-shrink-0
          ${isCompleted ? "bg-green-500 border-green-500 text-white shadow-green-200" : ""}
          ${isActive ? "bg-[#E7F7F3] border-[#0EA5A4] text-[#006B5F] shadow-cyan-100" : ""}
          ${status === "pending" ? "bg-white border-slate-300 text-slate-400 shadow-slate-100" : ""}
        `}
      >
        {isCompleted && <Check size={16} />}
        {isActive && <Loader2 size={16} className="animate-spin" />}
        {status === "pending" && <Circle size={12} fill="currentColor" />}
      </div>

      {/* Text */}
      <div className="mt-2 sm:mt-3 lg:mt-5 text-center min-w-0">
        <h3
          className={`
            text-xs sm:text-sm lg:text-[18px]
            font-bold
            truncate
            ${isActive ? "text-[#006B5F]" : "text-[#131B2E]"}
          `}
        >
          {title}
        </h3>
        <p className="mt-0.5 sm:mt-1 lg:mt-2 text-[8px] sm:text-xs lg:text-sm text-slate-500 truncate">
          {subtitle}
        </p>
      </div>
    </div>
  );
}