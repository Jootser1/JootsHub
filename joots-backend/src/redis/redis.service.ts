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

  // Nouvelles méthodes pour la gestion du statut utilisateur
  async setUserOnline(userId: string, ttl: number = 300) {
    // Ajouter l'utilisateur à l'ensemble des utilisateurs en ligne
    await this.sadd('online_users', userId);
    
    // Définir une clé utilisateur avec TTL pour détecter les déconnexions
    const userStatusKey = `user:${userId}:status`;
    await this.set(userStatusKey, 'online', ttl);
    
    // Ajouter un timestamp pour la dernière activité
    const lastActivityKey = `user:${userId}:last_activity`;
    await this.set(lastActivityKey, Date.now().toString());
    
    return true;
  }
  
  async setUserOffline(userId: string) {
    // Retirer l'utilisateur de l'ensemble des utilisateurs en ligne
    await this.srem('online_users', userId);
    
    // Supprimer la clé de statut
    const userStatusKey = `user:${userId}:status`;
    await this.del(userStatusKey);
    
    return true;
  }
  
  async refreshUserStatus(userId: string, ttl: number = 300) {
    // Rafraîchir le TTL de la clé de statut
    const userStatusKey = `user:${userId}:status`;
    await this.set(userStatusKey, 'online', ttl);
    
    // Mettre à jour le timestamp de dernière activité
    const lastActivityKey = `user:${userId}:last_activity`;
    await this.set(lastActivityKey, Date.now().toString());
    
    return true;
  }
  
  async getUserLastActivity(userId: string) {
    const lastActivityKey = `user:${userId}:last_activity`;
    const timestamp = await this.get(lastActivityKey);
    return timestamp ? parseInt(timestamp) : null;
  }
}