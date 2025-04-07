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
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const base_gateway_1 = require("./base.gateway");
const contacts_service_1 = require("../users/contacts/contacts.service");
let UserGateway = UserGateway_1 = class UserGateway extends base_gateway_1.BaseGateway {
    prisma;
    redis;
    userContactsService;
    connectedUsers = new Map();
    constructor(prisma, redis, userContactsService) {
        super(UserGateway_1.name);
        this.prisma = prisma;
        this.redis = redis;
        this.userContactsService = userContactsService;
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
            await this.notifyContactsStatusChange(userId, true);
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
    async notifyContactsStatusChange(userId, isOnline) {
        try {
            const contactOf = await this.prisma.userContact.findMany({
                where: { contactId: userId },
                select: { userId: true }
            });
            contactOf.forEach(({ userId: contactUserId }) => {
                const socketIds = this.connectedUsers.get(contactUserId);
                if (socketIds && socketIds.size > 0) {
                    socketIds.forEach(socketId => {
                        const socket = this.server.sockets.sockets.get(socketId);
                        if (socket) {
                            socket.emit('userStatusChange', {
                                userId,
                                isOnline,
                                timestamp: new Date().toISOString()
                            });
                        }
                    });
                }
            });
            this.logger.debug(`Notification de changement de statut envoyée aux contacts de ${userId}`);
        }
        catch (error) {
            this.logger.error(`Erreur lors de la notification des contacts: ${error.message}`);
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
        redis_service_1.RedisService,
        contacts_service_1.UserContactsService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map