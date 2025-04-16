"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    redis;
    constructor() {
        this.redis = new ioredis_1.default({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
        });
    }
    async sadd(key, ...members) {
        return this.redis.sadd(key, ...members);
    }
    async srem(key, ...members) {
        return this.redis.srem(key, ...members);
    }
    async smembers(key) {
        return this.redis.smembers(key);
    }
    async sismember(key, member) {
        return this.redis.sismember(key, member);
    }
    async get(key) {
        return this.redis.get(key);
    }
    async set(key, value, ttl) {
        if (ttl) {
            return this.redis.set(key, value, 'EX', ttl);
        }
        return this.redis.set(key, value);
    }
    async del(key) {
        return this.redis.del(key);
    }
    async hset(key, field, value) {
        return this.redis.hset(key, field, value);
    }
    async setUserOnline(userId, ttl = 300) {
        const batch = this.redis.multi();
        const userStatusKey = `user:status:${userId}`;
        batch.set(userStatusKey, 'online', 'EX', ttl);
        const lastActivityKey = `user:${userId}:last_activity`;
        batch.set(lastActivityKey, Date.now().toString());
        batch.sadd('online_users', userId);
        await batch.exec();
        return true;
    }
    async setUserOffline(userId) {
        const batch = this.redis.multi();
        const userStatusKey = `user:status:${userId}`;
        batch.del(userStatusKey);
        const lastActivityKey = `user:${userId}:last_activity`;
        batch.set(lastActivityKey, Date.now().toString());
        batch.srem('online_users', userId);
        await batch.exec();
        return true;
    }
    async getUserStatus(userId) {
        const userStatusKey = `user:status:${userId}`;
        const status = await this.get(userStatusKey);
        return status === 'online' ? 'online' : 'offline';
    }
    async refreshUserStatus(userId, ttl = 300) {
        const userStatusKey = `user:status:${userId}`;
        await this.set(userStatusKey, 'online', ttl);
        const lastActivityKey = `user:${userId}:last_activity`;
        await this.set(lastActivityKey, Date.now().toString());
        return true;
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RedisService);
//# sourceMappingURL=redis.service.js.map