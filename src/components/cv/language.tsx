"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { cv, type Locale } from "@/data/cv";

type LangValue = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  beginShift: (lang: Locale) => void;
  pending: Locale | null;
  clearPending: () => void;
  t: (typeof cv)["he"];
};

const LangContext = createContext<LangValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem("cv-lang");
    return saved === "he" || saved === "en" ? saved : "en";
  });
  const [pending, setPending] = useState<Locale | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("cv-lang");
    if (saved === "en" || saved === "he") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = cv[lang].dir;
  }, [lang]);

  const setLang = useCallback((next: Locale) => {
    localStorage.setItem("cv-lang", next);
    setLangState(next);
  }, []);

  const clearPending = useCallback(() => setPending(null), []);

  const beginShift = (next: Locale) => {
    if (next === lang || pending) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLang(next);
      return;
    }
    setPending(next);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, beginShift, pending, clearPending, t: cv[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("LanguageProvider missing");
  return value;
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const previous = el.style.position;
  el.style.position = "relative";
  const top = el.getBoundingClientRect().top + window.scrollY;
  el.style.position = previous;
  window.scrollTo({ top, behavior: "smooth" });
}
