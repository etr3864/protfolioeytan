"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/cv/language";

type Turn = { role: "user" | "model"; text: string };

const STORAGE = "hed-thread";
const WINDOW = 24;

export function Hed({ children }: { children: React.ReactNode }) {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState("");
  const [messages, setMessages] = useState<Turn[]>([]);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const busy = useRef(false);
  const generation = useRef(0);

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Turn[];
      if (Array.isArray(parsed)) setMessages(parsed.slice(-WINDOW));
    } catch {
      sessionStorage.removeItem(STORAGE);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem(STORAGE, JSON.stringify(messages.slice(-WINDOW)));
  }, [messages]);

  useEffect(() => {
    if (!visible) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  useEffect(() => {
    if (visible && !pending) inputRef.current?.focus();
  }, [pending, visible]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, pending, visible]);

  async function send(text: string) {
    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean || busy.current) return;
    const ticket = generation.current;
    busy.current = true;
    const next = [...messages, { role: "user" as const, text: clean }].slice(-WINDOW);
    setMessages(next);
    setDraft("");
    setNote("");
    setPending(true);
    try {
      const response = await fetch("/api/hed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale: lang }),
      });
      const payload = (await response.json()) as { text?: string; error?: string };
      if (ticket !== generation.current) return;
      if (!response.ok || !payload.text) {
        const note = payload.error === "missing" ? t.hedMissing : payload.error === "rate" ? t.hedBusy : t.hedError;
        setNote(note);
        return;
      }
      setMessages((current) => [...current, { role: "model" as const, text: payload.text as string }].slice(-WINDOW));
    } catch {
      if (ticket === generation.current) setNote(t.hedError);
    } finally {
      if (ticket === generation.current) {
        busy.current = false;
        setPending(false);
      }
    }
  }

  function reset() {
    generation.current += 1;
    busy.current = false;
    setPending(false);
    setMessages([]);
    setDraft("");
    setNote("");
    sessionStorage.removeItem(STORAGE);
  }

  return (
    <>
      <div>{children}</div>
      {visible ? null : (
        <button type="button" className="hed-mark" dir={lang === "he" ? "rtl" : "ltr"} onClick={() => setVisible(true)}>
          <span className="hed-mark-meter" aria-hidden="true" />
          <span className="hed-mark-body">
            <span className="hed-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <b>{t.hedName}</b>
            <small>{t.hedMark}</small>
          </span>
        </button>
      )}
      {visible ? (
        <>
          <button type="button" className="hed-catch" aria-label={t.hedClose} onClick={() => setVisible(false)} />
          <aside className="hed-panel" role="dialog" aria-label={t.hedName} dir={lang === "he" ? "rtl" : "ltr"} lang={lang}>
            <header className="hed-head">
              <strong>{t.hedName}</strong>
              <span className="hed-actions">
                <button type="button" className="hed-reset" onClick={reset} disabled={messages.length === 0 && !note && !draft}>
                  {t.hedReset}
                </button>
                <button type="button" onClick={() => setVisible(false)}>
                  {t.hedClose}
                </button>
              </span>
            </header>
            <div className="hed-log" ref={logRef}>
              <p>
                <span className="who">{t.hedName}</span>
                {t.hedGreeting}
              </p>
              {messages.map((turn, index) => (
                <p key={`${turn.role}-${index}`} className={turn.role === "user" ? "mine" : undefined}>
                  {turn.role === "model" ? <span className="who">{t.hedName}</span> : null}
                  {turn.text}
                </p>
              ))}
              {messages.length === 0 ? (
                <div className="suggest">
                  {t.hedSuggestions.map((suggestion) => (
                    <button key={suggestion} type="button" disabled={pending} onClick={() => send(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
              {pending ? (
                <p className="hed-note hed-think">
                  {t.hedThinking}
                  <span className="hed-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                </p>
              ) : null}
              {note ? <p className="hed-note">{note}</p> : null}
              {messages.length >= 20 ? <p className="hed-note">{t.hedLimit}</p> : null}
            </div>
            <p className="hed-credit">{t.botCredit}</p>
            <form
              className="hed-form"
              onSubmit={(event) => {
                event.preventDefault();
                send(draft);
              }}
            >
              <input
                ref={inputRef}
                value={draft}
                maxLength={1200}
                placeholder={t.hedPlaceholder}
                disabled={pending}
                onChange={(event) => setDraft(event.target.value)}
              />
              <button type="submit" disabled={pending}>{t.hedSend}</button>
            </form>
          </aside>
        </>
      ) : null}
    </>
  );
}
