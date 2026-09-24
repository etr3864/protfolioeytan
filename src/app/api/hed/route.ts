import { hedSystem } from "@/lib/hed/prompt";
import { addTurns, startConversation, storeReady } from "@/lib/hed/store";
import { cleanHedText } from "@/lib/hed/text";

export const runtime = "nodejs";

const WINDOW = 150;
const USER_MAX = 1200;
const MODEL_MAX = 8000;
const LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

type Turn = { role: "user" | "model"; text: string; signature?: string };

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
    const signature = (item as { signature?: unknown }).signature;
    if ((role !== "user" && role !== "model") || typeof text !== "string") return null;
    const clean = cleanHedText(text);
    if (!clean || clean.length > (role === "user" ? USER_MAX : MODEL_MAX)) return null;
    if (signature !== undefined && (role !== "model" || typeof signature !== "string" || signature.length > 24000)) return null;
    turns.push(signature ? { role, text: clean, signature } : { role, text: clean });
  }
  if (turns[turns.length - 1]?.role !== "user") return null;
  if (turns[0]?.role !== "user") return null;
  return turns;
}

function replyFrom(payload: unknown) {
  const parts = (payload as { candidates?: { content?: { parts?: { text?: string; thought?: boolean; thoughtSignature?: string }[] } }[] })?.candidates?.[0]?.content?.parts;
  if (!parts) return { text: "" };
  const text = parts
    .filter((part) => part.text && !part.thought)
    .map((part) => part.text)
    .join("")
    .trim();
  const signature = [...parts].reverse().find((part) => part.thoughtSignature)?.thoughtSignature;
  return signature ? { text, signature } : { text };
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readPerson(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const field = (key: string) => {
    const raw = (value as Record<string, unknown>)[key];
    return typeof raw === "string" ? raw.replace(/\s+/g, " ").trim().slice(0, 120) : "";
  };
  const name = field("name");
  const phone = field("phone");
  const role = field("role");
  if (!name || !phone || !role) return null;
  return { name, phone, role };
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

  const person = readPerson((body as { person?: unknown })?.person);
  const passed = (body as { conversationId?: unknown })?.conversationId;
  let conversationId = typeof passed === "string" && UUID.test(passed) ? passed : "";
  if (!conversationId && !person) return Response.json({ error: "person" }, { status: 400 });

  const result = await ask(key, locale, messages);
  if (result.kind === "rate") return Response.json({ error: "rate" }, { status: 429 });
  if (result.kind === "empty") return Response.json({ error: "empty" }, { status: 502 });

  if (storeReady()) {
    try {
      if (!conversationId && person) {
        conversationId = await startConversation({ ...person, lang: locale });
        await addTurns(
          conversationId,
          messages.map((turn) => ({ role: turn.role, text: turn.text })),
        );
      } else if (conversationId) {
        await addTurns(conversationId, [{ role: "user", text: messages[messages.length - 1].text }]);
      }
      await addTurns(conversationId, [{ role: "model", text: result.text }]);
    } catch (error) {
      console.error("hed store", error instanceof Error ? error.message : "failed");
    }
  }

  return Response.json({
    text: result.text,
    ...(result.signature ? { signature: result.signature } : {}),
    ...(conversationId ? { conversationId } : {}),
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ask(key: string, locale: "he" | "en", messages: Turn[]): Promise<{ kind: "text"; text: string; signature?: string } | { kind: "rate" } | { kind: "empty" }> {
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
          contents: messages.map((turn) => ({
            role: turn.role,
            parts: [turn.signature ? { text: turn.text, thoughtSignature: turn.signature } : { text: turn.text }],
          })),
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
    if (upstream.status === 429) {
      const detail = (await upstream.text()).replace(/AIza[\w-]+/g, "[redacted]").slice(0, 500);
      console.error("hed upstream", 429, detail);
      return { kind: "rate" };
    }
    if (upstream.status >= 500) {
      await sleep(400);
      continue;
    }
    if (!upstream.ok) {
      const detail = (await upstream.text()).replace(/AIza[\w-]+/g, "[redacted]").slice(0, 400);
      console.error("hed upstream", upstream.status, detail);
      return { kind: "empty" };
    }
    const reply = replyFrom(await upstream.json());
    if (reply.text) return { kind: "text", ...reply };
    return { kind: "empty" };
  }
  return { kind: "empty" };
}
