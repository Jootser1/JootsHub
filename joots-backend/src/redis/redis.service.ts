import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    });
  }

  async sadd(key: string, ...members: string[]) {
    return this.redis.sadd(key, ...members);
  }

  async srem(key: string, ...members: string[]) {
    return this.redis.srem(key, ...members);
  }

  async smembers(key: string) {
    return this.redis.smembers(key);
  }

  async sismember(key: string, member: string) {
    return this.redis.sismember(key, member);
  }

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      return this.redis.set(key, value, 'EX', ttl);
    }
    return this.redis.set(key, value);
  }

  async del(key: string) {
    return this.redis.del(key);
  }

  async hset(key: string, field: string, value: string) {
    return this.redis.hset(key, field, value);
  }

  async hgetall(key: string): Promise<{ [key: string]: string }> {
    return this.redis.hgetall(key);
  }

  // Nouvelles méthodes pour la gestion du statut utilisateur
  async setUserOnline(userId: string, ttl: number = 300) {
    const batch = this.redis.multi();

    // 1. Mise à jour du statut en ligne
    const userStatusKey = `user:status:${userId}`;
    batch.set(userStatusKey, 'online', 'EX', ttl);

    // 2. Mise à jour de la dernière activité
    const lastActivityKey = `user:${userId}:last_activity`;
    batch.set(lastActivityKey, Date.now().toString());

    // 3. Ajout à l'ensemble des utilisateurs en ligne
    batch.sadd('online_users', userId);

    // Exécution atomique
    await batch.exec();

    return true;
  }

  async setUserOffline(userId: string) {
    const batch = this.redis.multi();

    // 1. Suppression du statut
    const userStatusKey = `user:status:${userId}`;
    batch.del(userStatusKey);

    // 2. Mise à jour de la dernière activité
    const lastActivityKey = `user:${userId}:last_activity`;
    batch.set(lastActivityKey, Date.now().toString());

    // 3. Retrait de l'ensemble des utilisateurs en ligne
    batch.srem('online_users', userId);

    // Exécution atomique
    await batch.exec();

    return true;
  }

  async getUserStatus(userId: string): Promise<'online' | 'offline'> {
    const userStatusKey = `user:status:${userId}`;
    const status = await this.get(userStatusKey);
    return status === 'online' ? 'online' : 'offline';
  }

  async refreshUserStatus(userId: string, ttl: number = 300) {
    // Rafraîchir le TTL de la clé de statut
    const userStatusKey = `user:status:${userId}`;
    await this.set(userStatusKey, 'online', ttl);

    // Mettre à jour le timestamp de dernière activité
    const lastActivityKey = `user:${userId}:last_activity`;
    await this.set(lastActivityKey, Date.now().toString());

    return true;
  }
}
