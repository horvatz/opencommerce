import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload-minimal';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(graphqlUploadExpress({ maxFieldSize: 10000000, maxFiles: 10 }));
  await app.listen(3000);
}
bootstrap();
