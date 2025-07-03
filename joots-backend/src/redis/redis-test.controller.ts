import { Controller, Get, Post, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis-test')
export class RedisTestController {
  constructor(private readonly redisService: RedisService) {}

  @Get('ping')
  async ping() {
    try {
      // Test basique de connexion Redis
      await this.redisService.set('test:ping', 'pong', 30);
      const result = await this.redisService.get('test:ping');
      
      return {
        status: 'success',
        message: 'Redis connection OK',
        testResult: result,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Redis connection failed',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Post('simulate-user/:userId')
  async simulateUser(@Param('userId') userId: string) {
    try {
      // Simuler un utilisateur en ligne
      await this.redisService.setUserOnline(userId, 300);
      
      // Créer quelques clés de test
      await this.redisService.set(`user:${userId}:test`, 'data-test', 300);
      await this.redisService.hset(
        `conversation:test-conv:participants`, 
        userId, 
        JSON.stringify({
          is_icebreaker_ready: true,
          timestamp: new Date().toISOString()
        })
      );
      
      return {
        status: 'success',
        message: `Utilisateur simulé ${userId} créé dans Redis`,
        keysCreated: [
          `user:status:${userId}`,
          `user:${userId}:last_activity`,
          `user:${userId}:test`,
          `conversation:test-conv:participants`,
          'online_users'
        ],
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erreur lors de la simulation utilisateur',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Get('keys')
  async getAllKeys() {
    try {
      // Attention: keys() peut être lent sur de grosses bases
      // À utiliser uniquement en développement
      const keys = await this.redisService['redis'].keys('*');
      
      const keyDetails = {};
      for (const key of keys.slice(0, 20)) { // Limite à 20 clés
        try {
          const type = await this.redisService['redis'].type(key);
          if (type === 'string') {
            keyDetails[key] = await this.redisService.get(key);
          } else if (type === 'hash') {
            keyDetails[key] = await this.redisService.hgetall(key);
          } else if (type === 'set') {
            keyDetails[key] = await this.redisService.smembers(key);
          } else {
            keyDetails[key] = `[${type}]`;
          }
        } catch (err) {
          keyDetails[key] = `[erreur: ${err.message}]`;
        }
      }

      return {
        status: 'success',
        totalKeys: keys.length,
        keys: keyDetails,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erreur lors de la récupération des clés',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  @Post('cleanup')
  async cleanup() {
    try {
      const keys = await this.redisService['redis'].keys('test:*');
      if (keys.length > 0) {
        await this.redisService['redis'].del(...keys);
      }
      
      return {
        status: 'success',
        message: `${keys.length} clés de test supprimées`,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erreur lors du nettoyage',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
} 