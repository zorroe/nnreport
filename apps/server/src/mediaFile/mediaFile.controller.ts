import { Body, Controller, Delete, Get, Param, Post, Req } from "@nestjs/common";

import { CreateMediaFileDto } from "./dto/createMediaFile.dto";
import { MediaFileService } from "./mediaFile.service";

@Controller("/api/media-file")
export class MediaFileController {
  constructor(private mediaFileService: MediaFileService) {}

  @Post("/insert")
  insert(@Body() mediaFileDto: CreateMediaFileDto) {
    return this.mediaFileService.insert(mediaFileDto);
  }

  @Get("/list")
  list() {
    return this.mediaFileService.list();
  }

  @Delete("/delete")
  delete(@Body() body: any) {
    const { filename } = body;
    console.log(filename);
    return this.mediaFileService.delete(filename);
  }
}
