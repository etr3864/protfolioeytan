"use client";

import { useEffect, useRef, useState } from "react";
import { cv, type Locale } from "@/data/cv";
import { useLang } from "./language";

const OPEN = 500;
const HOLD = 1080;
const SHUT = 580;

export function LangShift() {
  const { pending, setLang, clearPending } = useLang();
  const [closing, setClosing] = useState<Locale | null>(null);
  const committed = useRef(false);
  const leave = pending !== null && closing === pending;

  useEffect(() => {
    if (!pending) return;
    committed.current = false;
    const commit = window.setTimeout(() => {
      committed.current = true;
      setLang(pending);
    }, OPEN);
    const shut = window.setTimeout(() => setClosing(pending), HOLD);
    const done = window.setTimeout(clearPending, HOLD + SHUT);
    return () => {
      window.clearTimeout(commit);
      window.clearTimeout(shut);
      window.clearTimeout(done);
    };
  }, [pending, setLang, clearPending]);

  if (!pending) return null;

  const next: Locale = pending;
  const word = next === "he" ? "עברית" : "English";
  const copy = cv[next];

  const skip = () => {
    if (!committed.current) setLang(next);
    clearPending();
  };

  return (
    <button
      type="button"
      className="lang-shift"
      data-leave={leave ? "1" : "0"}
      dir={copy.dir}
      lang={next}
      style={{ ["--origin" as string]: next === "he" ? "right" : "left" }}
      onClick={skip}
      aria-label={next === "he" ? "דילוג" : "Skip"}
    >
      <div className="lang-shift-top">
        <span>{copy.full}</span>
        <b dir="ltr">{next === "he" ? "HE" : "EN"}</b>
      </div>
      <h2>
        {word.split("").map((char, index) => (
          <span key={`${char}-${index}`} style={{ animationDelay: `${0.22 + index * 0.035}s` }}>
            {char}
          </span>
        ))}
      </h2>
      <div className="lang-shift-meter" aria-hidden="true">
        <i />
      </div>
    </button>
  );
}
