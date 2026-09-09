import { motion } from "framer-motion";

export default function ProgressHeader({
  step = 3,
  totalSteps = 6,
  progress = 50,
  title = "Select Business Type",
  subtitle = "",
}) {
  const steps = [
    "WELCOME",
    "VERIFICATION",
    "BUSINESS TYPE",
    "BUSINESS INFO",
    "DOCUMENTS",
    "BANK SETUP",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-2 sm:mb-4"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 sm:gap-0">
        <div>
          <p className="text-[#006B5F] text-[10px] sm:text-sm tracking-[3px] sm:tracking-[4px] uppercase font-semibold">
            STEP {String(step).padStart(2, "0")} OF{" "}
            {String(totalSteps).padStart(2, "0")}
          </p>

          <h1 className="mt-1 text-2xl sm:text-[30px] font-bold">
            {title}
          </h1>

          <p className="mt-1 sm:mt-2 text-xs sm:text-base text-slate-500">
            {subtitle}
          </p>
        </div>

        <p className="text-[10px] sm:text-xs tracking-[3px] sm:tracking-[5px] uppercase font-semibold">
          {progress}% Complete
        </p>
      </div>

      {/* Progress */}
      <div className="mt-2 sm:mt-3 relative">
        {/* Background */}
        <div className="h-1.5 sm:h-2 rounded-full bg-[#E8EEFF]" />

        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
          className="
            absolute
            top-0
            left-0
            h-1.5 sm:h-2
            rounded-full
            bg-gradient-to-r
            from-[#0EA5A4]
            to-[#2563EB]
          "
        />
      </div>

      {/* Steps */}
      <div className="mt-1 sm:mt-2 grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2">
        {steps.map((item, index) => (
          <div
            key={item}
            className={`
              text-center
              text-[8px] sm:text-[13px]
              font-semibold
              uppercase
              transition-all
              truncate
              ${index + 1 === step
                ? "text-[#006B5F]"
                : "text-slate-500"
              }
            `}
          >
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  );
}