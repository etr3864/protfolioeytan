"use client";

import { useCallback, useEffect, useState } from "react";

type Row = {
  id: string;
  name: string;
  phone: string;
  role: string;
  lang: string;
  started_at: string;
  last_at: string;
  turns: number;
  preview: string;
};

type Detail = {
  id: string;
  name: string;
  phone: string;
  role: string;
  lang: string;
  started_at: string;
  last_at: string;
  messages: { role: "user" | "model"; text: string; at: string }[];
};

function instant(value: string) {
  const date = new Date(value.includes("T") ? value : value.replace(" ", "T"));
  return Number.isNaN(date.getTime()) ? null : date;
}

function when(value: string) {
  const date = instant(value);
  if (!date) return value;
  return date.toLocaleString("he-IL", {
    timeZone: "Asia/Jerusalem",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminBoard() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [open, setOpen] = useState<Detail | null>(null);
  const [query, setQuery] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/login")
      .then((response) => response.json())
      .then((payload: { signedIn?: boolean; error?: string }) => {
        setSignedIn(Boolean(payload.signedIn));
        if (payload.error === "unset") setNote("חסר ADMIN_PASSWORD בשרת.");
      })
      .catch(() => setNote("השרת לא זמין."))
      .finally(() => setReady(true));
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setNote("");
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (from) params.set("from", from);
    if (to) params.set("to", `${to}T23:59:59`);
    try {
      const response = await fetch(`/api/admin/conversations?${params}`);
      const payload = (await response.json()) as { conversations?: Row[]; error?: string };
      if (response.status === 401) {
        setSignedIn(false);
        return;
      }
      if (payload.error === "nodb") {
        setNote("אין חיבור לבסיס הנתונים. צריך DATABASE_URL.");
        return;
      }
      if (!response.ok) {
        setNote("הטעינה נכשלה.");
        return;
      }
      setRows(payload.conversations ?? []);
    } catch {
      setNote("הטעינה נכשלה.");
    } finally {
      setLoading(false);
    }
  }, [from, query, to]);

  useEffect(() => {
    if (signedIn) void load();
  }, [load, signedIn]);

  async function signIn() {
    setNote("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      setPassword("");
      setSignedIn(true);
      return;
    }
    const payload = (await response.json()) as { error?: string };
    setNote(payload.error === "rate" ? "יותר מדי ניסיונות. נסה בעוד עשר דקות." : payload.error === "unset" ? "חסר ADMIN_PASSWORD בשרת." : "סיסמה שגויה.");
  }

  async function signOut() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setSignedIn(false);
    setRows([]);
    setOpen(null);
  }

  async function show(id: string) {
    const response = await fetch(`/api/admin/conversations/${id}`);
    if (!response.ok) {
      setNote("השיחה לא נטענה.");
      return;
    }
    setOpen((await response.json()) as Detail);
  }

  async function remove(id: string) {
    if (!window.confirm("למחוק את השיחה?")) return;
    const response = await fetch(`/api/admin/conversations/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setNote("המחיקה נכשלה.");
      return;
    }
    if (open?.id === id) setOpen(null);
    setRows((current) => current.filter((row) => row.id !== id));
  }

  function exportRange() {
    const params = new URLSearchParams();
    if (from) params.set("from", from);
    if (to) params.set("to", `${to}T23:59:59`);
    window.location.href = `/api/admin/export?${params}`;
  }

  if (!ready) {
    return (
      <main className="adm" dir="rtl">
        <p className="adm-note">טוען.</p>
      </main>
    );
  }

  if (!signedIn) {
    return (
      <main className="adm adm-center" dir="rtl">
        <form
          className="adm-login"
          onSubmit={(event) => {
            event.preventDefault();
            void signIn();
          }}
        >
          <strong>שיחות שי</strong>
          <label>
            <span>סיסמה</span>
            <input type="password" value={password} autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} />
          </label>
          {note ? <em>{note}</em> : null}
          <button type="submit">כניסה</button>
        </form>
      </main>
    );
  }

  return (
    <main className="adm" dir="rtl">
      <header className="adm-head">
        <strong>שיחות שי</strong>
        <div className="adm-tools">
          <input placeholder="חיפוש בשם, טלפון, תפקיד או תוכן" value={query} onChange={(event) => setQuery(event.target.value)} />
          <label>
            <span>מתאריך</span>
            <input type="date" value={from} onChange={(event) => setFrom(event.target.value)} />
          </label>
          <label>
            <span>עד תאריך</span>
            <input type="date" value={to} onChange={(event) => setTo(event.target.value)} />
          </label>
          <button type="button" onClick={() => void load()}>
            {loading ? "טוען" : "רענון"}
          </button>
          <button type="button" onClick={exportRange}>
            ייצוא JSON
          </button>
          <button type="button" className="adm-ghost" onClick={() => void signOut()}>
            יציאה
          </button>
        </div>
      </header>

      {note ? <p className="adm-note">{note}</p> : null}

      <div className="adm-body">
        <ol className="adm-list">
          {rows.map((row) => (
            <li key={row.id} data-on={open?.id === row.id ? "1" : "0"}>
              <button type="button" onClick={() => void show(row.id)}>
                <b>{row.name}</b>
                <span className="adm-meta">
                  <bdi dir="ltr">{row.phone}</bdi> · {row.role}
                </span>
                <span className="adm-meta">
                  {when(row.started_at)} · {row.turns} הודעות · {row.lang === "he" ? "עברית" : "אנגלית"}
                </span>
                {row.preview ? <span className="adm-preview">{row.preview}</span> : null}
              </button>
              <button type="button" className="adm-del" aria-label="מחיקה" onClick={() => void remove(row.id)}>
                ×
              </button>
            </li>
          ))}
          {!rows.length && !loading ? <li className="adm-empty">אין שיחות בטווח הזה.</li> : null}
        </ol>

        <section className="adm-chat">
          {open ? (
            <>
              <header>
                <strong>{open.name}</strong>
                <span>
                  <bdi dir="ltr">{open.phone}</bdi> · {open.role}
                </span>
                <span>
                  {when(open.started_at)} עד {when(open.last_at)}
                </span>
              </header>
              <div className="adm-log">
                {open.messages.map((message, index) => (
                  <p key={`${message.at}-${index}`} className={message.role === "user" ? "adm-mine" : "adm-agent"}>
                    <span className="adm-who">{message.role === "user" ? open.name : "שי"}</span>
                    {message.text}
                    <span className="adm-at">{when(message.at)}</span>
                  </p>
                ))}
                {!open.messages.length ? <p className="adm-note">השיחה ריקה.</p> : null}
              </div>
            </>
          ) : (
            <p className="adm-note">בחר שיחה מהרשימה.</p>
          )}
        </section>
      </div>
    </main>
  );
}
