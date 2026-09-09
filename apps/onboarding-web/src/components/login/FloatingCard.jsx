// src/components/login/FloatingCard.jsx
import { motion } from "framer-motion";
import GlassCard from "./GlassCard";

export default function FloatingCard() {
  return (
    <>
      {/* Revenue Card */}
      <motion.div
        animate={{
          y: [-8, 8, -8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-16 z-20"
      >
        <GlassCard className="w-64 p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
              📈
            </div>
            <div>
              <p className="text-white/80 text-sm">Revenue Growth</p>
              <h2 className="text-3xl font-bold text-[#4fdbc8]">+12.4%</h2>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Card */}
      <motion.div
        animate={{
          y: [8, -8, 8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-28 right-36 z-20"
      >
        <GlassCard className="w-80 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-2xl">
              🧠
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Demand Forecast</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]" />
            </div>
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-[60%] bg-gradient-to-r from-[#0EA5A4] to-[#2563EB]" />
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
}