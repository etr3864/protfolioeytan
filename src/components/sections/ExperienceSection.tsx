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
          <div className="absolute top-0 bottom-0 start-[35px] hidden w-px bg-gradient-to-b from-amber-600/40 via-white/8 to-transparent sm:block" />

          <div className="space-y-5">
            {content.experience.items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <Reveal key={item.id} delay={index * 0.08}>
                  <motion.article
                    onMouseEnter={() => setActiveId(item.id)}
                    onClick={() => setActiveId(isActive ? null : item.id)}
                    className={`group relative cursor-pointer rounded-2xl border transition-all duration-300 sm:ps-20 ${
                      isActive
                        ? "border-amber-500/20 bg-white/[0.03]"
                        : "border-white/8 bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="absolute start-[27px] top-8 hidden h-[18px] w-[18px] rounded-full border-2 border-white/20 bg-[#0a0a0f] sm:block">
                      {isActive && (
                        <motion.span
                          layoutId="timeline-dot"
                          className="absolute inset-[3px] rounded-full bg-amber-400"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-start gap-5">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-all duration-200 hover:border-amber-500/30 hover:scale-[1.06] ${item.id === "optive" ? "bg-white" : "bg-white/5"}`}
                          >
                            <Image src={item.logo} alt={item.company} fill className="object-contain p-2.5" sizes="64px" />
                          </a>
                        ) : (
                          <div className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/10 ${item.id === "optive" ? "bg-white" : "bg-white/5"}`}>
                            <Image src={item.logo} alt={item.company} fill className="object-contain p-2.5" sizes="64px" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-bold text-white sm:text-xl">{item.role}</h3>
                            <span className="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs text-white/50">
                              {item.period}
                            </span>
                          </div>
                          {item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-white/50 transition-colors hover:text-amber-300">
                              {item.company}
                              <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l6-6M4.5 3H9v4.5" /></svg>
                            </a>
                          ) : (
                            <p className="mt-1 text-sm font-medium text-white/50">{item.company}</p>
                          )}
                        </div>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="bullets"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                              opacity: { duration: 0.2, delay: 0.05 },
                            }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-5 space-y-2.5 border-t border-white/8 pt-5">
                              {item.bullets.map((bullet) => (
                                <li
                                  key={bullet.slice(0, 40)}
                                  className="flex gap-3 text-[13px] leading-relaxed text-white/60 sm:text-sm"
                                >
                                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
                                  <span dir="auto" className="text-start">{bullet}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
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
