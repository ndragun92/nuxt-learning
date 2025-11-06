export default defineEventHandler(async (event) => {
  const { getUserFromEvent } = await import("../../utils/auth");
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  if (String(user.id) !== String(id))
    throw createError({ statusCode: 403, message: "Forbidden" });

  const db = useDatabase();
  const { rows } =
    await db.sql`SELECT id, firstName, lastName, email FROM users WHERE id = ${id}`;
  const userRow = rows && rows[0];
  if (!userRow)
    throw createError({ statusCode: 404, message: "User not found" });
  return { user: userRow };
});
