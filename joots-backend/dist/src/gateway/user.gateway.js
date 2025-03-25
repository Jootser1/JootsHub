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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_1 = require("redis");
const jwt = require("jsonwebtoken");
let UserGateway = class UserGateway {
    prisma;
    server;
    redisClient = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
    constructor(prisma) {
        this.prisma = prisma;
        this.redisClient.connect().catch(console.error);
    }
    async handleConnection(client) {
        try {
            const { token } = client.handshake.auth;
            if (!token)
                throw new Error("Token manquant");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.username;
            await this.redisClient.sAdd('online_users', username);
            await this.prisma.user.update({
                where: { username },
                data: { isOnline: true },
            });
            this.server.emit('user_connected', username);
            const users = await this.redisClient.sMembers('online_users');
            client.emit('users_list', users);
        }
        catch (error) {
            console.error('Erreur de connexion:', error);
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        try {
            const { token } = client.handshake.auth;
            if (!token)
                return;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.username;
            await this.redisClient.sRem('online_users', username);
            await this.prisma.user.update({
                where: { username },
                data: { isOnline: false },
            });
            this.server.emit('user_disconnected', username);
        }
        catch (error) {
            console.error('Erreur de déconnexion:', error);
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
};
exports.UserGateway = UserGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], UserGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('setUsername'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], UserGateway.prototype, "handleSetUsername", null);
exports.UserGateway = UserGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ['authorization', 'content-type']
        },
        namespace: 'users',
        transports: ['websocket', 'polling']
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map