import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

let db;

export async function setupDB() {
  if (db) return db;
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  return drizzle({ client: pool });
}
