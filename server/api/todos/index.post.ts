export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const body = await readBody(event);
  const { title, description, dueDate, priority } = body || {};
  if (!title)
    throw createError({ statusCode: 400, message: "title is required" });

  const db = useDatabase();
  const id = String(Math.floor(Math.random() * 1_000_000_000));
  const completed = 0;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  await db.sql`INSERT INTO todos VALUES (${id}, ${user.id}, ${title}, ${description || ""}, ${completed}, ${dueDate || null}, ${priority ? 1 : 0}, ${createdAt}, ${updatedAt})`;

  const result = await db.sql`SELECT * FROM todos WHERE id = ${id}`;
  const todo = result && result.rows ? result.rows[0] : null;
  return { todo };
});
