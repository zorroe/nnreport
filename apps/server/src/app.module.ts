import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

import { GlobalModule } from "./global/global.module";
import { MediaFileModule } from "./mediaFile/mediaFile.module";

@Module({
  imports: [
    MediaFileModule,
    GlobalModule,
    LoggerModule.forRoot({
      // 自定义日志输出格式
      pinoHttp: { level: "info" },
    }),
  ],
})
export class AppModule {}
