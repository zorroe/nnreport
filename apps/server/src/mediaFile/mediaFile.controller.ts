import { Body, Controller, Post, Req } from "@nestjs/common";

import { CreateMediaFileDto } from "./dto/createMediaFile.dto";
import { MediaFileService } from "./mediaFile.service";

@Controller("/api/media-file")
export class MediaFileController {
  constructor(private mediaFileService: MediaFileService) {}

  @Post("/insert")
  getHello(@Body() mediaFileDto: CreateMediaFileDto) {
    return this.mediaFileService.insert(mediaFileDto);
  }
}
