import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const port = app.get(EnvironmentService).getPort();

  await app.listen(port, () => {
    Logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
