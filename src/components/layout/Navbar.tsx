"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const navIds = ["about", "experience", "education", "skills", "contact"] as const;

export function Navbar() {
  const { content, locale, toggleLocale, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = navIds.map((id) => ({
    id,
    label: content.nav[id],
  }));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled || menuOpen ? "rgba(15,15,20,0.7)" : "rgba(15,15,20,0)",
            backdropFilter: scrolled || menuOpen ? "blur(16px) saturate(1.2)" : "blur(0px)",
            borderColor: scrolled || menuOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex h-12 w-full max-w-4xl items-center justify-between rounded-full border px-5"
        >
          <nav className="hidden items-center gap-0.5 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="rounded-full px-3 py-1.5 text-[13px] text-white/60 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="flex h-8 items-center gap-1.5 rounded-full border border-white/8 bg-white/5 px-3 text-xs font-medium text-white/80 transition-all duration-200 hover:border-white/15 hover:bg-white/8"
              aria-label="Toggle language"
            >
              <span className={locale === "en" ? "text-amber-300" : "text-white/50"}>EN</span>
              <span className="text-white/20">|</span>
              <span className={locale === "he" ? "text-amber-300" : "text-white/50"}>HE</span>
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 md:hidden"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[3px]">
                <span className={`block h-[1.5px] w-3.5 bg-current transition-transform duration-200 ${menuOpen ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`block h-[1.5px] w-3.5 bg-current transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-[1.5px] w-3.5 bg-current transition-transform duration-200 ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden"
            dir={dir}
          >
            <motion.nav
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex h-full flex-col items-center justify-center gap-2 px-6 pt-16"
            >
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(link.id)}
                  className="w-full max-w-xs rounded-xl px-4 py-3 text-lg text-white/90 transition-colors hover:bg-white/5"
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
