export default defineEventHandler(async (event) => {
  const { getUserFromEvent } = await import("../../utils/auth");
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  if (String(user.id) !== String(id))
    throw createError({ statusCode: 403, message: "Forbidden" });

  const db = useDatabase();
  await db.sql`DELETE FROM users WHERE id = ${id}`;
  return { ok: true };
});
