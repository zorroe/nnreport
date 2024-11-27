import { Inject, Injectable } from "@nestjs/common";
import { mediaFileTable } from "@nnreport/schema";
import { and, desc, eq, gte, ilike, lte, SQL } from "drizzle-orm";

import { DB, DbType } from "../global/providers/db.provider";
import { QueryMediaFileDto } from "./dto/mediaFile.dto";

@Injectable()
export class MediaFileService {
  constructor(@Inject(DB) private db: DbType) {}

  insert(mediaFileDto) {
    return this.db.insert(mediaFileTable).values(mediaFileDto).returning();
  }

  list(params: QueryMediaFileDto) {
    const { pageSize, pageNum, fileType, fileName, startTime, endTime } = params;
    const filters: SQL[] = [];
    if (fileType) {
      filters.push(eq(mediaFileTable.filetype, fileType));
    }
    if (fileName) {
      filters.push(ilike(mediaFileTable.filename, fileName));
    }
    if (startTime) {
      filters.push(gte(mediaFileTable.createTime, startTime));
    }
    if (endTime) {
      filters.push(lte(mediaFileTable.createTime, endTime));
    }
    filters.push(eq(mediaFileTable.deleted, "0"));
    return this.db
      .select()
      .from(mediaFileTable)
      .where(and(...filters))
      .orderBy(desc(mediaFileTable.id))
      .limit(Number(pageSize))
      .offset(Number((pageNum - 1) * pageSize));
  }

  delete(filename: string) {
    return this.db
      .update(mediaFileTable)
      .set({ deleted: "1" })
      .where(eq(mediaFileTable.filename, filename));
  }

  total(params: any) {
    const { fileType, fileName, startTime, endTime } = params;
    const filters: SQL[] = [];
    if (fileType) {
      filters.push(eq(mediaFileTable.filetype, fileType));
    }
    if (fileName) {
      filters.push(ilike(mediaFileTable.filename, fileName));
    }
    if (startTime) {
      filters.push(gte(mediaFileTable.createTime, startTime));
    }
    if (endTime) {
      filters.push(lte(mediaFileTable.createTime, endTime));
    }
    filters.push(eq(mediaFileTable.deleted, "0"));
    return this.db.$count(mediaFileTable, and(...filters));
  }
}
