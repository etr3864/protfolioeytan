"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categoryColors: Record<string, string> = {
  ai: "from-white/[0.06] to-white/[0.02] border-white/15 text-white/85",
  infra: "from-white/[0.05] to-white/[0.01] border-white/12 text-white/80",
  marketing: "from-amber-500/10 to-amber-500/[0.03] border-amber-500/15 text-amber-200",
  management: "from-amber-500/[0.06] to-transparent border-amber-500/10 text-amber-100",
};

export function SkillsSection() {
  const { content } = useLanguage();

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={content.skills.title} />

        <div className="grid gap-5 sm:grid-cols-2">
          {content.skills.categories.map((cat, catIndex) => (
            <Reveal key={cat.id} delay={catIndex * 0.08}>
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              >
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                  {cat.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.05 + i * 0.02, duration: 0.3 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className={`rounded-full border bg-gradient-to-r px-3 py-1.5 text-xs font-medium ${categoryColors[cat.id] ?? "border-white/10 text-white/70"}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
