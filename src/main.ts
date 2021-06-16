import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyMultipart from 'fastify-multipart';
import { version } from 'prettier';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableShutdownHooks();

  app.register(fastifyMultipart);

  const options = new DocumentBuilder()
    .setTitle('NestJS Fastify Streaming Server')
    .setDescription('Stream files to and from a MongoDB.')
    .setVersion(version)
    .addTag('File')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3101, '127.0.0.1', () => {
    console.log('Server listening at http://127.0.0.1:' + 3101 + '/api/');
  });
}
bootstrap();
