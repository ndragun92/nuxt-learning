export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const db = useDatabase();
  const { rows } =
    await db.sql`SELECT * FROM todos WHERE userId = ${String(user.id)} ORDER BY priority DESC, updatedAt DESC`;
  return { todos: rows };
});
