export default defineEventHandler(async (event) => {
  const { getUserFromEvent } = await import("../../utils/auth");
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  const body = await readBody(event);
  const { title, description, completed, dueDate, priority } = body || {};

  const db = useDatabase();
  // Ensure todo belongs to user
  const { rows: existingRows } =
    await db.sql`SELECT * FROM todos WHERE id = ${id}`;
  const existing = existingRows && existingRows[0];
  if (!existing)
    throw createError({ statusCode: 404, message: "Todo not found" });
  if (existing.userId !== user.id)
    throw createError({ statusCode: 403, message: "Forbidden" });

  const updatedAt = new Date().toISOString();
  await db.sql`UPDATE todos SET title = ${title || ""}, description = ${description || ""}, completed = ${completed ? 1 : 0}, dueDate = ${dueDate || null}, priority = ${priority || 0}, updatedAt = ${updatedAt} WHERE id = ${id}`;

  const result = await db.sql`SELECT * FROM todos WHERE id = ${id}`;
  const todo = result && result.rows ? result.rows[0] : null;
  return { todo };
});
