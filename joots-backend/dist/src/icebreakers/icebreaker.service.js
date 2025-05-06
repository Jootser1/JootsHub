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
exports.IcebreakerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const chat_gateway_1 = require("../gateways/chat.gateway");
let IcebreakerService = class IcebreakerService {
    prisma;
    redis;
    chatGateway;
    constructor(prisma, redis, chatGateway) {
        this.prisma = prisma;
        this.redis = redis;
        this.chatGateway = chatGateway;
    }
    async setParticipantIcebreakerReady(conversationId, userId, isIcebreakerReady) {
        await this.prisma.conversationParticipant.updateMany({
            where: { conversationId, userId },
            data: { isIcebreakerReady: isIcebreakerReady },
        });
        await this.redis.hset(`conversation:${conversationId}:participants`, userId, JSON.stringify({ isIcebreakerReady: isIcebreakerReady, timestamp: new Date().toISOString() }));
    }
    async areAllParticipantsReady(conversationId) {
        const participants = await this.prisma.conversationParticipant.findMany({ where: { conversationId } });
        return participants.every(p => p.isIcebreakerReady);
    }
    async areAllParticipantsHaveGivenAnswer(conversationId) {
        const participants = await this.prisma.conversationParticipant.findMany({ where: { conversationId } });
        return participants.every(p => p.hasGivenAnswer);
    }
    async storeCurrentQuestionGroupForAGivenConversation(conversationId, questionGroup) {
        try {
            if (!questionGroup)
                return;
            await this.redis.set(`conversation:${conversationId}:icebreaker:questionGroup`, JSON.stringify({
                id: questionGroup.id,
                text: questionGroup.questions[0].question,
                timestamp: new Date().toISOString(),
            }));
            console.log("Question group stored in Redis:", questionGroup.id);
        }
        catch (error) {
            console.error('Error storing random question:', error);
            throw error;
        }
    }
    async processIcebreakersPostResponses(userId, questionGroupId, optionId, conversationId) {
        const redisKey = `icebreaker:response:${conversationId}:${userId}`;
        await this.redis.set(redisKey, JSON.stringify({
            userId,
            questionGroupId,
            optionId,
            answeredAt: new Date().toISOString()
        }), 86400);
        await this.prisma.conversationParticipant.updateMany({
            where: {
                conversationId,
                userId
            },
            data: {
                hasGivenAnswer: true
            }
        });
        const allParticipantsHaveGivenAnswer = await this.areAllParticipantsHaveGivenAnswer(conversationId);
        if (allParticipantsHaveGivenAnswer) {
            await this.prisma.conversationParticipant.updateMany({
                where: {
                    conversationId
                },
                data: {
                    isIcebreakerReady: false,
                    hasGivenAnswer: false
                }
            });
            const redisIcebreakerKey = `icebreaker:ready:${conversationId}`;
            await this.redis.set(redisIcebreakerKey, JSON.stringify({
                isIcebreakerReady: false,
                hasGivenAnswer: false
            }), 86400);
            await this.emitResponsesToAllParticipants(conversationId, questionGroupId);
        }
    }
    async emitResponsesToAllParticipants(conversationId, questionGroupId) {
        const participants = await this.prisma.conversationParticipant.findMany({
            where: { conversationId },
            select: { userId: true }
        });
        if (participants.length !== 2) {
            console.warn(`La conversation ${conversationId} n'a pas exactement 2 participants.`);
            return;
        }
        const user1 = participants[0].userId;
        const user2 = participants[1].userId;
        const response1Key = `icebreaker:response:${conversationId}:${user1}`;
        const response2Key = `icebreaker:response:${conversationId}:${user2}`;
        const response1 = await this.redis.get(response1Key);
        const response2 = await this.redis.get(response2Key);
        if (!response1 || !response2) {
            console.warn(`Réponses incomplètes pour la conversation ${conversationId}`);
            return;
        }
        const parsedResponse1 = JSON.parse(response1);
        const parsedResponse2 = JSON.parse(response2);
        await this.chatGateway.emitIcebreakerResponsesToAllParticipants(conversationId, questionGroupId, user1, parsedResponse1.optionId, user2, parsedResponse2.optionId);
    }
};
exports.IcebreakerService = IcebreakerService;
exports.IcebreakerService = IcebreakerService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        chat_gateway_1.ChatGateway])
], IcebreakerService);
//# sourceMappingURL=icebreaker.service.js.map