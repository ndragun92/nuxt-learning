export default defineEventHandler(async () => {
  const db = useDatabase();

  // Create users table
  await db.sql`DROP TABLE IF EXISTS users`;
  await db.sql`CREATE TABLE IF NOT EXISTS users ("id" TEXT PRIMARY KEY, "firstName" TEXT, "lastName" TEXT, "email" TEXT UNIQUE NOT NULL, "password" TEXT)`;

  // Create todos table
  await db.sql`DROP TABLE IF EXISTS todos`;
  await db.sql`
    CREATE TABLE IF NOT EXISTS todos (
      "id" TEXT PRIMARY KEY,
      "userId" TEXT,
      "title" TEXT NOT NULL,
      "description" TEXT,
      "completed" INTEGER DEFAULT 0,
      "dueDate" TEXT,
      "priority" INTEGER DEFAULT 0,
      "createdAt" TEXT DEFAULT (datetime('now')),
      "updatedAt" TEXT DEFAULT (datetime('now')),
      FOREIGN KEY("userId") REFERENCES users("id") ON DELETE CASCADE
    )`;

  return {
    data: "Users and todos tables created",
  };
});
