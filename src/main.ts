import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // para poder configurar los validadores
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // global prefix
  app.setGlobalPrefix('api/v1');

  // para agregar la documentacion de toda la api
  const config = new DocumentBuilder()
    .setTitle('Caneadm')
    .setDescription('The administration panel for Cane Medallones Vegetarianos')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  await app.listen(3000);
  console.log(`Cane-Server is running on port:3000`);
}
bootstrap();
