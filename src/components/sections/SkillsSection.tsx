"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categoryColors: Record<string, string> = {
  tech: "from-indigo-500/20 to-indigo-500/5 border-indigo-400/20 text-indigo-200",
  marketing: "from-cyan-500/20 to-cyan-500/5 border-cyan-400/20 text-cyan-200",
  leadership: "from-violet-500/20 to-violet-500/5 border-violet-400/20 text-violet-200",
};

export function SkillsSection() {
  const { content } = useLanguage();

  return (
    <section id="skills" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={content.skills.title} />

        <div className="grid gap-6 lg:grid-cols-3">
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
