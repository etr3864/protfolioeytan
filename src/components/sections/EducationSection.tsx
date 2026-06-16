"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EducationSection() {
  const { content } = useLanguage();

  return (
    <section id="education" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={content.education.title} />

        <div className="grid gap-6 md:grid-cols-2">
          {content.education.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(99,102,241,0.35)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-indigo-950/50 to-[#0a0a0f]">
                  <Image
                    src={item.certImage}
                    alt={item.degree}
                    fill
                    className={`${item.certImage.endsWith(".jpg") || item.certImage.endsWith(".png") ? "object-contain p-3" : "object-cover"} transition-transform duration-500`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                  <span className="absolute start-3 top-3 rounded-md border border-white/10 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-wider text-white/50 backdrop-blur-sm">
                    Certificate
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{item.degree}</h3>
                  <p className="mt-1 text-sm text-cyan-300/80">{item.institution}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/50">
                    <span>{item.period}</span>
                    {item.grade && (
                      <>
                        <span>·</span>
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
                          {item.grade}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
