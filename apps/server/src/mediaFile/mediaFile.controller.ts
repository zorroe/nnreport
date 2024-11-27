import { Body, Controller, Delete, Get, Param, Post, Query, Req } from "@nestjs/common";
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
  list(@Query() params: any) {
    return this.mediaFileService.list(params);
  }

  @Delete("/delete")
  delete(@Body() body: any) {
    const { filename } = body;
    return this.mediaFileService.delete(filename);
  }

  @Get("/total")
  total(@Query() params: any) {
    return this.mediaFileService.total(params);
  }
}
