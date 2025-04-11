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
var UserGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const base_gateway_1 = require("./base.gateway");
let UserGateway = UserGateway_1 = class UserGateway extends base_gateway_1.BaseGateway {
    prisma;
    redis;
    constructor(prisma, redis) {
        super(UserGateway_1.name);
        this.prisma = prisma;
        this.redis = redis;
    }
    async handleConnection(client) {
        const userId = client.data.userId;
        console.log('token', client.handshake.auth.token);
        if (!userId) {
            this.logger.warn(`Connexion rejetée sans ID utilisateur: ${client.id}`);
            client.disconnect();
            return;
        }
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: true }
            });
            await this.redis.sadd('online_users', userId);
            await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
            this.logger.log(`Utilisateur connecté: ${userId}`);
            await this.notifyContactsStatusChange(userId, true);
        }
        catch (error) {
            this.logger.error(`Erreur lors de la connexion: ${error.message}`);
        }
    }
    async handleDisconnect(client) {
        const userId = client.data.userId;
        if (!userId)
            return;
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: false }
            });
            await this.redis.srem('online_users', userId);
            await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
            await this.notifyContactsStatusChange(userId, false);
            this.logger.log(`Utilisateur déconnecté: ${userId}`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de la déconnexion: ${error.message}`);
        }
    }
    async notifyContactsStatusChange(userId, isOnline) {
        try {
            const contacts = await this.prisma.userContact.findMany({
                where: { contactId: userId },
                select: { userId: true }
            });
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { username: true }
            });
            this.server.to(`user-status-${userId}`).emit('userStatusChange', {
                userId,
                username: user?.username,
                isOnline,
                timestamp: new Date().toISOString()
            });
            this.logger.debug(`Statut ${isOnline ? 'en ligne' : 'hors ligne'} notifié aux contacts de ${user?.username || userId}`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de la notification des contacts: ${error.message}`);
        }
    }
    async handleJoinContactsRooms(client, payload) {
        const { contactIds } = payload;
        contactIds.forEach(contactId => {
            client.join(`user-status-${contactId}`);
        });
    }
    async handleLeaveContactsRooms(client, payload) {
        const { contactIds } = payload;
        contactIds.forEach(contactId => {
            client.leave(`user-status-${contactId}`);
        });
    }
    async handlePong(client) {
        const userId = client.data.userId;
        if (userId) {
            await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
        }
    }
};
exports.UserGateway = UserGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('joinContactsRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handleJoinContactsRooms", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveContactsRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handleLeaveContactsRooms", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('pong'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handlePong", null);
exports.UserGateway = UserGateway = UserGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? 'https://joots.app'
                : 'http://localhost:3000',
            credentials: true
        },
        namespace: 'user'
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map