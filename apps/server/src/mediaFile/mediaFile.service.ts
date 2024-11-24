import { Inject, Injectable } from "@nestjs/common";
import { mediaFileTable as mediaFileSchema } from "@nnreport/schema";

import { DB, DbType } from "../global/providers/db.provider";

@Injectable()
export class MediaFileService {
  constructor(@Inject(DB) private db: DbType) {}

  getHello(): string {
    return "Hello World!!";
  }

  insert(mediaFileDto) {
    return this.db.insert(mediaFileSchema).values(mediaFileDto).returning();
  }
}
