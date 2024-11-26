import { Inject, Injectable } from "@nestjs/common";
import { mediaFileTable } from "@nnreport/schema";
import { eq } from "drizzle-orm";

import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class MediaFileService {
  constructor(@Inject(DB) private db: DbType) {}

  insert(mediaFileDto) {
    return this.db.insert(mediaFileTable).values(mediaFileDto).returning();
  }

  list(params: any) {
    return this.db.select().from(mediaFileTable).where(eq(mediaFileTable.deleted, "0"));
  }

  delete(filename: string) {
    return this.db
      .update(mediaFileTable)
      .set({ deleted: "1" })
      .where(eq(mediaFileTable.filename, filename));
  }
}
