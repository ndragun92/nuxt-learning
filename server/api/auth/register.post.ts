export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { firstName, lastName, email, password } = body || {};

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: "email and password are required",
    });
  }

  const db = useDatabase();

  const normalizedEmail = String(email).trim().toLowerCase();

  // Check for existing email
  const existing =
    await db.sql`SELECT id FROM users WHERE email = ${normalizedEmail} LIMIT 1`;
  if (existing && existing.rows && existing.rows.length > 0) {
    throw createError({ statusCode: 409, message: "Email already in use" });
  }

  // simple unique id generation
  const id = String(Math.floor(Math.random() * 1_000_000_000));

  // Ideally hash the password - storing plaintext for this exercise
  try {
    await db.sql`INSERT INTO users (id, firstName, lastName, email, password) VALUES (${id}, ${firstName || ""}, ${lastName || ""}, ${normalizedEmail}, ${password})`;
  } catch (err: any) {
    const msg = String((err && err.message) || err);
    // Detect common sqlite / sql unique constraint messages (be permissive)
    if (/unique|constraint|UNIQUE/i.test(msg)) {
      throw createError({ statusCode: 409, message: "Email already in use" });
    }
    throw err;
  }

  // create fake token
  const { createToken } = await import("../../utils/auth");
  const token = createToken(id);

  return { user: { id, firstName, lastName, email: normalizedEmail }, token };
});
