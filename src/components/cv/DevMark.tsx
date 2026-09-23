"use client";

import { useEffect } from "react";
import { useLang } from "./language";

const shown = new Set<string>();

export function DevMark() {
  const { lang } = useLang();

  useEffect(() => {
    if (shown.has(lang)) return;
    shown.add(lang);

    const he = lang === "he";
    const title = he ? "בודק אותי?" : "Checking me out?";
    const line = he
      ? "אני עיצבתי את האתר. אם הגעת לפה, סימן שיש לנו הרבה על מה לדבר."
      : "I designed this site. If you made it here, we have a lot to talk about.";

    console.log(
      `%c${title}`,
      [
        "font: italic 700 64px/1 Rubik, Arial, sans-serif",
        "color: #ebe6dc",
        "background: #1f211a",
        "padding: 28px 40px 14px",
        "border-top: 10px solid #c56a32",
      ].join(";"),
    );
    console.log(
      `%c${line}`,
      [
        "font: 500 22px/1.45 Rubik, Arial, sans-serif",
        "color: #1f211a",
        "background: #ebe6dc",
        "padding: 16px 40px 26px",
      ].join(";"),
    );
  }, [lang]);

  return null;
}
