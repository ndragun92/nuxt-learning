export default defineEventHandler(async (event) => {
  const { user } = await getUserFromEvent(event);

  const id = event.context.params?.id;
  if (String(user.id) !== String(id))
    throw createError({ statusCode: 403, message: "Forbidden" });

  const body = await readBody(event);
  const db = useDatabase();

  for (const key of Object.keys(body)) {
    if (["firstName", "lastName", "email", "password"].includes(key)) {
      // Explicit per-key parameterized update to avoid using non-existent db.sql.raw helper
      if (key === "firstName") {
        await db.sql`UPDATE users SET firstName = ${body.firstName} WHERE id = ${id}`;
      } else if (key === "lastName") {
        await db.sql`UPDATE users SET lastName = ${body.lastName} WHERE id = ${id}`;
      } else if (key === "email") {
        await db.sql`UPDATE users SET email = ${body.email} WHERE id = ${id}`;
      } else if (key === "password") {
        await db.sql`UPDATE users SET password = ${body.password} WHERE id = ${id}`;
      }
    }
  }

  return { ok: true };
});
