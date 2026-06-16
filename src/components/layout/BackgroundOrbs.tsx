"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackgroundOrbs() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -80]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 start-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-600/10 blur-[100px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[40%] end-[-5%] h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[100px]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(10,10,15,0.4)_40%,#0a0a0f_100%)]" />
    </div>
  );
}
