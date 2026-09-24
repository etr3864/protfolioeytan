import { createHash, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "hed-admin";

function secret() {
  return process.env.ADMIN_PASSWORD || "";
}

export function adminToken() {
  return createHash("sha256").update(`hed:${secret()}`).digest("hex");
}

export function passwordMatches(candidate: unknown) {
  const expected = secret();
  if (!expected || typeof candidate !== "string" || !candidate) return false;
  const a = createHash("sha256").update(candidate).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export function signedIn(request: Request) {
  if (!secret()) return false;
  const jar = request.headers.get("cookie") || "";
  const found = jar
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`));
  if (!found) return false;
  const value = found.slice(ADMIN_COOKIE.length + 1);
  const expected = adminToken();
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export function guard(request: Request) {
  if (!process.env.ADMIN_PASSWORD) return Response.json({ error: "unset" }, { status: 503 });
  if (!signedIn(request)) return Response.json({ error: "auth" }, { status: 401 });
  return null;
}
