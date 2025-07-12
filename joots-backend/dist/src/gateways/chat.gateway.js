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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma/prisma.service");
const base_gateway_1 = require("./base.gateway");
const redis_service_1 = require("../redis/redis.service");
const question_service_1 = require("../questions/question.service");
const icebreaker_service_1 = require("../icebreakers/icebreaker.service");
const conversations_service_1 = require("../conversations/conversations.service");
let ChatGateway = ChatGateway_1 = class ChatGateway extends base_gateway_1.BaseGateway {
    prisma;
    redis;
    questionService;
    icebreakerService;
    conversationsService;
    constructor(prisma, redis, questionService, icebreakerService, conversationsService) {
        super(ChatGateway_1.name);
        this.prisma = prisma;
        this.redis = redis;
        this.questionService = questionService;
        this.icebreakerService = icebreakerService;
        this.conversationsService = conversationsService;
    }
    userChatSockets = new Map();
    chatSocketUsers = new Map();
    handleConnection(client) {
        const userId = client.data.userId;
        if (!userId) {
            this.logger.warn(`[Chat Socket ${client.id}] Connexion rejetée sans ID utilisateur`);
            client.disconnect();
            return;
        }
        this.userChatSockets.set(userId, client.id);
        this.chatSocketUsers.set(client.id, userId);
        this.joinUserConversations(client, userId).catch((error) => {
            this.logger.error(`[Chat Socket ${client.id}] Erreur lors de la jointure des conversations: ${error.message}`);
        });
    }
    async handleDisconnect(client) {
        const user_id = client.data.user_id;
        if (!user_id)
            return;
        try {
            this.userChatSockets.delete(user_id);
            this.chatSocketUsers.delete(client.id);
            const conversationsIds = await this.conversationsService.findAllConversationsIdsForAUserId(user_id);
            for (const conversation_id of conversationsIds) {
                client.leave(conversation_id);
                this.server.to(conversation_id).emit('typing', {
                    conversation_id: conversation_id,
                    user_id: user_id,
                    is_typing: false,
                    timestamp: new Date().toISOString(),
                });
            }
            this.logger.log(`[Chat Socket ${client.id}] ${user_id} : Déconnexion chat réussie`);
        }
        catch (error) {
            this.logger.error(`[Chat Socket ${client.id}] ${user_id} : Erreur lors de la déconnexion: ${error.message}`);
        }
    }
    handleJoinConversation(client, data) {
        if (!data.conversation_id || data.conversation_id === 'null' || data.conversation_id === 'undefined') {
            this.logger.warn(`[Chat Socket ${client.id}] ${data.user_id} : Tentative de rejoindre une conversation avec un ID invalide: ${data.conversation_id}`);
            return { success: false, error: 'ID de conversation invalide' };
        }
        try {
            client.join(data.conversation_id);
            this.logger.debug(`[Chat Socket ${client.id}] ${data.user_id} : a rejoint la conversation ${data.conversation_id}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`[Chat Socket ${client.id}] ${data.user_id} : Erreur lors de la jonction à la conversation ${data.conversation_id}:`, error);
            return { success: false, error: error.message };
        }
    }
    handleLeaveConversation(client, data) {
        try {
            client.leave(data.conversation_id);
            this.logger.debug(`[Chat Socket ${client.id}] ${data.user_id} : a quitté la conversation ${data.conversation_id}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`[Chat Socket ${client.id}] ${data.user_id} : Erreur lors du départ de la conversation ${data.conversation_id}:`, error);
            return { success: false, error: error.message };
        }
    }
    async handleSendMessage(client, data) {
        const { conversation_id, content, user_id } = data;
        if (user_id !== client.data.userId) {
            return { success: false, error: 'Non autorisé' };
        }
        try {
            const conversation = await this.prisma.conversation.findUnique({
                where: { conversation_id: conversation_id },
            });
            if (!conversation) {
                return { success: false, error: 'Conversation non trouvée' };
            }
            const message = await this.prisma.message.create({
                data: {
                    content,
                    sender: { connect: { user_id: user_id } },
                    conversation: { connect: { conversation_id: conversation_id } },
                    status: 'SENT',
                },
                include: {
                    sender: {
                        select: {
                            user_id: true,
                            username: true,
                            avatar: true,
                        },
                    },
                },
            });
            const messageToEmit = {
                ...message,
                conversation_id,
                created_at: message.created_at || new Date().toISOString(),
            };
            client.join(conversation_id);
            this.server.to(conversation_id).emit('newMessage', messageToEmit);
            return { success: true, message: messageToEmit };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    handleTyping(client, data) {
        const { conversation_id, user_id, is_typing } = data;
        if (user_id !== client.data.userId) {
            return { success: false, error: 'Non autorisé' };
        }
        try {
            client.to(conversation_id).emit('typing', {
                conversation_id,
                user_id,
                is_typing,
                timestamp: new Date().toISOString(),
            });
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du statut de frappe: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleIcebreakerReady(client, data) {
        this.logger.debug(`[Chat Socket ${client.id}] ${data.user_id} : icebreakerReady: ${data.is_icebreaker_ready}`);
        const { conversation_id, user_id, is_icebreaker_ready } = data;
        if (user_id !== client.data.userId) {
            return { success: false, error: 'Non autorisé' };
        }
        try {
            await this.icebreakerService.updateParticipantIcebreakerReady(conversation_id, user_id, is_icebreaker_ready);
            client.join(conversation_id);
            this.emitIcebreakerStatusUpdate(conversation_id, user_id, is_icebreaker_ready);
            const allReady = await this.icebreakerService.areAllParticipantsReady(conversation_id);
            console.log('allReady', allReady);
            if (allReady) {
                await this.triggerIcebreakerQuestion(conversation_id, client);
            }
            return {
                success: true,
                userId: user_id,
                is_icebreaker_ready: is_icebreaker_ready,
            };
        }
        catch (error) {
            this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    emitIcebreakerStatusUpdate(conversation_id, user_id, is_icebreaker_ready) {
        this.server.to(conversation_id).emit('icebreakerStatusUpdated', {
            user_id,
            conversation_id,
            is_icebreaker_ready: is_icebreaker_ready,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Status updated for user ${user_id} in conversation ${conversation_id}: ready=${is_icebreaker_ready}`);
    }
    async triggerIcebreakerQuestion(conversation_id, client) {
        const participants = await this.prisma.conversationParticipant.findMany({
            where: { conversation_id: conversation_id },
            select: { user_id: true },
        });
        if (participants.length < 2) {
            this.logger.warn(`Conversation ${conversation_id} does not have 2 participants.`);
            return;
        }
        const [a, b] = participants;
        const poll = await this.questionService.getNextRandomPoll(conversation_id, a.user_id, b.user_id);
        console.log('poll', poll);
        if (!poll)
            return;
        await this.icebreakerService.storeCurrentPollForAGivenConversation(conversation_id, poll);
        this.emitNextPolltoParticipants(client, conversation_id, poll);
    }
    emitNextPolltoParticipants(client, conversation_id, poll) {
        client.join(conversation_id);
        this.server.to(conversation_id).emit('icebreakerPoll', {
            poll: {
                poll_id: poll.poll_id,
                type: poll.type,
                poll_translations: poll.poll_translations.map(t => ({ translation: t.translation })),
                options: poll.options.map(o => ({
                    poll_option_id: o.poll_option_id,
                    translations: o.translations
                })),
                categories: poll.categories.map(c => ({
                    category_id: c.category_id,
                    name: c.name
                }))
            },
            conversation_id,
            timestamp: new Date().toISOString(),
        });
        this.logger.log(`Question envoyée à ${conversation_id}`);
    }
    async emitIcebreakerResponsesToAllParticipants(conversation_id, questionLabel, user1, response1, user2, response2, xpAndLevel) {
        const socketData = {
            conversation_id,
            poll_translation: questionLabel,
            poll_id: 'generated_' + Date.now(),
            user1,
            response1,
            user2,
            response2,
            xpAndLevel,
            answeredAt: new Date().toISOString(),
        };
        this.server.to(conversation_id).emit('icebreakerResponses', socketData);
    }
    async joinUserConversations(client, user_id) {
    }
    async synchronizeConversationState(client, conversation_id, user_id, participants) {
        try {
            await this.synchronizeIcebreakerQuestion(client, conversation_id);
            await this.synchronizeParticipantStatuses(client, conversation_id, participants);
            await this.synchronizeIcebreakerResponses(client, conversation_id, participants);
        }
        catch (error) {
            this.logger.warn(`Erreur lors de la synchronisation de la conversation ${conversation_id}: ${error.message}`);
        }
    }
    async synchronizeIcebreakerQuestion(client, conversation_id) {
        const pollKey = `conversation:${conversation_id}:icebreaker:poll`;
        const poll = await this.redis.get(pollKey);
        if (poll) {
            this.server.to(conversation_id).emit('icebreakerPoll', {
                poll: JSON.parse(poll),
                conversation_id,
                timestamp: new Date().toISOString(),
            });
        }
    }
    async synchronizeParticipantStatuses(client, conversation_id, participants) {
        for (const participant of participants) {
            this.emitIcebreakerStatusUpdate(conversation_id, participant.user_id, participant.is_icebreaker_ready);
        }
    }
    async synchronizeIcebreakerResponses(client, conversation_id, participants) {
        if (participants.length !== 2)
            return;
        const [user1, user2] = participants.map((p) => p.user_id);
        const response1Key = `icebreaker:${conversation_id}:responses:${user1}`;
        const response2Key = `icebreaker:${conversation_id}:responses:${user2}`;
        const [response1, response2] = await Promise.all([
            this.redis.get(response1Key),
            this.redis.get(response2Key),
        ]);
        if (response1 && response2) {
            const parsedResponse1 = JSON.parse(response1);
            const parsedResponse2 = JSON.parse(response2);
            this.server.to(conversation_id).emit('icebreakerResponses', {
                conversation_id,
                poll_id: parsedResponse1.poll_id,
                user1: user1,
                response1: parsedResponse1.option_id,
                user2: user2,
                response2: parsedResponse2.option_id,
                answered_at: new Date().toISOString(),
            });
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
            credentials: true,
        },
        namespace: 'chat',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, redis_service_1.RedisService,
        question_service_1.QuestionService,
        icebreaker_service_1.IcebreakerService,
        conversations_service_1.ConversationsService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map