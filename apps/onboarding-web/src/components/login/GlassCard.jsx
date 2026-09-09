// src/components/login/GlassCard.jsx
import { motion } from "framer-motion";

export default function GlassCard({
  className = "",
  children,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
      }}
      className={`
        backdrop-blur-xl
        bg-white/10
        border
        border-white/20
        shadow-2xl
        rounded-3xl
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}