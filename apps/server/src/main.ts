import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // app.useLogger(app.get(Logger));
  app.enableCors();
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
