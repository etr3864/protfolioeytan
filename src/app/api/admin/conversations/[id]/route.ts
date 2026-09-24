import { guard } from "@/lib/hed/admin";
import { deleteConversation, getConversation, storeReady } from "@/lib/hed/store";

export const runtime = "nodejs";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = guard(request);
  if (blocked) return blocked;
  if (!storeReady()) return Response.json({ error: "nodb" }, { status: 503 });

  const { id } = await context.params;
  if (!UUID.test(id)) return Response.json({ error: "bad" }, { status: 400 });
  try {
    const found = await getConversation(id);
    if (!found) return Response.json({ error: "gone" }, { status: 404 });
    return Response.json(found);
  } catch (error) {
    console.error("admin read", error instanceof Error ? error.message : "failed");
    return Response.json({ error: "db" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const blocked = guard(request);
  if (blocked) return blocked;
  if (!storeReady()) return Response.json({ error: "nodb" }, { status: 503 });

  const { id } = await context.params;
  if (!UUID.test(id)) return Response.json({ error: "bad" }, { status: 400 });
  try {
    await deleteConversation(id);
    return Response.json({ deleted: true });
  } catch (error) {
    console.error("admin delete", error instanceof Error ? error.message : "failed");
    return Response.json({ error: "db" }, { status: 500 });
  }
}
