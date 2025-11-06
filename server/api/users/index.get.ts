export default defineEventHandler(async (event) => {
  const { getUserFromEvent } = await import("../../utils/auth");
  const { user } = await getUserFromEvent(event);

  const db = useDatabase();
  const { rows } =
    await db.sql`SELECT id, firstName, lastName, email FROM users WHERE id = ${String(user.id)}`;
  return { users: rows };
});
