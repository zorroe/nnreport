import { Module } from "@nestjs/common";

import { MediaFileController } from "./mediaFile.controller";
import { MediaFileService } from "./mediaFile.service";

@Module({
  imports: [],
  controllers: [MediaFileController],
  providers: [MediaFileService],
})
export class MediaFileModule {}
