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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const icebreaker_service_1 = require("../icebreakers/icebreaker.service");
const conversations_service_1 = require("../conversations/conversations.service");
const question_types_1 = require("@shared/question.types");
let QuestionService = class QuestionService {
    prisma;
    icebreakerService;
    conversationsService;
    constructor(prisma, icebreakerService, conversationsService) {
        this.prisma = prisma;
        this.icebreakerService = icebreakerService;
        this.conversationsService = conversationsService;
    }
    async getUserLastResponseToQuestion(currentUserId, pollId) {
        return this.prisma.pollAnswer.findFirst({
            where: {
                user_id: currentUserId,
                poll_id: pollId,
            },
            orderBy: {
                answered_at: 'desc',
            },
            include: {
                option: true,
            },
        });
    }
    async getPoll(pollId) {
        return this.prisma.poll.findUnique({
            where: { poll_id: pollId },
        });
    }
    async getNextRandomPoll(conversationId, userId1, userId2) {
        const answeredQuestionsUser1 = await this.prisma.pollAnswer.findMany({
            where: { user_id: userId1 },
            select: { poll_id: true },
        });
        const answeredQuestionsUser2 = await this.prisma.pollAnswer.findMany({
            where: { user_id: userId2 },
            select: { poll_id: true },
        });
        const answeredPollIdsUser1 = answeredQuestionsUser1.map((answer) => answer.poll_id);
        const answeredPollIdsUser2 = answeredQuestionsUser2.map((answer) => answer.poll_id);
        if (!conversationId) {
            throw new Error('conversationId est requis pour récupérer la locale');
        }
        const locale = await this.conversationsService.getConversationLocale(conversationId);
        const unansweredPolls = await this.prisma.poll.findMany({
            where: {
                poll_id: {
                    notIn: [
                        ...answeredPollIdsUser1,
                        ...answeredPollIdsUser2,
                    ],
                },
                type: {
                    in: [question_types_1.PollType.OPEN, question_types_1.PollType.CONTINUOUS],
                },
                is_enabled: true,
            },
            orderBy: {
                created_at: 'asc',
            },
            include: {
                poll_translations: {
                    where: {
                        locale: locale,
                    },
                },
                options: {
                    include: {
                        translations: {
                            where: {
                                locale: locale,
                            },
                        },
                    },
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
                scale_constraint: true,
            },
        });
        if (unansweredPolls.length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * unansweredPolls.length);
        const randomUnansweredPoll = unansweredPolls[randomIndex];
        await this.prisma.conversation.update({
            where: { conversation_id: conversationId },
            data: { current_poll_id: randomUnansweredPoll.poll_id },
        });
        return {
            ...randomUnansweredPoll,
            categories: randomUnansweredPoll.categories.map(c => ({
                category_id: c.category.category_id,
                name: c.category.name,
            })),
            type: randomUnansweredPoll.type,
            poll_scale_constraints: randomUnansweredPoll.scale_constraint ? {
                constraint_id: randomUnansweredPoll.scale_constraint.poll_id,
                min_value: randomUnansweredPoll.scale_constraint.min_value,
                max_value: randomUnansweredPoll.scale_constraint.max_value,
                step: randomUnansweredPoll.scale_constraint.step_value ?? 1,
                min_label: randomUnansweredPoll.scale_constraint.min_label || undefined,
                max_label: randomUnansweredPoll.scale_constraint.max_label || undefined
            } : null
        };
    }
    async saveUserAnswerInDB(response) {
        return this.prisma.$transaction(async (prisma) => {
            let pollAnswer;
            if (response.poll_type === question_types_1.PollType.OPEN) {
                pollAnswer = await prisma.pollAnswer.create({
                    data: {
                        user_id: response.user_id,
                        poll_id: response.poll_id,
                        opentext: response.opentext,
                        answered_at: new Date(),
                    },
                });
            }
            else if (response.poll_type === question_types_1.PollType.CONTINUOUS) {
                pollAnswer = await prisma.pollAnswer.create({
                    data: {
                        user_id: response.user_id,
                        poll_id: response.poll_id,
                        numeric: response.numeric,
                        answered_at: new Date(),
                    },
                });
            }
            else if (response.poll_type === question_types_1.PollType.MULTIPLE_CHOICE || response.poll_type === question_types_1.PollType.STEP_LABELED || response.poll_type === question_types_1.PollType.YES_NO_IDK) {
                pollAnswer = await prisma.pollAnswer.create({
                    data: {
                        user_id: response.user_id,
                        poll_id: response.poll_id,
                        poll_option_id: response.option_id,
                        answered_at: new Date(),
                    },
                });
            }
            else {
                throw new Error(`Type de sondage non supporté: ${response.poll_type}`);
            }
            await prisma.pollAnswerSource.create({
                data: {
                    source_type: 'CONVERSATION',
                    locale: response.locale,
                    conversation_id: response.conversation_id,
                    answer: { connect: { poll_answer_id: pollAnswer.poll_answer_id } },
                },
            });
            return pollAnswer;
        });
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, icebreaker_service_1.IcebreakerService,
        conversations_service_1.ConversationsService])
], QuestionService);
//# sourceMappingURL=question.service.js.map