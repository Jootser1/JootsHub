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

function getHttpsOptions() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    // En production, utiliser les vrais certificats SSL
    const keyPath = process.env.SSL_KEY_PATH || '/etc/ssl/private/backend.key';
    const certPath = process.env.SSL_CERT_PATH || '/etc/ssl/certs/backend.crt';
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
    }
  } else {
    // En développement, utiliser des certificats auto-signés
    const keyPath = '/app/ssl/backend.key';
    const certPath = '/app/ssl/backend.crt';
    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
    }
  }
  
  // Fallback : pas de HTTPS
  return null;
}

async function bootstrap() {
  // Vérifier que le package types est construit
  await checkTypesPackage();

  const httpsOptions = getHttpsOptions();
  const logger = new Logger('Bootstrap');

  // Création de l'application avec ou sans HTTPS
  const app = httpsOptions 
    ? await NestFactory.create(AppModule, { httpsOptions })
    : await NestFactory.create(AppModule);

  // Ajouter le préfixe global API
  app.setGlobalPrefix('api');

  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://joots.app', 'https://www.joots.app']
        : ['https://localhost', 'https://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configuration WebSocket
  app.enableShutdownHooks();

  const port = process.env.PORT || 4000;
  await app.listen(port);
  
  const protocol = httpsOptions ? 'https' : 'http';
  logger.log(`🚀 Backend démarré sur ${protocol}://localhost:${port}`);
  logger.log(`SSL activé: ${httpsOptions ? '✅' : '❌'}`);
}
bootstrap().catch((err) => console.error(err));
