"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { BackgroundOrbs } from "@/components/layout/BackgroundOrbs";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { SectionDivider } from "@/components/motion/SectionDivider";

function CVContent() {
  const { dir, locale } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);

  return (
    <div dir={dir} lang={locale} className="relative min-h-screen text-white">
      <span className="fixed right-3 top-2 z-50 text-[9px] text-white/20 select-none">בס&quot;ד</span>
      <BackgroundOrbs />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={locale}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="relative">
            <HeroSection />
          </div>

          <SectionDivider />

          <div className="relative bg-gradient-to-b from-white/[0.015] via-white/[0.025] to-white/[0.015]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
            <AboutSection />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
          </div>

          <SectionDivider />

          <div className="relative bg-gradient-to-b from-transparent via-amber-950/[0.03] to-transparent">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
            <ExperienceSection />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
          </div>

          <SectionDivider />

          <div className="relative bg-gradient-to-b from-white/[0.01] via-white/[0.02] to-white/[0.01]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
            <EducationSection />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
          </div>

          <SectionDivider />

          <div className="relative bg-gradient-to-b from-transparent via-amber-900/[0.025] to-transparent">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
            <SkillsSection />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
          </div>

          <SectionDivider />

          <div className="relative bg-gradient-to-b from-white/[0.015] via-white/[0.02] to-transparent">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0f] to-transparent" />
            <ContactSection />
          </div>
        </motion.main>
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/8 px-4 py-8 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Eytan Turgeman
      </footer>
    </div>
  );
}

export default function CVPage() {
  return (
    <LanguageProvider>
      <CVContent />
    </LanguageProvider>
  );
}
