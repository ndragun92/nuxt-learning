export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  if (String(user.id) !== String(id))
    throw createError({ statusCode: 403, message: "Forbidden" });

  const body = await readBody(event);
  const { firstName, lastName, email, password } = body || {};
  const db = useDatabase();
  // Replace user (simple implementation)
  await db.sql`UPDATE users SET firstName = ${firstName || ""}, lastName = ${lastName || ""}, email = ${email || ""}, password = ${password || ""} WHERE id = ${id}`;
  return { ok: true };
});
