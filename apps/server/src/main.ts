import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module";
import { ResultFormatInterceptor } from "./utils/interceptor/result-format.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // app.useLogger(app.get(Logger));
  app.enableCors();
  app.useGlobalInterceptors(new ResultFormatInterceptor());
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
