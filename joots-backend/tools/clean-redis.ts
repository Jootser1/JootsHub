import { RedisCleanerService } from './services/RedisCleanerService';

const redisCleaner = new RedisCleanerService(process.env.REDIS_URL || 'redis://localhost:6379');

async function main() {
  console.log('🧹 Cleaning Redis...');
  await redisCleaner.cleanAll();
  console.log('✅ Redis cleaned');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await redisCleaner.close();
  });
