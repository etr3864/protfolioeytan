"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cvDownloads } from "@/data/cv";

const navIds = ["about", "experience", "education", "skills", "contact"] as const;

export function Navbar() {
  const { content, locale, toggleLocale, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
        className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border] duration-300 ${
          scrolled || menuOpen
            ? "border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button
            onClick={() => scrollTo("hero")}
            className="group text-sm font-semibold tracking-tight text-white transition-colors hover:text-cyan-300"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              {content.meta.name.split(" ")[0]}
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="rounded-lg px-3 py-2 text-sm text-white/70 transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="relative flex h-9 min-w-[72px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/90 transition-all duration-200 hover:border-white/20 hover:bg-white/10"
              aria-label="Toggle language"
            >
              <span className={locale === "he" ? "text-cyan-300" : "text-white/50"}>HE</span>
              <span className="mx-1.5 text-white/30">|</span>
              <span className={locale === "en" ? "text-cyan-300" : "text-white/50"}>EN</span>
            </button>

            <a
              href={cvDownloads[locale]}
              download
              className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] sm:inline-block"
            >
              {content.nav.downloadCv}
            </a>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/80 md:hidden"
              aria-label="Menu"
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1">
                <span className={`block h-0.5 w-4 bg-current transition-transform ${menuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-4 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-4 bg-current transition-transform ${menuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </div>
            </button>
          </div>
        </div>
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
              <a
                href={cvDownloads[locale]}
                download
                className="mt-4 w-full max-w-xs rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                {content.nav.downloadCv}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
