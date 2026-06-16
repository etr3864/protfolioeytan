"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cvDownloads } from "@/data/cv";
import { Reveal } from "@/components/motion/Reveal";

export function HeroSection() {
  const { content, locale } = useLanguage();

  return (
    <section id="hero" className="relative scroll-mt-20 px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <Reveal delay={0.05}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              {content.meta.location}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {content.meta.name}
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl text-lg text-white/70 sm:text-xl">
              {content.meta.title}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-6 flex flex-wrap gap-2">
              {content.hero.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-200"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-3">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-shadow hover:shadow-indigo-500/40"
              >
                {content.hero.ctaContact}
              </motion.a>
              <motion.a
                href={cvDownloads[locale]}
                download
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-white/25 hover:bg-white/10"
              >
                {content.hero.ctaDownload}
              </motion.a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} direction={locale === "he" ? "left" : "right"}>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/30 via-transparent to-cyan-500/30 blur-2xl" />
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-indigo-950 to-[#0a0a0f]">
                <Image
                  src="/images/profile.jpg"
                  alt={content.meta.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/10 bg-[#0a0a0f]/70 p-3 backdrop-blur-md">
                <p className="text-xs text-white/50">{content.hero.highlights.join(" · ")}</p>
                <p className="text-sm font-medium text-white">{content.meta.title}</p>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
