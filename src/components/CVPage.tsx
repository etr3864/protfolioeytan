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

function CVContent() {
  const { dir, locale } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
  }, [dir, locale]);

  return (
    <div dir={dir} lang={locale} className="relative min-h-screen text-white">
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
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <EducationSection />
          <SkillsSection />
          <ContactSection />
        </motion.main>
      </AnimatePresence>

      <footer className="relative z-10 border-t border-white/10 px-4 py-8 text-center text-xs text-white/40">
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
