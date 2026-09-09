// src/components/login/Brand.jsx
import { motion } from "framer-motion";

export default function Brand() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="absolute top-8 left-6 md:left-10 lg:left-20 flex items-center gap-3 z-20"
    >
      <img
        src="/images/logo.png"
        alt="Medorax"
        className="w-11 h-11 object-contain"
        onError={(e) => {
          e.target.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuB59OfX4ACmxP5mRLqt8msh4PbpAEh_x5xULNivAQX-UTQHN0UaqedBhggfYHE57d5fKizyVys8LQBD7LBb2BNWPoXAO_Iq8Kv4d_V-CoTnK_xZVVDxFHBMsadxtJntoy85joG7yXS9FfMEPYvc7FgFVnQKcsaYTCFN3a6mY6NT4JX2wkF36hA7ph_V0daG2IBdixqm8IZdmPGtOqStf124BbfwtEGg2DxtNAkhVyNJcmnkd8ca_sAVAbY0RQPVyWrmSkA";
        }}
      />
      <h2 className="text-2xl font-bold tracking-tight">
        <span className="text-[#006B5F]">Medorax</span>{" "}
        <span className="text-[#2563EB]">ERP</span>
      </h2>
    </motion.div>
  );
}