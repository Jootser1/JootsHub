import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://127.0.0.1:6379',
});

redisClient.on('error', (err) => console.error('❌ Erreur Redis:', err));

async function debugRedis() {
  try {
    await redisClient.connect();
    console.log('✅ Connexion réussie à Redis');

    // 1. Vérifier toutes les clés
    console.log('\n🔍 === ANALYSE DES CLÉS REDIS ===');
    const allKeys = await redisClient.keys('*');
    console.log(`📊 Nombre total de clés: ${allKeys.length}`);
    
    if (allKeys.length === 0) {
      console.log('⚠️  REDIS EST VIDE - Aucune clé trouvée');
      console.log('\n💡 Causes possibles:');
      console.log('   - Application backend non démarrée');
      console.log('   - Aucun utilisateur connecté récemment');
      console.log('   - Aucune conversation active');
      console.log('   - Clés expirées (TTL)');
    } else {
      console.log('\n📋 Clés trouvées:');
      allKeys.forEach(key => console.log(`   - ${key}`));
    }

    // 2. Analyser par pattern
    console.log('\n🔍 === ANALYSE PAR CATÉGORIE ===');
    
    // Utilisateurs en ligne
    const onlineUsers = await redisClient.sMembers('online_users');
    console.log(`👥 Utilisateurs en ligne: ${onlineUsers.length}`);
    if (onlineUsers.length > 0) {
      console.log(`   - Users: ${onlineUsers.join(', ')}`);
    }

    // Statuts utilisateurs
    const userStatusKeys = allKeys.filter(key => key.startsWith('user:status:'));
    console.log(`📡 Statuts utilisateurs: ${userStatusKeys.length}`);
    for (const key of userStatusKeys.slice(0, 5)) { // Limite à 5 pour éviter le spam
      const status = await redisClient.get(key);
      console.log(`   - ${key}: ${status}`);
    }

    // Conversations
    const conversationKeys = allKeys.filter(key => key.startsWith('conversation:'));
    console.log(`💬 Clés conversations: ${conversationKeys.length}`);
    for (const key of conversationKeys.slice(0, 3)) {
      const data = await redisClient.hGetAll(key);
      console.log(`   - ${key}:`, Object.keys(data).length, 'champs');
    }

    // Icebreakers
    const icebreakerKeys = allKeys.filter(key => key.startsWith('icebreaker:'));
    console.log(`❄️  Clés icebreaker: ${icebreakerKeys.length}`);
    for (const key of icebreakerKeys.slice(0, 3)) {
      const data = await redisClient.get(key);
      if (data) {
        console.log(`   - ${key}: ${data.length} caractères`);
      }
    }

    // 3. Test d'écriture
    console.log('\n🧪 === TEST D\'ÉCRITURE ===');
    await redisClient.set('debug:test', `Test effectué à ${new Date().toISOString()}`);
    const testValue = await redisClient.get('debug:test');
    console.log(`✅ Test d'écriture/lecture: ${testValue ? 'SUCCESS' : 'FAILED'}`);
    
    // 4. Info sur la base Redis
    console.log('\n📊 === INFORMATIONS REDIS ===');
    const info = await redisClient.info('keyspace');
    console.log('Base de données info:', info || 'Aucune info keyspace');

    // Nettoyer le test
    await redisClient.del('debug:test');

  } catch (error) {
    console.error('❌ Erreur lors du debug:', error);
  } finally {
    await redisClient.disconnect();
    console.log('\n👋 Connexion fermée');
  }
}

// Lancer le debug
debugRedis(); 