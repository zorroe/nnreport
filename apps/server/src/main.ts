import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { setupDB } from "./common/db";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await setupDB();
  await app.listen(process.env.PORT ?? 4000);
}

bootstrap().then(() => console.log("启动成功"));
