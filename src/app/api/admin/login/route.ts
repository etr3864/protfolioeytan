import { ADMIN_COOKIE, adminToken, passwordMatches, signedIn } from "@/lib/hed/admin";

export const runtime = "nodejs";

const attempts: Map<string, number[]> = ((globalThis as { __hedAdminTries?: Map<string, number[]> }).__hedAdminTries ??= new Map());

function key(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

export async function GET(request: Request) {
  if (!process.env.ADMIN_PASSWORD) return Response.json({ error: "unset" }, { status: 503 });
  return Response.json({ signedIn: signedIn(request) });
}

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) return Response.json({ error: "unset" }, { status: 503 });

  const id = key(request);
  const now = Date.now();
  const recent = (attempts.get(id) ?? []).filter((stamp) => now - stamp < 10 * 60 * 1000);
  if (recent.length >= 10) {
    attempts.set(id, recent);
    return Response.json({ error: "rate" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad" }, { status: 400 });
  }

  if (!passwordMatches((body as { password?: unknown })?.password)) {
    recent.push(now);
    attempts.set(id, recent);
    return Response.json({ error: "auth" }, { status: 401 });
  }

  attempts.delete(id);
  const secure = new URL(request.url).protocol === "https:";
  return Response.json(
    { signedIn: true },
    {
      headers: {
        "Set-Cookie": `${ADMIN_COOKIE}=${adminToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=43200${secure ? "; Secure" : ""}`,
      },
    },
  );
}

export async function DELETE(request: Request) {
  const secure = new URL(request.url).protocol === "https:";
  return Response.json(
    { signedIn: false },
    {
      headers: {
        "Set-Cookie": `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`,
      },
    },
  );
}
