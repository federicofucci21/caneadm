import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //para poder configurar los validadores
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // global prefix
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
  console.log(`Cane-Server is running on port:3000`);
}
bootstrap();
