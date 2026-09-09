import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function BusinessTypeCard({
  icon,
  title,
  description,
  buttonText,
  selected,
  color = "#006B5F",
  onClick,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={onClick}
      className={`
        relative
        overflow-visible
        rounded-2xl sm:rounded-3xl
        border
        bg-white
        shadow-lg
        cursor-pointer
        transition-all
        duration-300
        ${selected
          ? "border-[#006B5F] ring-4 ring-teal-100"
          : "border-slate-200 hover:border-[#0EA5A4]"
        }
      `}
    >
      {/* Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-[95%] rounded-full bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]" />

      {/* Selected */}
      {selected && (
        <div className="absolute right-3 sm:right-5 top-3 sm:top-5">
          <CheckCircle2
            size={24}
            className="text-green-500"
          />
        </div>
      )}

      <div className="px-4 sm:px-6 py-4 flex flex-col items-center min-h-[200px] sm:min-h-[220px] justify-between">
        {/* Icon */}
        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.08,
          }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EAF7F5] flex items-center justify-center"
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h2 className="mt-2 sm:mt-3 text-lg sm:text-[22px] font-bold text-[#131B2E] text-center">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-1 sm:mt-2 text-sm sm:text-[18px] leading-4 sm:leading-5 text-center text-slate-600 px-1">
          {description}
        </p>

        {/* Button */}
        <button
          className={`
            mt-2 sm:mt-3
            px-6 sm:px-10
            py-1.5 sm:py-2
            rounded-full
            font-semibold
            text-sm sm:text-base
            border
            transition-all
            duration-300
            w-full sm:w-auto
            ${selected
              ? "bg-gradient-to-r from-[#0EA5A4] to-[#2563EB] text-white border-transparent"
              : "border-slate-300 text-slate-700 hover:bg-[#006B5F] hover:text-white"
            }
          `}
        >
          {selected ? "Selected" : buttonText}
        </button>
      </div>
    </motion.div>
  );
}