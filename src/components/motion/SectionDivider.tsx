"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative flex items-center justify-center py-12 sm:py-16">
      {/* Left line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full max-w-[180px] origin-end bg-gradient-to-r from-transparent to-white/15"
      />

      {/* Side dot left */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-3 h-1 w-1 shrink-0 rounded-full bg-white/20"
      />

      {/* Center diamond */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 45 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-2 h-2.5 w-2.5 shrink-0 border border-amber-400/30 bg-amber-400/10 shadow-sm shadow-amber-400/10"
      />

      {/* Side dot right */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-3 h-1 w-1 shrink-0 rounded-full bg-white/20"
      />

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full max-w-[180px] origin-start bg-gradient-to-r from-white/15 to-transparent"
      />

      {/* Ambient glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="pointer-events-none absolute h-8 w-32 rounded-full bg-amber-500/[0.03] blur-xl"
      />
    </div>
  );
}
