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
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../prisma/prisma.service");
const base_gateway_1 = require("./base.gateway");
const redis_service_1 = require("../redis/redis.service");
let ChatGateway = ChatGateway_1 = class ChatGateway extends base_gateway_1.BaseGateway {
    prisma;
    redis;
    constructor(prisma, redis) {
        super(ChatGateway_1.name);
        this.prisma = prisma;
        this.redis = redis;
    }
    handleConnection(client) {
        const userId = client.data.userId;
        if (!userId) {
            this.logger.warn(`Connexion chat rejetée sans ID utilisateur: ${client.id}`);
            client.disconnect();
            return;
        }
        this.logger.log(`Client chat connecté: ${client.id} (${userId})`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client chat déconnecté: ${client.id}`);
    }
    handleJoinConversation(client, conversationId) {
        try {
            client.join(conversationId);
            this.logger.debug(`Client ${client.id} a rejoint la conversation ${conversationId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Erreur lors de la jonction à la conversation ${conversationId}:`, error);
            return { success: false, error: error.message };
        }
    }
    handleLeaveConversation(client, conversationId) {
        try {
            client.leave(conversationId);
            this.logger.debug(`Client ${client.id} a quitté la conversation ${conversationId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Erreur lors du départ de la conversation ${conversationId}:`, error);
            return { success: false, error: error.message };
        }
    }
    async handleSendMessage(client, data) {
        const { conversationId, content, userId } = data;
        this.logger.debug('handleSendMessage', data);
        if (userId !== client.data.userId) {
            return { success: false, error: 'Non autorisé' };
        }
        try {
            const conversation = await this.prisma.conversation.findUnique({
                where: { id: conversationId }
            });
            if (!conversation) {
                return { success: false, error: 'Conversation non trouvée' };
            }
            const message = await this.prisma.message.create({
                data: {
                    content,
                    sender: { connect: { id: userId } },
                    conversation: { connect: { id: conversationId } }
                },
                include: {
                    sender: {
                        select: { id: true, username: true, avatar: true }
                    }
                }
            });
            try {
                await this.redis.hset(`conversation:${conversationId}:messages`, message.id, JSON.stringify({
                    ...message,
                    conversationId,
                    createdAt: message.createdAt || new Date().toISOString()
                }));
            }
            catch (redisError) {
                this.logger.error(`Erreur Redis: ${redisError.message}`);
            }
            const messageToEmit = {
                ...message,
                conversationId,
                createdAt: message.createdAt || new Date().toISOString()
            };
            this.server.to(conversationId).emit('newMessage', messageToEmit);
            return { success: true, message: messageToEmit };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    handleIcebreakerReady(client, conversationId) {
        const userId = client.data.userId;
        this.server.to(conversationId).emit('icebreakerReady', {
            userId,
            conversationId,
            timestamp: new Date().toISOString()
        });
        return { success: true };
    }
    handleIcebreakerResponse(client, data) {
        const userId = client.data.userId;
        const { conversationId, response } = data;
        this.server.to(conversationId).emit('icebreakerResponse', {
            userId,
            conversationId,
            response,
            timestamp: new Date().toISOString()
        });
        return { success: true };
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveConversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('icebreakerReady'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleIcebreakerReady", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('icebreakerResponse'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleIcebreakerResponse", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.NODE_ENV === 'production'
                ? 'https://joots.app'
                : 'http://localhost:3000',
            credentials: true
        },
        namespace: 'chat'
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map