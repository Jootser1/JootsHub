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
exports.HeartbeatService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../redis/redis.service");
let HeartbeatService = class HeartbeatService {
    redisService;
    heartbeatIntervals = new Map();
    logger = new common_1.Logger('HeartbeatService');
    constructor(redisService) {
        this.redisService = redisService;
    }
    getUserInfo(client) {
        const userId = client.data?.userId || 'unknown';
        const username = client.data?.username || 'unknown';
        return `[User: ${username} (${userId})]`;
    }
    startHeartbeat(client, options = {}) {
        const interval = options.interval || 25000;
        const timeout = options.timeout || 60000;
        const userInfo = this.getUserInfo(client);
        const pingInterval = setInterval(() => {
            if (client.connected) {
                client.emit('ping');
                this.logger.debug(`Ping sent to client ${client.id} ${userInfo}`);
            }
        }, interval);
        const timeoutId = setTimeout(() => {
            if (client.connected) {
                this.logger.warn(`Client ${client.id} ${userInfo} timeout, disconnecting...`);
                client.disconnect();
            }
        }, timeout);
        this.heartbeatIntervals.set(client.id, {
            pingInterval,
            timeoutId
        });
        this.logger.log(`Heartbeat started for client ${client.id} ${userInfo}`);
    }
    stopHeartbeat(client) {
        const intervals = this.heartbeatIntervals.get(client.id);
        const userInfo = this.getUserInfo(client);
        if (intervals) {
            clearInterval(intervals.pingInterval);
            clearTimeout(intervals.timeoutId);
            this.heartbeatIntervals.delete(client.id);
            this.logger.log(`Heartbeat stopped for client ${client.id} ${userInfo}`);
        }
    }
    resetHeartbeatTimeout(client) {
        const intervals = this.heartbeatIntervals.get(client.id);
        const userInfo = this.getUserInfo(client);
        if (intervals) {
            clearTimeout(intervals.timeoutId);
            intervals.timeoutId = setTimeout(() => {
                if (client.connected) {
                    this.logger.warn(`Client ${client.id} ${userInfo} timeout, disconnecting...`);
                    client.disconnect();
                }
            }, 60000);
            this.logger.debug(`Heartbeat timeout reset for client ${client.id} ${userInfo}`);
        }
    }
    async handlePong(client) {
        this.resetHeartbeatTimeout(client);
        const userInfo = this.getUserInfo(client);
        this.logger.debug(`Pong received from client ${client.id} ${userInfo}`);
        const userId = client.data?.userId;
        if (userId) {
            try {
                await this.redisService.refreshUserStatus(userId);
                this.logger.debug(`Status TTL refreshed for user ${userId}`);
            }
            catch (error) {
                this.logger.error(`Error refreshing user status TTL: ${error.message}`);
            }
        }
    }
    cleanupAllHeartbeats() {
        for (const [clientId, intervals] of this.heartbeatIntervals.entries()) {
            clearInterval(intervals.pingInterval);
            clearTimeout(intervals.timeoutId);
            this.heartbeatIntervals.delete(clientId);
            this.logger.log(`Cleaned up heartbeat for client ${clientId}`);
        }
    }
};
exports.HeartbeatService = HeartbeatService;
exports.HeartbeatService = HeartbeatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], HeartbeatService);
//# sourceMappingURL=heartbeat.service.js.map