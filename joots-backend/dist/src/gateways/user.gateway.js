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
const heartbeat_service_1 = require("./services/heartbeat.service");
let UserGateway = UserGateway_1 = class UserGateway {
    prisma;
    redisService;
    heartbeatService;
    server;
    redisClient = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
    connectedClients = new Map();
    userSockets = new Map();
    logger = new common_1.Logger(UserGateway_1.name);
    constructor(prisma, redisService, heartbeatService) {
        this.prisma = prisma;
        this.redisService = redisService;
        this.heartbeatService = heartbeatService;
        this.redisClient.connect().catch(console.error);
        const cleanupInterval = parseInt(process.env.SOCKET_CLEANUP_INTERVAL || '30000');
        setInterval(() => this.checkActiveConnections(), cleanupInterval);
    }
    async checkActiveConnections() {
        try {
            const onlineUsers = await this.redisClient.sMembers('online_users');
            const currentConnectedUsers = Array.from(this.connectedClients.keys());
            const disconnectedUsers = onlineUsers.filter(userId => !currentConnectedUsers.includes(userId));
            for (const userId of disconnectedUsers) {
                await this.redisClient.sRem('online_users', userId);
                try {
                    await this.prisma.user.update({
                        where: { id: userId },
                        data: { isOnline: false }
                    });
                }
                catch (error) {
                    if (error.code === 'P2025') {
                        this.logger.warn(`Utilisateur ${userId} non trouvé dans la base de données`);
                    }
                    else {
                        throw error;
                    }
                }
            }
            if (disconnectedUsers.length > 0) {
                const updatedUsers = await this.redisClient.sMembers('online_users');
                this.server.emit('users_list', updatedUsers);
            }
        }
        catch (error) {
            this.logger.error('Erreur lors de la vérification des connexions:', error);
        }
    }
    getUserInfo(client) {
        const userId = client.data?.userId || 'unknown';
        const username = client.data?.username || 'unknown';
        return `[User: ${username} (${userId})]`;
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token;
            if (!token) {
                this.logger.warn(`Tentative de connexion sans token - client ${client.id}`);
                client.disconnect();
                return;
            }
            try {
                const tokenParts = token.split('.');
                if (tokenParts.length !== 3) {
                    this.logger.error(`Format de token invalide - nombre de parties: ${tokenParts.length}`);
                    client.disconnect();
                    return;
                }
                const base64Payload = tokenParts[1];
                const decodedString = Buffer.from(base64Payload, 'base64').toString();
                const decoded = JSON.parse(decodedString);
                if (!decoded.sub) {
                    this.logger.error('Token invalide: champ "sub" manquant');
                    client.disconnect();
                    return;
                }
                const userId = decoded.sub;
                const username = decoded.username;
                const now = Math.floor(Date.now() / 1000);
                if (decoded.exp && decoded.exp < now) {
                    this.logger.warn('Token expiré');
                    client.disconnect();
                    return;
                }
                const existingSocketId = this.userSockets.get(userId);
                if (existingSocketId) {
                    const existingSocket = this.connectedClients.get(existingSocketId);
                    if (existingSocket?.connected) {
                        this.logger.warn(`Utilisateur ${username} (${userId}) déjà connecté, déconnexion de l'ancienne session`);
                        existingSocket.disconnect();
                    }
                }
                client.data.userId = userId;
                if (username) {
                    client.data.username = username;
                }
                await this.redisService.set(`user:${userId}:socket`, client.id);
                this.logger.log(`Client ${client.id} ${this.getUserInfo(client)} connecté`);
                this.connectedClients.set(client.id, client);
                this.userSockets.set(userId, client.id);
                await this.redisService.sadd('online_users', userId);
                this.heartbeatService.startHeartbeat(client);
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    select: { username: true, avatar: true }
                });
                this.server.emit('userStatusChange', {
                    userId,
                    isOnline: true,
                    timestamp: new Date().toISOString(),
                    username: user?.username,
                    avatar: user?.avatar,
                    eventType: 'connection'
                });
                client.emit('connectionSuccess', {
                    message: 'Connexion réussie',
                    userId,
                    socketId: client.id
                });
            }
            catch (error) {
                this.logger.error(`Erreur de connexion pour le client ${client.id}:`, error);
                client.emit('connectionError', {
                    message: 'Erreur lors de la connexion',
                    details: error.message
                });
                client.disconnect();
            }
        }
        catch (error) {
            this.logger.error(`Erreur de connexion pour le client ${client.id}:`, error);
            client.emit('connectionError', {
                message: 'Erreur lors de la connexion',
                details: error.message
            });
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        try {
            const userId = client.data?.userId;
            const userInfo = this.getUserInfo(client);
            this.logger.warn(`Déconnexion du client ${client.id} ${userInfo}`);
            if (!userId) {
                this.logger.warn(`Déconnexion d'un client non identifié: ${client.id}`);
                return;
            }
            const currentSocketId = this.userSockets.get(userId);
            if (currentSocketId !== client.id) {
                this.logger.debug(`Socket ${client.id} n'est pas le dernier socket actif pour l'utilisateur ${userId}`);
                return;
            }
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { username: true, avatar: true }
            });
            await this.redisService.srem('online_users', userId);
            await this.redisService.del(`user:${userId}:socket`);
            this.connectedClients.delete(client.id);
            this.userSockets.delete(userId);
            const disconnectEvent = {
                userId,
                isOnline: false,
                timestamp: new Date().toISOString(),
                username: user?.username,
                avatar: user?.avatar,
                eventType: 'disconnection',
                reason: client.disconnected ? 'client_disconnected' : 'unknown'
            };
            this.logger.debug('Émission de l\'événement de déconnexion:', disconnectEvent.username);
            this.server.emit('userStatusChange', disconnectEvent);
            this.heartbeatService.stopHeartbeat(client);
        }
        catch (error) {
            this.logger.error(`Erreur lors de la déconnexion du client ${client.id}:`, error);
            this.server.emit('userStatusChange', {
                userId: client.data?.userId,
                isOnline: false,
                timestamp: new Date().toISOString(),
                eventType: 'disconnection',
                error: true
            });
        }
    }
    handlePong(client) {
        this.heartbeatService.handlePong(client);
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
    (0, websockets_1.SubscribeMessage)('pong'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], UserGateway.prototype, "handlePong", null);
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
        redis_service_1.RedisService,
        heartbeat_service_1.HeartbeatService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map