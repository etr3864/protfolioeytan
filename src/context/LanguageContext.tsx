"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cvContent, type Locale } from "@/data/cv";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  content: (typeof cvContent)["en"];
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("cv-locale") as Locale | null;
    if (saved === "en" || saved === "he") {
      setLocaleState(saved);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("cv-locale", next);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "he" ? "en" : "he");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      content: cvContent[locale],
      dir: locale === "he" ? ("rtl" as const) : ("ltr" as const),
    }),
    [locale, setLocale, toggleLocale],
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white/90">
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-amber-400" />
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
