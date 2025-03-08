import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => console.error('Erreur Redis:', err));

async function testRedis() {
  await redisClient.connect();
  console.log('✅ Connexion réussie à Redis');

  await redisClient.set('test', 'Hello Redis!');
  const value = await redisClient.get('test');
  console.log(`🔹 Valeur stockée : ${value}`);

  await redisClient.disconnect();
}

testRedis().catch((err) => console.error('Erreur lors du test Redis:', err));
