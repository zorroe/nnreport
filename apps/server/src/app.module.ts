import { Module } from "@nestjs/common";

import { GlobalModule } from "./global/global.module";
import { MediaFileModule } from "./mediaFile/mediaFile.module";

@Module({
  imports: [MediaFileModule, GlobalModule],
})
export class AppModule {}
