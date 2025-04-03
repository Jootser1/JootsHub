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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let UserGateway = UserGateway_1 = class UserGateway {
    prisma;
    redis;
    server;
    logger = new common_1.Logger(UserGateway_1.name);
    connectedUsers = new Map();
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    afterInit(server) {
        server.use(async (socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                const userId = socket.handshake.auth.userId;
                if (!token || !userId) {
                    return next(new Error('Authentification requise'));
                }
                const validUserId = this.extractUserIdFromToken(token);
                if (!validUserId || validUserId !== userId) {
                    return next(new Error('Token invalide'));
                }
                socket.data.userId = userId;
                next();
            }
            catch (error) {
                next(new Error('Erreur d\'authentification'));
            }
        });
    }
    extractUserIdFromToken(token) {
        try {
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3)
                return null;
            const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
            return payload.sub;
        }
        catch (error) {
            return null;
        }
    }
    async handleConnection(client) {
        const userId = client.data.userId;
        if (!userId) {
            this.logger.warn(`Connexion rejetée sans ID utilisateur: ${client.id}`);
            client.disconnect();
            return;
        }
        if (!this.connectedUsers.has(userId)) {
            this.connectedUsers.set(userId, new Set());
        }
        this.connectedUsers.get(userId)?.add(client.id);
        await this.redis.sadd('online_users', userId);
        await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
        try {
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: true }
            });
            this.server.emit('userStatusChange', {
                userId,
                isOnline: true,
                timestamp: new Date().toISOString()
            });
            this.logger.log(`Utilisateur connecté: ${userId} (socket: ${client.id})`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
        }
    }
    async handleDisconnect(client) {
        const userId = client.data.userId;
        if (!userId) {
            this.logger.warn(`Déconnexion d'un client non identifié: ${client.id}`);
            return;
        }
        this.connectedUsers.get(userId)?.delete(client.id);
        if (this.connectedUsers.get(userId)?.size === 0) {
            this.connectedUsers.delete(userId);
            await this.redis.srem('online_users', userId);
            await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
            try {
                await this.prisma.user.update({
                    where: { id: userId },
                    data: { isOnline: false }
                });
                this.server.emit('userStatusChange', {
                    userId,
                    isOnline: false,
                    timestamp: new Date().toISOString()
                });
                this.logger.log(`Utilisateur déconnecté: ${userId}`);
            }
            catch (error) {
                this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
            }
        }
        else {
            this.logger.debug(`Socket ${client.id} déconnecté, mais l'utilisateur ${userId} a encore d'autres connexions actives`);
        }
    }
    async handleUpdateUserStatus(client, data) {
        const userId = client.data.userId;
        if (!userId) {
            return { success: false, error: 'Non authentifié' };
        }
        const isOnline = data.isOnline;
        try {
            if (isOnline) {
                await this.redis.sadd('online_users', userId);
            }
            else {
                await this.redis.srem('online_users', userId);
            }
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline }
            });
            this.server.emit('userStatusChange', {
                userId,
                isOnline,
                timestamp: new Date().toISOString()
            });
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    handlePong(client) {
        const userId = client.data.userId;
        if (userId) {
            this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
        }
    }
};
exports.UserGateway = UserGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('updateUserStatus'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handleUpdateUserStatus", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('pong'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], UserGateway.prototype, "handlePong", null);
exports.UserGateway = UserGateway = UserGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? 'https://joots.app'
                : 'http://localhost:3000',
            credentials: true
        },
        namespace: 'users'
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map