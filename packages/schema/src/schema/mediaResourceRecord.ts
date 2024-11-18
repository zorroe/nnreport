import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

// 上传的Minio的资源记录
export const mediaResourceRecord = pgTable("report_media_resource_record", {
  id: serial("id").primaryKey(), // 主键ID
  fileUrl: varchar("file_url", { length: 255 }).notNull(), // 文件URL
  fileName: varchar("file_name", { length: 255 }).notNull(), // 文件名
  uploadTime: timestamp("upload_time").notNull().defaultNow(), // 上传时间，默认为当前时间
  fileType: varchar("file_type", { length: 50 }), // 文件类型（如图片、视频）
  delFlag: varchar("del_flag", { length: 1 }).default("0"), // 删除标记（0-正常，1-删除）
});
