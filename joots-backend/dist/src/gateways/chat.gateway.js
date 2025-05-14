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
const question_service_1 = require("../questions/question.service");
const icebreaker_service_1 = require("../icebreakers/icebreaker.service");
let ChatGateway = ChatGateway_1 = class ChatGateway extends base_gateway_1.BaseGateway {
    prisma;
    redis;
    questionService;
    icebreakerService;
    constructor(prisma, redis, questionService, icebreakerService) {
        super(ChatGateway_1.name);
        this.prisma = prisma;
        this.redis = redis;
        this.questionService = questionService;
        this.icebreakerService = icebreakerService;
    }
    handleConnection(client) {
        const userId = client.data.userId;
        if (!userId) {
            this.logger.warn(`[Chat Socket ${client.id}] Connexion chat rejetée sans ID utilisateur`);
            client.disconnect();
            return;
        }
        this.logger.log(`[Chat Socket ${client.id}] ${userId} : Connexion chat réussie`);
        this.joinUserConversations(client, userId).catch(error => {
            this.logger.error(`[Chat Socket ${client.id}] Erreur lors de la jointure des conversations: ${error.message}`);
        });
    }
    handleDisconnect(client) {
        this.logger.log(`[Chat Socket ${client.id}] ${client.data.userId} : Déconnexion chat réussie`);
    }
    handleJoinConversation(client, data) {
        try {
            client.join(data.conversationId);
            this.logger.debug(`[Chat Socket ${client.id}] ${data.userId} : a rejoint la conversation ${data.conversationId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`[Chat Socket ${client.id}] ${data.userId} : Erreur lors de la jonction à la conversation ${data.conversationId}:`, error);
            return { success: false, error: error.message };
        }
    }
    handleLeaveConversation(client, data) {
        try {
            client.leave(data.conversationId);
            this.logger.debug(`[Chat Socket ${client.id}] ${data.userId} : a quitté la conversation ${data.conversationId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`[Chat Socket ${client.id}] ${data.userId} : Erreur lors du départ de la conversation ${data.conversationId}:`, error);
            return { success: false, error: error.message };
        }
    }
    async handleSendMessage(client, data) {
        const { conversationId, content, userId } = data;
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
            client.join(conversationId);
            this.server.to(conversationId).emit('newMessage', messageToEmit);
            return { success: true, message: messageToEmit };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    handleTyping(client, data) {
        const { conversationId, userId, isTyping } = data;
        if (userId !== client.data.userId) {
            return { success: false, error: 'Non autorisé' };
        }
        try {
            client.to(conversationId).emit('typing', {
                conversationId,
                userId,
                isTyping,
                timestamp: new Date().toISOString()
            });
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du statut de frappe: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleIcebreakerReady(client, data) {
        const { conversationId, userId, isIcebreakerReady } = data;
        console.log("icebreakerReady", userId, conversationId, isIcebreakerReady);
        if (userId !== client.data.userId) {
            return { success: false, error: 'Non autorisé' };
        }
        try {
            await this.icebreakerService.setParticipantIcebreakerReady(conversationId, userId, isIcebreakerReady);
            client.join(conversationId);
            this.emitIcebreakerStatusUpdate(conversationId, userId, isIcebreakerReady);
            const allReady = await this.icebreakerService.areAllParticipantsReady(conversationId);
            if (allReady) {
                await this.triggerIcebreakerQuestion(conversationId, client);
            }
            return { success: true, userId: userId, isIcebreakerReady: isIcebreakerReady };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    emitIcebreakerStatusUpdate(conversationId, userId, isReady) {
        this.server.to(conversationId).emit('icebreakerStatusUpdated', {
            userId,
            conversationId,
            isIcebreakerReady: isReady,
            timestamp: new Date().toISOString()
        });
        this.logger.log(`Status updated for user ${userId} in conversation ${conversationId}: ready=${isReady}`);
    }
    async triggerIcebreakerQuestion(conversationId, client) {
        const participants = await this.prisma.conversationParticipant.findMany({
            where: { conversationId },
            select: { userId: true }
        });
        if (participants.length < 2) {
            this.logger.warn(`Conversation ${conversationId} does not have 2 participants.`);
            return;
        }
        const [a, b] = participants;
        const questionGroup = await this.questionService.getNextRandomQuestionGroup(a.userId, b.userId);
        console.log('questionGroup', typeof questionGroup);
        console.log('chatGateway', questionGroup?.id, questionGroup?.questions[0].question);
        if (!questionGroup)
            return;
        await this.icebreakerService.storeCurrentQuestionGroupForAGivenConversation(conversationId, questionGroup);
        client.join(conversationId);
        this.server.to(conversationId).emit('icebreakerQuestionGroup', {
            questionGroup,
            conversationId,
            timestamp: new Date().toISOString()
        });
        this.logger.log(`Question envoyée à ${conversationId} : ${questionGroup.questions[0].question}`);
    }
    async emitIcebreakerResponsesToAllParticipants(conversationId, questionGroupId, userId1, optionId1, userId2, optionId2) {
        console.log('emitIcebreakerResponsesToAllParticipants', conversationId, questionGroupId, userId1, optionId1, userId2, optionId2);
        const socketData = {
            conversationId,
            questionGroupId,
            userId1,
            optionId1,
            userId2,
            optionId2,
            answeredAt: new Date().toISOString()
        };
        this.server.to(conversationId).emit('icebreakerResponses', socketData);
        this.logger.log(`Responses for User ${userId1} : ${optionId1} and for ${userId2} : ${optionId2} in conversation ${conversationId}`);
    }
    async joinUserConversations(client, userId) {
        try {
            const conversations = await this.prisma.conversationParticipant.findMany({
                where: { userId },
                select: {
                    conversationId: true,
                    conversation: {
                        include: {
                            participants: true
                        }
                    }
                }
            });
            this.logger.log(`[Chat Socket ${client.id}] ${userId} devrait rejoindre ${conversations.length} conversations`);
            for (const convo of conversations) {
                const conversationId = convo.conversationId;
                client.join(conversationId);
                await this.synchronizeConversationState(client, conversationId, userId, convo.conversation.participants);
            }
        }
        catch (error) {
            this.logger.error(`Erreur lors de la récupération des conversations: ${error.message}`);
            throw error;
        }
    }
    async synchronizeConversationState(client, conversationId, userId, participants) {
        try {
            const questionGroupKey = `conversation:${conversationId}:icebreaker:questionGroup`;
            const questionGroup = await this.redis.get(questionGroupKey);
            if (questionGroup) {
                client.emit('icebreakerQuestionGroup', {
                    questionGroup: JSON.parse(questionGroup),
                    conversationId,
                    timestamp: new Date().toISOString()
                });
            }
            for (const participant of participants) {
                client.emit('icebreakerStatusUpdated', {
                    userId: participant.userId,
                    conversationId,
                    isIcebreakerReady: participant.isIcebreakerReady,
                    timestamp: new Date().toISOString()
                });
            }
            if (participants.length === 2) {
                const user1 = participants[0].userId;
                const user2 = participants[1].userId;
                const response1Key = `icebreaker:response:${conversationId}:${user1}`;
                const response2Key = `icebreaker:response:${conversationId}:${user2}`;
                const response1 = await this.redis.get(response1Key);
                const response2 = await this.redis.get(response2Key);
                if (response1 && response2) {
                    const parsedResponse1 = JSON.parse(response1);
                    const parsedResponse2 = JSON.parse(response2);
                    client.emit('icebreakerResponses', {
                        conversationId,
                        questionGroupId: parsedResponse1.questionGroupId,
                        userId1: user1,
                        optionId1: parsedResponse1.optionId,
                        userId2: user2,
                        optionId2: parsedResponse2.optionId,
                        answeredAt: new Date().toISOString()
                    });
                }
            }
            const otherParticipant = participants.find(p => p.userId !== userId);
            if (otherParticipant) {
                const typingKey = `conversation:${conversationId}:typing:${otherParticipant.userId}`;
                const isTyping = await this.redis.get(typingKey);
                if (isTyping) {
                    client.emit('typing', {
                        conversationId,
                        userId: otherParticipant.userId,
                        isTyping: true,
                        timestamp: new Date().toISOString()
                    });
                }
            }
        }
        catch (error) {
            this.logger.warn(`Erreur lors de la synchronisation de la conversation ${conversationId}: ${error.message}`);
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveConversation'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
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
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('icebreakerReady'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleIcebreakerReady", null);
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
        redis_service_1.RedisService,
        question_service_1.QuestionService,
        icebreaker_service_1.IcebreakerService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map