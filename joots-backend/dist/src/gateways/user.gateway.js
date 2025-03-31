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
const redis_1 = require("redis");
const redis_service_1 = require("../redis/redis.service");
const common_1 = require("@nestjs/common");
let UserGateway = UserGateway_1 = class UserGateway {
    prisma;
    redisService;
    server;
    redisClient = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
    connectedClients = new Map();
    userSockets = new Map();
    heartbeatIntervals = new Map();
    logger = new common_1.Logger(UserGateway_1.name);
    constructor(prisma, redisService) {
        this.prisma = prisma;
        this.redisService = redisService;
        this.redisClient.connect().catch(console.error);
        const cleanupInterval = parseInt(process.env.SOCKET_CLEANUP_INTERVAL || '30000');
        setInterval(() => this.checkActiveConnections(), cleanupInterval);
    }
    async checkActiveConnections() {
        try {
            const onlineUsers = await this.redisClient.sMembers('online_users');
            const currentConnectedUsers = Array.from(this.connectedClients.keys());
            const disconnectedUsers = onlineUsers.filter(user => !currentConnectedUsers.includes(user));
            for (const username of disconnectedUsers) {
                console.log(`[Cleanup] Utilisateur ${username} détecté comme déconnecté`);
                await this.redisClient.sRem('online_users', username);
                await this.prisma.user.update({
                    where: { username },
                    data: { isOnline: false },
                });
                this.server.emit('user_disconnected', username);
            }
            if (disconnectedUsers.length > 0) {
                const updatedUsers = await this.redisClient.sMembers('online_users');
                this.server.emit('users_list', updatedUsers);
            }
        }
        catch (error) {
            console.error('Erreur lors de la vérification des connexions:', error);
        }
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            if (!token) {
                client.disconnect();
                return;
            }
            const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            const userId = decoded.userId;
            if (!userId) {
                client.disconnect();
                return;
            }
            client.data.userId = userId;
            await this.redisService.set(`user:${userId}:socket`, client.id);
            this.logger.log(`Client ${client.id} connected as user ${userId}`);
            this.connectedClients.set(client.id, client);
            this.userSockets.set(userId, client.id);
            await this.redisService.sadd('online_users', userId);
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: true }
            });
            this.startHeartbeat(client.id);
            this.server.emit('userStatusChange', { userId, isOnline: true });
        }
        catch (error) {
            this.logger.error(`Connection error for client ${client.id}:`, error);
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        try {
            const userId = client.data.userId;
            if (!userId)
                return;
            await this.redisService.srem('online_users', userId);
            await this.redisService.del(`user:${userId}:socket`);
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: false }
            });
            this.connectedClients.delete(client.id);
            this.userSockets.delete(userId);
            this.server.emit('userStatusChange', { userId, isOnline: false });
        }
        catch (error) {
            this.logger.error(`Disconnection error for client ${client.id}:`, error);
        }
    }
    handleHeartbeat(client) {
        client.emit('heartbeat');
    }
    startHeartbeat(clientId) {
        const interval = setInterval(() => {
            const client = this.connectedClients.get(clientId);
            if (client?.connected) {
                client.emit('heartbeat');
            }
            else {
                this.stopHeartbeat(clientId);
            }
        }, 30000);
        this.heartbeatIntervals.set(clientId, interval);
    }
    stopHeartbeat(clientId) {
        const interval = this.heartbeatIntervals.get(clientId);
        if (interval) {
            clearInterval(interval);
            this.heartbeatIntervals.delete(clientId);
        }
    }
    async broadcastUsersList() {
        const users = await this.redisClient.sMembers('online_users');
        this.server.emit('users_list', users);
    }
    async handleSetUsername(username, client) {
        client.data.username = username;
        await this.broadcastUsersList();
    }
    emitNewConversation(conversation, userId, receiverId) {
        this.server.to([userId, receiverId]).emit('newConversation', conversation);
    }
};
exports.UserGateway = UserGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('heartbeat'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], UserGateway.prototype, "handleHeartbeat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('setUsername'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handleSetUsername", null);
exports.UserGateway = UserGateway = UserGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? 'https://joots.app'
                : 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ['authorization', 'content-type']
        },
        namespace: 'users',
        transports: ['websocket', 'polling'],
        pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT || '60000'),
        pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL || '25000'),
        connectTimeout: 10000
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map