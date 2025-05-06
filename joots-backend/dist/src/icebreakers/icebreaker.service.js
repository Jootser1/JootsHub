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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcebreakerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let IcebreakerService = class IcebreakerService {
    prisma;
    redis;
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
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
};
exports.IcebreakerService = IcebreakerService;
exports.IcebreakerService = IcebreakerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], IcebreakerService);
//# sourceMappingURL=icebreaker.service.js.map