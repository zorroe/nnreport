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

  list() {
    return this.db.select().from(mediaFileTable).limit(5);
  }

  delete(filename: string) {
    return this.db.delete(mediaFileTable).where(eq(mediaFileTable.filename, filename));
  }
}
