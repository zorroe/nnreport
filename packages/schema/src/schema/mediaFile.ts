import { date, jsonb, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const storageTypeTable = pgTable("media_file", {
  id: serial().primaryKey(),
  filename: varchar({ length: 256 }).notNull(),
  filetype: varchar({ length: 32 }).notNull(),
  preview: text(),
  createTime: date().defaultNow(),
  updateTime: date().defaultNow(),
  // 逻辑删除
  deleted: varchar().default("0"),
});
