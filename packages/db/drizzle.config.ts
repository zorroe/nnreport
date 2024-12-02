// @ts-ignore
import path from "path";
import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../apps/server/.env") });

export default {
  schema: "../schema/src/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  casing: "snake_case",
} satisfies Config;
