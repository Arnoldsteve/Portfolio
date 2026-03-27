import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Setup Swagger Document
  const config = new DocumentBuilder()
    .setTitle('Steve-Bot AI v3 API')
    .setDescription('The Technical Twin Backend for Steve Arnold Otieno')
    .setVersion('3.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // 2. Use Scalar for the UI
  app.use(
    '/reference',
    apiReference({
      spec: {
        content: document,
      },
      theme: 'purple', // Matches your V3 aesthetic
    }),
  );

  await app.listen(3001);
}
bootstrap();