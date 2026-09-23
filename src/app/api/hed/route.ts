import { hedSystem } from "@/lib/hed/prompt";

export const runtime = "nodejs";

const WINDOW = 24;
const MAX_CHARS = 1200;
const LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

type Turn = { role: "user" | "model"; text: string };

const buckets: Map<string, number[]> = ((globalThis as { __hedBuckets?: Map<string, number[]> }).__hedBuckets ??= new Map());

function clientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "local";
}

function allowed(key: string) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((stamp) => now - stamp < WINDOW_MS);
  if (hits.length >= LIMIT) {
    buckets.set(key, hits);
    return false;
  }
  hits.push(now);
  buckets.set(key, hits);
  return true;
}

function readTurns(value: unknown): Turn[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > WINDOW) return null;
  const turns: Turn[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const text = (item as { text?: unknown }).text;
    if ((role !== "user" && role !== "model") || typeof text !== "string") return null;
    const clean = text.replace(/\s+/g, " ").trim();
    if (!clean || clean.length > MAX_CHARS) return null;
    turns.push({ role, text: clean });
  }
  if (turns[turns.length - 1]?.role !== "user") return null;
  if (turns[0]?.role !== "user") return null;
  return turns;
}

function replyText(payload: unknown) {
  const parts = (payload as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] })?.candidates?.[0]?.content?.parts;
  if (!parts) return "";
  return parts
    .filter((part) => part.text && !part.thought)
    .map((part) => part.text)
    .join("")
    .trim();
}

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ error: "missing" }, { status: 503 });
  if (!allowed(clientKey(request))) return Response.json({ error: "rate" }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad" }, { status: 400 });
  }

  const messages = readTurns((body as { messages?: unknown })?.messages);
  const locale = (body as { locale?: unknown })?.locale === "en" ? "en" : "he";
  if (!messages) return Response.json({ error: "bad" }, { status: 400 });

  const result = await ask(key, locale, messages);
  if (result.kind === "rate") return Response.json({ error: "rate" }, { status: 429 });
  if (result.kind === "empty") return Response.json({ error: "empty" }, { status: 502 });
  return Response.json({ text: result.text });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ask(key: string, locale: "he" | "en", messages: Turn[]): Promise<{ kind: "text"; text: string } | { kind: "rate" } | { kind: "empty" }> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    let upstream: Response;
    try {
      upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: hedSystem(locale) }] },
          contents: messages.map((turn) => ({ role: turn.role, parts: [{ text: turn.text }] })),
          generationConfig: {
            thinkingConfig: { thinkingLevel: "low" },
            maxOutputTokens: 1024,
          },
        }),
      });
    } catch {
      await sleep(400);
      continue;
    }
    if (upstream.status === 429) return { kind: "rate" };
    if (upstream.status >= 500) {
      await sleep(400);
      continue;
    }
    if (!upstream.ok) return { kind: "empty" };
    const text = replyText(await upstream.json());
    if (text) return { kind: "text", text };
    return { kind: "empty" };
  }
  return { kind: "empty" };
}
