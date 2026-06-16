"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  const { content } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(content.experience.items[0]?.id ?? null);
  const [isTouch, setIsTouch] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleToggle = useCallback((id: string, isActive: boolean) => {
    const nextId = isActive ? null : id;
    setActiveId(nextId);
    if (nextId && isTouch) {
      setTimeout(() => {
        cardRefs.current[nextId]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 350);
    }
  }, [isTouch]);

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
                    ref={(el) => { cardRefs.current[item.id] = el; }}
                    onMouseEnter={!isTouch ? () => setActiveId(item.id) : undefined}
                    onClick={() => handleToggle(item.id, isActive)}
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

                    <div className="p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-5">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 transition-all duration-200 hover:border-amber-500/30 sm:h-16 sm:w-16 sm:rounded-2xl ${item.id === "optive" ? "bg-white" : "bg-white/5"}`}
                          >
                            <Image src={item.logo} alt={item.company} fill className="object-contain p-2 sm:p-2.5" sizes="64px" />
                          </a>
                        ) : (
                          <div className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 sm:h-16 sm:w-16 sm:rounded-2xl ${item.id === "optive" ? "bg-white" : "bg-white/5"}`}>
                            <Image src={item.logo} alt={item.company} fill className="object-contain p-2 sm:p-2.5" sizes="64px" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="text-base font-bold text-white sm:text-xl">{item.role}</h3>
                              {item.url ? (
                                <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-white/50 transition-colors hover:text-amber-300 sm:text-sm">
                                  {item.company}
                                  <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l6-6M4.5 3H9v4.5" /></svg>
                                </a>
                              ) : (
                                <p className="mt-0.5 text-xs font-medium text-white/50 sm:text-sm">{item.company}</p>
                              )}
                            </div>
                            <motion.svg
                              animate={{ rotate: isActive ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="h-4 w-4 shrink-0 text-white/30 mt-1"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M4 6l4 4 4-4" />
                            </motion.svg>
                          </div>
                          <span className="mt-1.5 inline-block rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/45 sm:text-xs">
                            {item.period}
                          </span>
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
                            <ul className="mt-4 space-y-2 border-t border-white/8 pt-4 sm:mt-5 sm:space-y-2.5 sm:pt-5">
                              {item.bullets.map((bullet) => (
                                <li
                                  key={bullet.slice(0, 40)}
                                  className="flex gap-2.5 text-[12px] leading-relaxed text-white/60 sm:gap-3 sm:text-sm"
                                >
                                  <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/70" />
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
