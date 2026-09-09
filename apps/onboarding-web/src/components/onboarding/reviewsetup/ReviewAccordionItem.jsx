// ReviewAccordionItem.jsx
import { ChevronDown, Pencil } from "lucide-react";

export default function ReviewAccordionItem({
  icon: Icon,
  title,
  subtitle,
  isOpen,
  onToggle,
  onEdit,
  children,
  editDisabled = false,
  editLabel = "Edit",
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl sm:rounded-[28px]
        border
        border-slate-200
        bg-white/80
        backdrop-blur-md
        shadow-[0_12px_40px_rgba(15,23,42,.08)]
        transition-all
      "
    >
      {/* Header - Using div with onClick instead of button */}
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className="
          w-full
          flex
          items-center
          justify-between
          px-4 sm:px-6 lg:px-8
          py-4 sm:py-5 lg:py-6
          text-left
          hover:bg-slate-50/80
          transition
          gap-2 sm:gap-3
          cursor-pointer
          select-none
        "
      >
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 min-w-0 flex-1">
          {/* Icon */}
          <div
            className="
              w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
              rounded-full
              bg-[#E7F7F3]
              flex
              items-center
              justify-center
              flex-shrink-0
            "
          >
            <Icon
              size={18}
              className="text-[#006B5F]"
            />
          </div>

          {/* Title */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg lg:text-[22px] font-bold text-[#131B2E] truncate">
              {title}
            </h3>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm lg:text-[15px] text-slate-500 truncate">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 flex-shrink-0">
          {/* Edit Button - Navigates to edit page */}
          {onEdit && !editDisabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // Prevent accordion toggle
                onEdit();
              }}
              className="
                flex
                items-center
                gap-1 sm:gap-2
                rounded-lg sm:rounded-xl
                border
                border-[#D8E7FF]
                bg-white
                px-2.5 sm:px-3 lg:px-4
                py-1.5 sm:py-2
                text-[#006B5F]
                font-semibold
                hover:bg-[#F8FBFF]
                transition
                text-xs sm:text-sm
                cursor-pointer
              "
            >
              <Pencil size={14} />
              <span className="hidden xs:inline">{editLabel}</span>
            </button>
          )}

          {/* Chevron */}
          <ChevronDown
            size={20}
            className={`
              text-slate-500
              transition-transform
              duration-300
              flex-shrink-0
              ${isOpen ? "rotate-180" : ""}
            `}
          />
        </div>
      </div>

      {/* Body */}
      <div
        className={`
          grid
          transition-all
          duration-300
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}