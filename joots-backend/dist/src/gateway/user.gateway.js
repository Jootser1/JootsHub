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
let UserGateway = class UserGateway {
    prisma;
    server;
    redisClient = (0, redis_1.createClient)({ url: 'redis://localhost:6379' });
    constructor(prisma) {
        this.prisma = prisma;
        this.redisClient.connect().catch(console.error);
    }
    async handleConnection(client) {
        console.log(`Client connecté: ${client.id}`);
        const userId = client.handshake.query.userId;
        if (userId) {
            await this.redisClient.sAdd('onlineUsers', userId);
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: true },
            });
            await this.broadcastUsers();
        }
    }
    async handleDisconnect(client) {
        console.log(`Client déconnecté: ${client.id}`);
        const userId = client.handshake.query.userId;
        if (userId) {
            await this.redisClient.sRem('onlineUsers', userId);
            await this.prisma.user.update({
                where: { id: userId },
                data: { isOnline: false },
            });
            await this.broadcastUsers();
        }
    }
    async broadcastUsers() {
        const users = await this.redisClient.sMembers('onlineUsers');
        this.server.emit('activeUsers', users);
    }
    async handleSetUsername(username, client) {
        client.data.username = username;
        await this.broadcastUsers();
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
    (0, websockets_1.WebSocketGateway)(4001, { cors: { origin: '*' } }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserGateway);
//# sourceMappingURL=user.gateway.js.map