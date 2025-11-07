export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  const body = await readBody(event);

  const db = useDatabase();
  const { rows: existingRows } =
    await db.sql`SELECT * FROM todos WHERE id = ${id}`;
  const existing = existingRows && existingRows[0];
  if (!existing)
    throw createError({ statusCode: 404, message: "Todo not found" });
  if (existing.userId !== user.id)
    throw createError({ statusCode: 403, message: "Forbidden" });

  if (Object.prototype.hasOwnProperty.call(body, "title")) {
    await db.sql`UPDATE todos SET title = ${body.title} WHERE id = ${id}`;
  }
  if (Object.prototype.hasOwnProperty.call(body, "description")) {
    await db.sql`UPDATE todos SET description = ${body.description} WHERE id = ${id}`;
  }
  if (Object.prototype.hasOwnProperty.call(body, "completed")) {
    await db.sql`UPDATE todos SET completed = ${body.completed ? 1 : 0} WHERE id = ${id}`;
  }
  if (Object.prototype.hasOwnProperty.call(body, "dueDate")) {
    await db.sql`UPDATE todos SET dueDate = ${body.dueDate} WHERE id = ${id}`;
  }
  if (Object.prototype.hasOwnProperty.call(body, "priority")) {
    await db.sql`UPDATE todos SET priority = ${body.priority ? 1 : 0} WHERE id = ${id}`;
  }

  const updatedAt = new Date().toISOString();
  await db.sql`UPDATE todos SET updatedAt = ${updatedAt} WHERE id = ${id}`;

  const result = await db.sql`SELECT * FROM todos WHERE id = ${id}`;
  const todo = result && result.rows ? result.rows[0] : null;
  return { todo };
});
