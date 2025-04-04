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
exports.ConversationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const user_gateway_1 = require("../gateways/user.gateway");
let ConversationsService = class ConversationsService {
    prisma;
    userGateway;
    constructor(prisma, userGateway) {
        this.prisma = prisma;
        this.userGateway = userGateway;
    }
    userSelect = {
        id: true,
        username: true,
        avatar: true,
        isOnline: true,
    };
    async findAll(userId) {
        try {
            return await this.prisma.conversation.findMany({
                where: {
                    participants: {
                        some: { userId },
                    },
                },
                include: {
                    participants: {
                        include: {
                            user: { select: this.userSelect },
                        },
                    },
                    messages: {
                        orderBy: { createdAt: 'desc' },
                        take: 1,
                    },
                },
                orderBy: { updatedAt: 'desc' },
            });
        }
        catch (error) {
            console.error('Erreur dans findAll:', error);
            throw error;
        }
    }
    async findOne(id, userId) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                id,
                participants: {
                    some: { userId },
                },
            },
            include: {
                participants: {
                    include: {
                        user: { select: this.userSelect },
                    },
                },
                messages: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation non trouvée');
        }
        return conversation;
    }
    async findConversation(userId, receiverId) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                AND: [
                    { participants: { some: { userId } } },
                    { participants: { some: { userId: receiverId } } },
                ],
            },
            include: {
                participants: {
                    include: {
                        user: { select: this.userSelect },
                    },
                },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 50,
                    include: {
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                avatar: true,
                            },
                        },
                    },
                },
            },
        });
        if (!conversation) {
            throw new common_1.NotFoundException('Conversation non trouvée');
        }
        return conversation;
    }
    async create(userId, receiverId) {
        const [user1, user2] = await Promise.all([
            this.prisma.user.findUnique({ where: { id: userId } }),
            this.prisma.user.findUnique({ where: { id: receiverId } }),
        ]);
        if (!user1 || !user2) {
            throw new common_1.NotFoundException('Un ou les deux utilisateurs sont introuvables');
        }
        const existingConversation = await this.prisma.conversation.findFirst({
            where: {
                AND: [
                    { participants: { some: { userId } } },
                    { participants: { some: { userId: receiverId } } },
                ],
            },
            include: {
                participants: {
                    include: {
                        user: { select: this.userSelect },
                    },
                },
            },
        });
        if (existingConversation) {
            return existingConversation;
        }
        return this.prisma.conversation.create({
            data: {
                participants: {
                    create: [
                        { userId },
                        { userId: receiverId },
                    ],
                },
            },
            include: {
                participants: {
                    include: {
                        user: { select: this.userSelect },
                    },
                },
            },
        });
    }
    async findMessages(conversationId, userId) {
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
        const messages = await this.prisma.message.findMany({
            where: {
                conversationId,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return messages;
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_gateway_1.UserGateway])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map