import Redis from 'ioredis';

export class RedisCleanerService {
  private redis: Redis;

  constructor(redisUrl: string) {
    this.redis = new Redis(redisUrl);
  }

  async cleanIcebreaker() {
    const keys = await this.redis.keys('icebreaker:*');
    if (keys.length > 0) {
      await this.redis.del(...keys);
      console.log(`[RedisCleanerService] Deleted ${keys.length} icebreaker keys`);
    } else {
      console.log('[RedisCleanerService] No icebreaker keys to delete');
    }
  }

  async cleanConversation() {
    const keys = await this.redis.keys('conversation:*');
    if (keys.length > 0) {
      await this.redis.del(...keys);
      console.log(`[RedisCleanerService] Deleted ${keys.length} conversation keys`);
    } else {
      console.log('[RedisCleanerService] No conversation keys to delete');
    }
  }

  async cleanUsers() {
    const userKeys = await this.redis.keys('user:*');
    if (userKeys.length > 0) {
      await this.redis.del(...userKeys);
      console.log(`[RedisCleanerService] Deleted ${userKeys.length} user keys`);
    } else {
      console.log('[RedisCleanerService] No user keys to delete');
    }

    // Clean online_users Set
    const exists = await this.redis.exists('online_users');
    if (exists) {
      await this.redis.del('online_users');
      console.log('[RedisCleanerService] Deleted online_users key');
    }
  }

  async cleanAll() {
    await this.cleanUsers();
    await this.cleanIcebreaker();
    await this.cleanConversation();
  }

  async close() {
    await this.redis.quit();
  }
}
