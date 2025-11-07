export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  const db = useDatabase();
  const { rows } = await db.sql`SELECT * FROM todos WHERE id = ${id}`;
  const todo = rows && rows[0];
  if (!todo) throw createError({ statusCode: 404, message: "Todo not found" });
  if (String(todo.userId) !== String(user.id))
    throw createError({ statusCode: 403, message: "Forbidden" });
  return { todo };
});
