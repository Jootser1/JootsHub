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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MessagesService = class MessagesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async markAsRead(conversationId, userId) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                id: conversationId,
                participants: {
                    some: { userId },
                },
            },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation non trouvée ou accès non autorisé');
        }
        await this.prisma.message.updateMany({
            where: {
                conversationId,
                senderId: { not: userId },
                isRead: false,
            },
            data: {
                isRead: true,
            },
        });
        return { success: true };
    }
    async addIcebreakerMessage(conversationId, questionLabel, userAnswerA, userAnswerB) {
        console.log("userAnswerA", userAnswerA);
        console.log("userAnswerB", userAnswerB);
        await this.prisma.message.create({
            data: {
                conversationId,
                messageType: 'ANSWER',
                content: questionLabel,
                userAId: userAnswerA.userId,
                userAAnswer: userAnswerA.questionOption,
                userBId: userAnswerB.userId,
                userBAnswer: userAnswerB.questionOption,
            }
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map