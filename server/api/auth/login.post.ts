export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body || {};
  if (!email || !password)
    throw createError({
      statusCode: 400,
      message: "email and password are required",
    });

  const db = useDatabase();
  const normalizedEmail = String(email).trim().toLowerCase();
  const { rows } =
    await db.sql`SELECT * FROM users WHERE email = ${normalizedEmail} LIMIT 1`;
  const user = rows && rows[0];
  if (!user)
    throw createError({ statusCode: 401, message: "Invalid credentials" });

  // For now compare plaintext (not secure)
  if (user.password !== password)
    throw createError({ statusCode: 401, message: "Invalid credentials" });

  const { createToken } = await import("../../utils/auth");
  const token = createToken(String(user.id));
  return {
    user: {
      id: String(user.id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    token,
  };
});
