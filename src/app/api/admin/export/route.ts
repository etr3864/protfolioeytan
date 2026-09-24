import { guard } from "@/lib/hed/admin";
import { exportConversations, storeReady } from "@/lib/hed/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  if (!storeReady()) return Response.json({ error: "nodb" }, { status: 503 });

  const params = new URL(request.url).searchParams;
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;
  try {
    const conversations = await exportConversations({ from, to });
    const stamp = new Date().toISOString().slice(0, 10);
    const range = from || to ? `-${from || "start"}-to-${to || "now"}` : "";
    const payload = {
      exportedAt: new Date().toISOString(),
      from: from || null,
      to: to || null,
      count: conversations.length,
      conversations,
    };
    return new Response(JSON.stringify(payload, null, 2), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="shai-conversations-${stamp}${range}.json"`,
      },
    });
  } catch (error) {
    console.error("admin export", error instanceof Error ? error.message : "failed");
    return Response.json({ error: "db" }, { status: 500 });
  }
}
