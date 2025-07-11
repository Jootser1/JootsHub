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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcebreakerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const chat_gateway_1 = require("../gateways/chat.gateway");
const messages_service_1 = require("../messages/messages.service");
const conversations_service_1 = require("../conversations/conversations.service");
let IcebreakerService = class IcebreakerService {
    prisma;
    redis;
    chatGateway;
    messagesService;
    conversationsService;
    logger;
    constructor(prisma, redis, chatGateway, messagesService, conversationsService, logger) {
        this.prisma = prisma;
        this.redis = redis;
        this.chatGateway = chatGateway;
        this.messagesService = messagesService;
        this.conversationsService = conversationsService;
        this.logger = logger;
    }
    async updateParticipantIcebreakerReady(conversationId, userId, isIcebreakerReady) {
        await this.prisma.conversationParticipant.updateMany({
            where: { conversation_id: conversationId, user_id: userId },
            data: { is_icebreaker_ready: isIcebreakerReady },
        });
        await this.redis.hset(`conversation:${conversationId}:participants`, userId, JSON.stringify({
            is_icebreaker_ready: isIcebreakerReady,
            timestamp: new Date().toISOString(),
        }));
    }
    async areAllParticipantsReady(conversationId) {
        const redisParticipants = await this.redis.hgetall(`conversation:${conversationId}:participants`);
        console.log('Redis participants', redisParticipants);
        if (Object.keys(redisParticipants).length > 0) {
            const result = Object.values(redisParticipants).every((participant) => {
                const parsedParticipant = JSON.parse(participant);
                console.log('Parsed participant from Redis:', parsedParticipant);
                return parsedParticipant.is_icebreaker_ready;
            });
            console.log('Redis check result:', result);
            return result;
        }
        const participants = await this.prisma.conversationParticipant.findMany({
            where: { conversation_id: conversationId },
        });
        console.log('DB participants:', participants.map(p => ({ user_id: p.user_id, is_icebreaker_ready: p.is_icebreaker_ready })));
        const dbResult = participants.every((p) => p.is_icebreaker_ready);
        console.log('DB check result:', dbResult);
        return dbResult;
    }
    async updateParticipantsHasGivenAnswerStatus(conversationId, userId, has_given_answer) {
        await this.prisma.conversationParticipant.updateMany({
            where: {
                conversation_id: conversationId,
                user_id: userId,
            },
            data: {
                has_given_answer: has_given_answer,
            },
        });
        const redisParticipants = await this.redis.hgetall(`conversation:${conversationId}:participants`);
        const existingData = redisParticipants[userId];
        let participantData = {
            has_given_answer: has_given_answer,
            timestamp: new Date().toISOString(),
        };
        if (existingData) {
            const parsed = JSON.parse(existingData);
            participantData = { ...parsed, ...participantData };
        }
        await this.redis.hset(`conversation:${conversationId}:participants`, userId, JSON.stringify(participantData));
    }
    async areAllParticipantsHaveGivenAnswer(conversationId) {
        const redisParticipants = await this.redis.hgetall(`conversation:${conversationId}:participants`);
        if (Object.keys(redisParticipants).length > 0) {
            const allParticipantsHaveGivenAnswer = Object.values(redisParticipants).every((participant) => {
                const parsedParticipant = JSON.parse(participant);
                return parsedParticipant.has_given_answer;
            });
            const userIds = Object.keys(redisParticipants);
            return {
                allParticipantsHaveGivenAnswer,
                userAId: userIds[0],
                userBId: userIds[1],
            };
        }
        const participants = await this.prisma.conversationParticipant.findMany({
            where: { conversation_id: conversationId },
        });
        return {
            allParticipantsHaveGivenAnswer: participants.every((p) => p.has_given_answer),
            userAId: participants[0].user_id,
            userBId: participants[1].user_id,
        };
    }
    async storeCurrentPollForAGivenConversation(conversationId, poll) {
        try {
            if (!poll)
                return;
            await this.redis.set(`conversation:${conversationId}:icebreaker:poll`, JSON.stringify({
                poll_id: poll.poll_id,
                type: poll.type,
                poll_translations: poll.poll_translations.map(t => ({ translation: t.translation })),
                options: poll.options.map(o => ({
                    poll_option_id: o.poll_option_id,
                    order: o.order,
                    translations: o.translations
                })),
                categories: poll.categories?.map(c => ({
                    category_id: c.category_id,
                    name: c.name
                })) || []
            }));
        }
        catch (error) {
            this.logger.error('Error storing random question:', error);
            throw error;
        }
    }
    async processIcebreakersPostResponse(postedResponse) {
        await this.saveCurrentUserResponseInRedis(postedResponse);
        await this.updateParticipantsHasGivenAnswerStatus(postedResponse.conversation_id, postedResponse.user_id, true);
        const { allParticipantsHaveGivenAnswer } = await this.areAllParticipantsHaveGivenAnswer(postedResponse.conversation_id);
        if (allParticipantsHaveGivenAnswer) {
            const conversation = await this.conversationsService.fetchConversationByIdWithXpAndLevel(postedResponse.conversation_id);
            const newXp = await this.conversationsService.updateXpToConversationId(conversation.conversation_id, conversation.xp_and_level.difficulty);
            const xpAndLevel = await this.conversationsService.getConversationLevel(newXp, conversation.xp_and_level.difficulty);
            await this.processCompletedBothIcebreakers(conversation.conversation_id, postedResponse.poll_id);
        }
    }
    async saveCurrentUserResponseInRedis(postedResponse) {
        const redisKey = `icebreaker:${postedResponse.conversation_id}:responses:${postedResponse.user_id}`;
        await this.redis.set(redisKey, JSON.stringify({
            user_id: postedResponse.user_id,
            poll_id: postedResponse.poll_id,
            option_id: postedResponse.option_id ?? null,
            opentext: postedResponse.opentext ?? null,
            numeric: postedResponse.numeric ?? null,
            conversation_id: postedResponse.conversation_id,
            locale: postedResponse.locale,
            answeredAt: new Date().toISOString(),
        }), 86400);
    }
    async processCompletedBothIcebreakers(conversationId, pollId) {
        const { conversation, userAnswers, pollLocalized } = await this.getUserAnswers(conversationId, pollId);
        if (userAnswers.length !== 2) {
            this.logger.warn(`La conversation ${conversationId} n'a pas exactement 2 réponses pour le poll ${pollId}.`);
            return;
        }
        const extractAnswerText = (userAnswer) => {
            if (userAnswer.opentext) {
                return userAnswer.opentext;
            }
            else if (userAnswer.numeric !== null && userAnswer.numeric !== undefined) {
                return userAnswer.numeric.toString();
            }
            else if (userAnswer.option && userAnswer.option.translations && userAnswer.option.translations.length > 0) {
                return userAnswer.option.translations[0].translated_option_text;
            }
            else {
                return 'Réponse non disponible';
            }
        };
        const userAnswerA = {
            userId: userAnswers[0]?.user_id ?? 'defaultUserId',
            questionOption: extractAnswerText(userAnswers[0]),
        };
        const userAnswerB = {
            userId: userAnswers[1]?.user_id ?? 'defaultUserId',
            questionOption: extractAnswerText(userAnswers[1]),
        };
        await this.resetIcebreakerStatus(conversationId, userAnswerA.userId, userAnswerB.userId);
        const levelData = await this.conversationsService.getConversationLevel(conversation.xp_and_level.reached_xp, conversation.xp_and_level.difficulty);
        const xpAndLevel = {
            ...levelData
        };
        await this.emitResponsesToAllParticipants(conversationId, pollLocalized?.poll_translations[0]?.translation ?? 'defaultPollTranslation', userAnswerA, userAnswerB, xpAndLevel);
    }
    async emitResponsesToAllParticipants(conversationId, questionLabel, userAnswerA, userAnswerB, xpAndLevel) {
        const user1 = userAnswerA.userId;
        const user2 = userAnswerB.userId;
        const response1 = userAnswerA.questionOption;
        const response2 = userAnswerB.questionOption;
        await this.chatGateway.emitIcebreakerResponsesToAllParticipants(conversationId, questionLabel, user1, response1, user2, response2, xpAndLevel);
    }
    async getUserAnswers(conversationId, pollId) {
        const conversation = await this.conversationsService.fetchConversationByIdWithXpAndLevel(conversationId);
        const conv_locale = conversation.locale;
        const pollLocalized = await this.prisma.poll.findUnique({
            where: { poll_id: pollId },
            select: { poll_translations: { where: { locale: conv_locale } } },
        });
        const userAnswers = await this.prisma.pollAnswer.findMany({
            where: {
                source: {
                    conversation_id: conversationId,
                },
                poll_id: pollId,
            },
            include: {
                source: true,
                option: {
                    include: {
                        translations: {
                            where: {
                                locale: conv_locale,
                            },
                        },
                    },
                },
                poll: {
                    include: {
                        poll_translations: {
                            where: {
                                locale: conv_locale,
                            },
                        },
                    },
                },
            },
        });
        return { conversation, userAnswers, pollLocalized };
    }
    async resetIcebreakerStatus(conversationId, userAId, userBId) {
        console.log('COUCOU resetIcebreakerStatus', conversationId);
        await this.prisma.conversationParticipant.updateMany({
            where: { conversation_id: conversationId },
            data: {
                is_icebreaker_ready: false,
                has_given_answer: false,
            },
        });
        const redisIcebreakerKey = `conversation:${conversationId}:participants`;
        const participantData = JSON.stringify({
            isIcebreakerReady: false,
            hasGivenAnswer: false,
        });
        await this.redis.hset(redisIcebreakerKey, userAId, participantData);
        await this.redis.hset(redisIcebreakerKey, userBId, participantData);
    }
};
exports.IcebreakerService = IcebreakerService;
exports.IcebreakerService = IcebreakerService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => chat_gateway_1.ChatGateway))),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, redis_service_1.RedisService,
        chat_gateway_1.ChatGateway,
        messages_service_1.MessagesService,
        conversations_service_1.ConversationsService,
        common_1.Logger])
], IcebreakerService);
//# sourceMappingURL=icebreaker.service.js.map