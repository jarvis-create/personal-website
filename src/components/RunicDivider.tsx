import { motion } from "motion/react";

export function RunicDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-16 px-6">
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-[#8B0000]/30 to-[#8B0000]/50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />

      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className="text-[#ff6b35]/40"
        initial={{ opacity: 0, rotate: 0 }}
        whileInView={{ opacity: 1, rotate: 360 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <circle
          cx="20"
          cy="20"
          r="15"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path d="M20 8 L20 32" stroke="currentColor" strokeWidth="0.5" />
        <path d="M8 20 L32 20" stroke="currentColor" strokeWidth="0.5" />
        <circle
          cx="20"
          cy="20"
          r="8"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </motion.svg>

      <motion.div
        className="h-px flex-1 bg-gradient-to-l from-transparent via-[#8B0000]/30 to-[#8B0000]/50"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </div>
  );
}
