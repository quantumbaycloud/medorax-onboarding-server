import { Info } from "lucide-react";
import { motion } from "framer-motion";

export default function InfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="
        mt-2 sm:mt-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        p-3 sm:p-4
        flex
        flex-col sm:flex-row
        items-start
        gap-3 sm:gap-4
        
      "
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0 ">
        <Info
          size={20}
          className="text-[#006B5F]"
        />
      </div>

      <div>
        <h3 className="font-semibold text-sm sm:text-base ">
          Why do we ask this?
        </h3>

        <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
          Your business type determines which ERP modules,
          dashboards and workflows will be enabled.
          You can always change or add another business type
          later from your profile settings.
        </p>
      </div>
    </motion.div>
  );
}