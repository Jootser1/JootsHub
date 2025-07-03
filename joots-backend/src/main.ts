import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

async function checkTypesPackage() {
  const typesPath = path.resolve(__dirname, '../../../packages/types/dist/index.d.ts');
  if (!fs.existsSync(typesPath)) {
    throw new Error('Le package types n\'est pas construit. Veuillez exécuter "npm run build" dans le dossier packages/types');
  }
}

async function bootstrap() {
  // Vérifier que le package types est construit
  await checkTypesPackage();

  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000' // URL de production
        : 'http://localhost:3000', // URL de développement
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuration WebSocket
  app.enableShutdownHooks();

  await app.listen(process.env.PORT || 4000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => console.error(err));
