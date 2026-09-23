"use client";

import { useEffect, useState } from "react";
import { useLang } from "./language";

const FILL = 1400;
const EXIT = 720;

export function Intro() {
  const { t, lang } = useLang();
  const [alive, setAlive] = useState(true);
  const [leave, setLeave] = useState(false);
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, [lang]);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAlive(false);
      return;
    }
    const start = performance.now();
    let frame = 0;
    let done = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / FILL);
      setPct(Math.round(progress * 100));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }
      setLeave(true);
      done = window.setTimeout(() => setAlive(false), EXIT);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, [ready]);

  if (!alive) return null;

  const lines = t.heroTitle.split(". ").map((line, index, all) => (index < all.length - 1 ? `${line}.` : line));

  return (
    <button type="button" className="intro" data-leave={leave ? "1" : "0"} onClick={() => setAlive(false)} aria-label={t.dir === "rtl" ? "דילוג על הפתיחה" : "Skip intro"}>
      <div className="intro-top">
        <span>{t.full}</span>
        <b dir="ltr">{String(pct).padStart(2, "0")}</b>
      </div>
      <h2>
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h2>
      <div className="intro-meter" aria-hidden="true">
        <i style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </button>
  );
}
