import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const mediaFileTable = pgTable("media_file", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 256 }).notNull(),
  filetype: varchar("filetype", { length: 32 }).notNull(),
  preview: text("preview"),
  createTime: timestamp("create_time").notNull().defaultNow(),
  updateTime: timestamp("update_time").notNull().defaultNow(),
  // 逻辑删除
  deleted: varchar("deleted").default("0"),
});
