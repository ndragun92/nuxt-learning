export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const db = useDatabase();
  const { rows } =
    await db.sql`SELECT id, firstName, lastName, email FROM users WHERE id = ${String(user.id)}`;
  return { users: rows };
});
