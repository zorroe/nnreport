import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { CreateMediaFileDto } from "./dto/createMediaFile.dto";
import { MediaFileService } from "./mediaFile.service";

@Controller("/api/media-file")
export class MediaFileController {
  constructor(
    private mediaFileService: MediaFileService,

    @InjectPinoLogger(MediaFileService.name)
    private readonly logger: PinoLogger,
  ) {}

  @Post("/insert")
  insert(@Body() mediaFileDto: CreateMediaFileDto) {
    return this.mediaFileService.insert(mediaFileDto);
  }

  @Get("/list")
  list() {
    this.logger.info("查询媒体文件列表");
    return this.mediaFileService.list();
  }

  @Delete("/delete")
  delete(@Body() body: any) {
    const { filename } = body;
    return this.mediaFileService.delete(filename);
  }
}
