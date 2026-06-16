"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

import { IconChart, IconCpu, IconUsers } from "@/components/ui/Icons";

const pillIcons: Record<string, React.ReactNode> = {
  cpu: <IconCpu className="h-5 w-5 text-amber-300" />,
  chart: <IconChart className="h-5 w-5 text-amber-300" />,
  users: <IconUsers className="h-5 w-5 text-amber-300" />,
};

export function AboutSection() {
  const { content } = useLanguage();

  return (
    <section id="about" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={content.about.title} />
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <motion.div
              whileHover={{ borderColor: "rgba(255,255,255,0.18)" }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8"
            >
              <div className="space-y-3 text-base leading-relaxed text-white/70 sm:text-[15px]">
                {content.about.text.split("\n").filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </Reveal>

          <div className="flex flex-col gap-3">
            <Reveal>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-white/40">
                {content.about.title === "אודותיי" ? "הרקע שלי" : "My Expertise"}
              </p>
            </Reveal>
            {content.about.pills.map((pill, i) => (
              <Reveal key={pill.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ x: 4, borderColor: "rgba(217,169,56,0.35)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.04] to-transparent p-4"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10">
                    {pillIcons[pill.icon] ?? "•"}
                  </span>
                  <span className="font-medium text-white/90">{pill.label}</span>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
