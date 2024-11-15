import { jsonb, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const storageTypeTable = pgTable("storage_type", {
  id: serial().primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  type: varchar("type", { length: 256 }).notNull(),
  config: jsonb("config").notNull(),
});
