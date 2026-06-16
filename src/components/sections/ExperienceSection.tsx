"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  const { content } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(content.experience.items[0]?.id ?? null);

  return (
    <section id="experience" className="scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={content.experience.title} />

        <div className="relative">
          <div className="absolute top-0 bottom-0 start-[27px] hidden w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent sm:block" />

          <div className="space-y-4">
            {content.experience.items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <Reveal key={item.id} delay={index * 0.06}>
                  <motion.article
                    layout
                    onMouseEnter={() => setActiveId(item.id)}
                    onClick={() => setActiveId(isActive ? null : item.id)}
                    className={`group relative cursor-pointer rounded-2xl border transition-colors duration-300 sm:ps-16 ${
                      isActive
                        ? "border-indigo-400/30 bg-indigo-500/[0.06]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="absolute start-[19px] top-8 hidden h-4 w-4 rounded-full border-2 border-indigo-400 bg-[#0a0a0f] sm:block">
                      {isActive && (
                        <motion.span
                          layoutId="timeline-dot"
                          className="absolute inset-0.5 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-400"
                        />
                      )}
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-start gap-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5"
                        >
                          <Image
                            src={item.logo}
                            alt={item.company}
                            fill
                            className="object-contain p-2"
                            sizes="48px"
                          />
                        </motion.div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/60">
                              {item.period}
                            </span>
                          </div>
                          <p className="mt-0.5 text-sm font-medium text-cyan-300/90">{item.company}</p>
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                              {item.bullets.map((bullet) => (
                                <li
                                  key={bullet.slice(0, 40)}
                                  className="flex gap-2 text-sm leading-relaxed text-white/65"
                                >
                                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                                  <span>{bullet}</span>
                                </li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
