import { guard } from "@/lib/hed/admin";
import { listConversations, storeReady } from "@/lib/hed/store";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const blocked = guard(request);
  if (blocked) return blocked;
  if (!storeReady()) return Response.json({ error: "nodb" }, { status: 503 });

  const params = new URL(request.url).searchParams;
  try {
    const rows = await listConversations({
      query: params.get("q") || undefined,
      from: params.get("from") || undefined,
      to: params.get("to") || undefined,
    });
    return Response.json({ conversations: rows });
  } catch (error) {
    console.error("admin list", error instanceof Error ? error.message : "failed");
    return Response.json({ error: "db" }, { status: 500 });
  }
}
