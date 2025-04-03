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
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const heartbeat_service_1 = require("./services/heartbeat.service");
const common_1 = require("@nestjs/common");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    prisma;
    redis;
    heartbeatService;
    server;
    logger = new common_1.Logger(ChatGateway_1.name);
    heartbeatIntervals = new Map();
    constructor(prisma, redis, heartbeatService) {
        this.prisma = prisma;
        this.redis = redis;
        this.heartbeatService = heartbeatService;
    }
    async handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        this.heartbeatService.startHeartbeat(client);
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.heartbeatService.stopHeartbeat(client);
    }
    async handleJoinConversation(client, conversationId) {
        client.join(conversationId);
        return { event: 'joinedConversation', data: conversationId };
    }
    async handleLeaveConversation(client, conversationId) {
        client.leave(conversationId);
        return { event: 'leftConversation', data: conversationId };
    }
    async handleMessage(client, payload) {
        const { conversationId, content, userId } = payload;
        const message = await this.prisma.message.create({
            data: {
                content,
                sender: {
                    connect: {
                        id: userId
                    }
                },
                conversation: {
                    connect: {
                        id: conversationId
                    }
                }
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
        });
        this.server.to(conversationId).emit('newMessage', message);
        return message;
    }
    handlePong(client) {
        this.heartbeatService.handlePong(client);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveConversation'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('pong'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handlePong", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? 'https://joots.app'
                : 'http://localhost:3000',
            methods: ['GET', 'POST'],
            credentials: true,
            allowedHeaders: ['authorization', 'content-type']
        },
        namespace: 'chat',
        transports: ['websocket', 'polling'],
        pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT || '60000'),
        pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL || '25000'),
        connectTimeout: 10000
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        heartbeat_service_1.HeartbeatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map