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
const messages_service_1 = require("../messages/messages.service");
let IcebreakerService = class IcebreakerService {
    prisma;
    redis;
    chatGateway;
    messagesService;
    constructor(prisma, redis, chatGateway, messagesService) {
        this.prisma = prisma;
        this.redis = redis;
        this.chatGateway = chatGateway;
        this.messagesService = messagesService;
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
        return { allParticipantsHaveGivenAnswer: participants.every(p => p.hasGivenAnswer), userAId: participants[0].userId, userBId: participants[1].userId };
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
        await this.saveCurrentUserResponseInRedis(userId, questionGroupId, optionId, conversationId);
        await this.updateParticipantsHasGivenAnswerStatus(conversationId, userId);
        const { allParticipantsHaveGivenAnswer } = await this.areAllParticipantsHaveGivenAnswer(conversationId);
        if (allParticipantsHaveGivenAnswer) {
            await this.processCompletedIcebreaker(conversationId, questionGroupId);
        }
    }
    async saveCurrentUserResponseInRedis(userId, questionGroupId, optionId, conversationId) {
        const redisKey = `icebreaker:${conversationId}:responses:${userId}`;
        await this.redis.set(redisKey, JSON.stringify({
            userId,
            questionGroupId,
            optionId,
            answeredAt: new Date().toISOString()
        }), 86400);
    }
    async updateParticipantsHasGivenAnswerStatus(conversationId, userId) {
        await this.prisma.conversationParticipant.updateMany({
            where: {
                conversationId,
                userId
            },
            data: {
                hasGivenAnswer: true
            }
        });
    }
    async processCompletedIcebreaker(conversationId, questionGroupId) {
        const { userAnswers, questionGroupLocalized } = await this.getUserAnswers(conversationId, questionGroupId);
        if (userAnswers.length !== 2) {
            console.warn(`La conversation ${conversationId} n'a pas exactement 2 réponses pour le groupe de questions ${questionGroupId}.`);
            return;
        }
        const { userAnswerA, userAnswerB, questionLabel } = this.formatUserAnswersForAddIcebreakerMessage(conversationId, questionGroupId, userAnswers, questionGroupLocalized);
        await this.addIcebreakerMessage(conversationId, questionLabel, userAnswerA, userAnswerB);
        await this.resetIcebreakerStatus(conversationId);
        await this.emitResponsesToAllParticipants(conversationId, questionLabel, userAnswerA, userAnswerB);
    }
    async getUserAnswers(conversationId, questionGroupId) {
        const conversationLocale = await this.prisma.conversation.findUnique({
            where: { id: conversationId },
            select: { locale: true }
        });
        console.log('conversationLocale:', conversationLocale);
        const questionGroupLocalized = await this.prisma.questionGroup.findUnique({
            where: { id: questionGroupId },
            select: { questions: { where: { locale: conversationLocale?.locale } } }
        });
        const userAnswers = await this.prisma.userAnswer.findMany({
            where: {
                conversationId,
                questionGroupId
            },
            select: {
                userId: true,
                questionOption: {
                    select: {
                        label: true,
                        locale: true,
                    },
                },
                questionGroup: {
                    include: {
                        questions: {
                            where: {
                                locale: conversationLocale?.locale
                            },
                            take: 1,
                        }
                    }
                }
            }
        });
        return { userAnswers, questionGroupLocalized };
    }
    formatUserAnswersForAddIcebreakerMessage(conversationId, questionGroupId, userAnswers, questionGroupLocalized) {
        const userAnswerA = {
            userId: userAnswers[0].userId,
            questionOption: userAnswers[0].questionOption.label
        };
        const userAnswerB = {
            userId: userAnswers[1].userId,
            questionOption: userAnswers[1].questionOption.label
        };
        const questionLabel = questionGroupLocalized.questions[0].question;
        return { userAnswerA, userAnswerB, questionLabel };
    }
    async addIcebreakerMessage(conversationId, questionLabel, userAnswerA, userAnswerB) {
        await this.messagesService.addIcebreakerMessage(conversationId, questionLabel, userAnswerA, userAnswerB);
    }
    async resetIcebreakerStatus(conversationId) {
        await this.prisma.conversationParticipant.updateMany({
            where: { conversationId },
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
    }
    async emitResponsesToAllParticipants(conversationId, questionLabel, userAnswerA, userAnswerB) {
        const user1 = userAnswerA.userId;
        const user2 = userAnswerB.userId;
        const response1 = userAnswerA.questionOption;
        const response2 = userAnswerB.questionOption;
        await this.chatGateway.emitIcebreakerResponsesToAllParticipants(conversationId, questionLabel, user1, response1, user2, response2);
    }
};
exports.IcebreakerService = IcebreakerService;
exports.IcebreakerService = IcebreakerService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        chat_gateway_1.ChatGateway,
        messages_service_1.MessagesService])
], IcebreakerService);
//# sourceMappingURL=icebreaker.service.js.map