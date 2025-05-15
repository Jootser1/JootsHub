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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const icebreaker_service_1 = require("../icebreakers/icebreaker.service");
let QuestionService = class QuestionService {
    prisma;
    icebreakerService;
    constructor(prisma, icebreakerService) {
        this.prisma = prisma;
        this.icebreakerService = icebreakerService;
    }
    async getUserLastResponseToQuestion(currentUserId, questionGroupId) {
        console.log(Object.keys(this.prisma));
        return this.prisma.userAnswer.findFirst({
            where: {
                userId: currentUserId,
                questionGroupId,
            },
            orderBy: {
                answeredAt: 'desc',
            },
            include: {
                questionOption: true,
            },
        });
    }
    async getQuestionGroup(questionGroupId) {
        return this.prisma.questionGroup.findUnique({
            where: { id: questionGroupId },
        });
    }
    async getNextRandomQuestionGroup(userId1, userId2) {
        const answeredQuestionsUser1 = await this.prisma.userAnswer.findMany({
            where: { userId: userId1 },
            select: { questionGroupId: true },
        });
        const answeredQuestionsUser2 = await this.prisma.userAnswer.findMany({
            where: { userId: userId2 },
            select: { questionGroupId: true },
        });
        const answeredQuestionGroupIdsUser1 = answeredQuestionsUser1.map(answer => answer.questionGroupId);
        const answeredQuestionGroupIdsUser2 = answeredQuestionsUser2.map(answer => answer.questionGroupId);
        const unansweredQuestionGroups = await this.prisma.questionGroup.findMany({
            where: {
                id: {
                    notIn: [...answeredQuestionGroupIdsUser1, ...answeredQuestionGroupIdsUser2],
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
            include: {
                questions: {
                    where: {
                        locale: 'fr_FR',
                    },
                },
                categories: {
                    include: {
                        category: {
                            include: {
                                translations: {
                                    where: {
                                        locale: 'fr_FR',
                                    },
                                },
                            },
                        },
                    },
                },
                options: {
                    where: {
                        locale: 'fr_FR',
                    },
                },
            },
        });
        if (unansweredQuestionGroups.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * unansweredQuestionGroups.length);
        const randomUnansweredQuestionGroup = unansweredQuestionGroups[randomIndex];
        console.log('randomUnansweredQuestionGroup', randomUnansweredQuestionGroup);
        return randomUnansweredQuestionGroup;
    }
    async saveResponse(userId, questionGroupId, optionId, conversationId) {
        console.log('savedResponse', userId, questionGroupId, optionId, conversationId);
        if (!userId || !questionGroupId || !optionId) {
            throw new Error('Les paramètres userId, questionGroupId et optionId sont requis');
        }
        const savedResponse = await this.saveUserAnswerInDB(userId, questionGroupId, optionId, conversationId);
        if (conversationId) {
            await this.icebreakerService.processIcebreakersPostResponses(userId, questionGroupId, optionId, conversationId);
        }
        return savedResponse;
    }
    async saveUserAnswerInDB(userId, questionGroupId, optionId, conversationId) {
        return this.prisma.userAnswer.create({
            data: {
                userId: userId,
                questionGroupId: questionGroupId,
                questionOptionId: optionId,
                answeredAt: new Date(),
                ...(conversationId ? { conversationId } : {})
            },
        });
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, icebreaker_service_1.IcebreakerService])
], QuestionService);
//# sourceMappingURL=question.service.js.map