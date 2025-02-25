import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // 👈 Autorise le frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // 👈 Si tu utilises des cookies ou l'authentification
  });
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap().catch((err) => console.error(err));
