"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/components/cv/language";
import { cleanHedText } from "@/lib/hed/text";

type Turn = { role: "user" | "model"; text: string; signature?: string };

const STORAGE = "hed-thread";
const THREAD_ID = "hed-conversation";
const PERSON = "hed-person";
const WINDOW = 150;

type Person = { name: string; phone: string; role: string };

export function Hed({ children }: { children: React.ReactNode }) {
  const { t, lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [present, setPresent] = useState(false);
  const [shown, setShown] = useState(false);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState("");
  const [messages, setMessages] = useState<Turn[]>([]);
  const [held, setHeld] = useState("");
  const [person, setPerson] = useState<Person>({ name: "", phone: "", role: "" });
  const [gateNote, setGateNote] = useState("");
  const thread = useRef("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const busy = useRef(false);
  const generation = useRef(0);

  useEffect(() => {
    thread.current = sessionStorage.getItem(THREAD_ID) || "";
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
    if (visible) {
      setPresent(true);
      return;
    }
    setShown(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPresent(false);
      return;
    }
    const timer = window.setTimeout(() => setPresent(false), 560);
    return () => window.clearTimeout(timer);
  }, [visible]);

  useEffect(() => {
    if (!present || !visible) return;
    const timer = window.setTimeout(() => setShown(true), 30);
    return () => window.clearTimeout(timer);
  }, [present, visible]);

  useEffect(() => {
    if (!shown) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown]);

  useEffect(() => {
    if (shown && !pending) inputRef.current?.focus();
  }, [pending, shown]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, pending, visible]);

  useEffect(() => {
    const field = inputRef.current;
    if (!field) return;
    field.style.height = "auto";
    field.style.height = `${Math.min(field.scrollHeight, 132)}px`;
  }, [draft, shown, lang]);

  async function send(text: string, who?: Person) {
    const clean = cleanHedText(text);
    if (!clean || busy.current) return;
    if (!thread.current && !who) {
      const saved = sessionStorage.getItem(PERSON);
      const known = saved ? (JSON.parse(saved) as Person) : null;
      if (known?.name && known.phone && known.role) {
        who = known;
      } else {
        setHeld(clean);
        setDraft("");
        setGateNote("");
        return;
      }
    }
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
        body: JSON.stringify({
          messages: next,
          locale: lang,
          ...(thread.current ? { conversationId: thread.current } : {}),
          ...(who ? { person: who } : {}),
        }),
      });
      const payload = (await response.json()) as { text?: string; signature?: string; conversationId?: string; error?: string };
      if (ticket !== generation.current) return;
      if (payload.conversationId && !thread.current) {
        thread.current = payload.conversationId;
        sessionStorage.setItem(THREAD_ID, payload.conversationId);
      }
      if (!response.ok || !payload.text) {
        const note = payload.error === "missing" ? t.hedMissing : payload.error === "rate" ? t.hedBusy : t.hedError;
        setNote(note);
        return;
      }
      const reply: Turn = { role: "model", text: payload.text };
      if (payload.signature) reply.signature = payload.signature;
      setMessages((current) => [...current, reply].slice(-WINDOW));
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
    thread.current = "";
    setPending(false);
    setMessages([]);
    setDraft("");
    setNote("");
    setHeld("");
    setGateNote("");
    sessionStorage.removeItem(STORAGE);
    sessionStorage.removeItem(THREAD_ID);
  }

  function submitPerson() {
    const trimmed: Person = {
      name: person.name.trim(),
      phone: person.phone.trim(),
      role: person.role.trim(),
    };
    if (!trimmed.name || !trimmed.phone || !trimmed.role) {
      setGateNote(t.hedGateError);
      return;
    }
    sessionStorage.setItem(PERSON, JSON.stringify(trimmed));
    const question = held;
    setHeld("");
    setGateNote("");
    void send(question, trimmed);
  }

  return (
    <>
      <div>{children}</div>
      {present ? null : (
        <button type="button" className="hed-mark" dir="ltr" aria-label={`${t.hedName}, ${t.hedMark}`} onClick={() => setVisible(true)}>
          <b>{t.hedName}</b>
          <small dir={lang === "he" ? "rtl" : "ltr"} lang={lang}>{t.hedMark}</small>
        </button>
      )}
      {present ? (
        <>
          <button type="button" className="hed-catch" data-open={shown ? "1" : "0"} aria-label={t.hedClose} onClick={() => setVisible(false)} />
          <aside className="hed-panel" data-open={shown ? "1" : "0"} role="dialog" aria-label={t.hedName} dir={lang === "he" ? "rtl" : "ltr"} lang={lang}>
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
              {messages.map((turn, index) => (
                <p key={`${turn.role}-${index}`} className={turn.role === "user" ? "mine" : "agent"}>
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
              {messages.length >= WINDOW - 10 ? <p className="hed-note">{t.hedLimit}</p> : null}
            </div>
            <p className="hed-credit">{t.botCredit}</p>
            {held ? (
              <form
                className="hed-gate"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitPerson();
                }}
              >
                <strong>{t.hedGateTitle}</strong>
                <small>{t.hedGateLine}</small>
                <label>
                  <span>{t.hedGateName}</span>
                  <input
                    value={person.name}
                    maxLength={120}
                    autoComplete="name"
                    data-clarity-mask="true"
                    onChange={(event) => setPerson((current) => ({ ...current, name: event.target.value }))}
                  />
                </label>
                <label>
                  <span>{t.hedGatePhone}</span>
                  <input
                    value={person.phone}
                    maxLength={120}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    dir="ltr"
                    data-clarity-mask="true"
                    onChange={(event) => setPerson((current) => ({ ...current, phone: event.target.value }))}
                  />
                </label>
                <label>
                  <span>{t.hedGateRole}</span>
                  <input
                    value={person.role}
                    maxLength={120}
                    autoComplete="organization-title"
                    data-clarity-mask="true"
                    onChange={(event) => setPerson((current) => ({ ...current, role: event.target.value }))}
                  />
                </label>
                {gateNote ? <em>{gateNote}</em> : null}
                <div className="hed-gate-row">
                  <button type="submit">{t.hedGateSend}</button>
                  <button
                    type="button"
                    className="hed-gate-back"
                    onClick={() => {
                      setDraft(held);
                      setHeld("");
                      setGateNote("");
                    }}
                  >
                    {t.hedGateBack}
                  </button>
                </div>
              </form>
            ) : null}
            <form
              className="hed-form"
              hidden={Boolean(held)}
              onSubmit={(event) => {
                event.preventDefault();
                send(draft);
              }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                maxLength={1200}
                placeholder={t.hedPlaceholder}
                aria-label={t.hedPlaceholder}
                disabled={pending}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
                  if (!window.matchMedia("(min-width: 901px)").matches) return;
                  event.preventDefault();
                  send(event.currentTarget.value);
                }}
              />
              <button type="submit" disabled={pending}>{t.hedSend}</button>
            </form>
          </aside>
        </>
      ) : null}
    </>
  );
}
