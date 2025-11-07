// Simple in-memory token store and auth helpers for development/testing
// Not suitable for production.

const tokenStore = new Map<string, string>();

export function createToken(userId: string) {
  const token = Buffer.from(`${userId}:${Date.now()}`).toString("base64");
  tokenStore.set(token, userId);
  return token;
}

export function getUserIdFromToken(token: string | undefined) {
  if (!token) return null;
  return tokenStore.get(token) || null;
}

export async function getUserFromEvent(event: any) {
  const authHeader =
    getHeader(event, "authorization") || getHeader(event, "x-token");
  if (!authHeader)
    throw createError({ statusCode: 401, message: "Unauthorized - no token" });
  const token = String(authHeader).startsWith("Bearer ")
    ? String(authHeader).slice(7)
    : String(authHeader);
  const userId = getUserIdFromToken(token);
  if (!userId)
    throw createError({
      statusCode: 401,
      message: "Unauthorized - invalid token",
    });

  const db = useDatabase();
  const { rows } = await db.sql`SELECT * FROM users WHERE id = ${userId}`;
  const user = rows && rows[0];
  if (!user)
    throw createError({
      statusCode: 401,
      message: "Unauthorized - user not found",
    });
  return { user, token };
}
