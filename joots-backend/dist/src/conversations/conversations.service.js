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
    async findAll(userId) {
        return this.prisma.conversation.findMany({
            where: {
                OR: [
                    { initiatorId: userId },
                    { receiverId: userId }
                ]
            },
            include: {
                initiator: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: 'desc',
                    },
                    take: 1,
                },
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }
    async findOne(id, userId) {
        const conversation = await this.prisma.conversation.findFirst({
            where: {
                id,
                OR: [
                    { initiatorId: userId },
                    { receiverId: userId }
                ]
            },
            include: {
                initiator: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
                messages: {
                    orderBy: {
                        createdAt: 'asc',
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
        const existingConversation = await this.prisma.conversation.findFirst({
            where: {
                OR: [
                    {
                        AND: [{ initiatorId: userId }, { receiverId: receiverId }],
                    },
                    {
                        AND: [{ initiatorId: receiverId }, { receiverId: userId }],
                    },
                ],
            },
            include: {
                initiator: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
            },
        });
        if (existingConversation) {
            return existingConversation;
        }
        return this.prisma.conversation.create({
            data: {
                initiatorId: userId,
                receiverId: receiverId,
            },
            include: {
                initiator: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
                receiver: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true,
                    },
                },
            },
        });
    }
    async findConversation(userId, receiverId) {
        try {
            const conversation = await this.prisma.conversation.findFirst({
                where: {
                    OR: [
                        {
                            AND: [{ initiatorId: userId }, { receiverId: receiverId }],
                        },
                        {
                            AND: [{ initiatorId: receiverId }, { receiverId: userId }],
                        },
                    ],
                },
                include: {
                    initiator: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            isOnline: true,
                        },
                    },
                    receiver: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            isOnline: true,
                        },
                    },
                    messages: {
                        orderBy: {
                            createdAt: "desc",
                        },
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
                throw new common_1.NotFoundException('Conversation not found');
            }
            return conversation;
        }
        catch (error) {
            console.error('Erreur dans findConversation:', error);
            throw error;
        }
    }
    async createConversation(userId, receiverId) {
        try {
            const [initiator, receiver] = await Promise.all([
                this.prisma.user.findUnique({ where: { id: userId } }),
                this.prisma.user.findUnique({ where: { id: receiverId } })
            ]);
            if (!initiator || !receiver) {
                throw new Error('Un ou les deux utilisateurs n\'existent pas');
            }
            const existingConversation = await this.prisma.conversation.findFirst({
                where: {
                    OR: [
                        {
                            AND: [{ initiatorId: userId }, { receiverId: receiverId }],
                        },
                        {
                            AND: [{ initiatorId: receiverId }, { receiverId: userId }],
                        },
                    ],
                },
            });
            if (existingConversation) {
                throw new Error('Une conversation existe déjà entre ces utilisateurs');
            }
            const newConversation = await this.prisma.conversation.create({
                data: {
                    initiatorId: userId,
                    receiverId: receiverId,
                },
                include: {
                    initiator: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            isOnline: true,
                        },
                    },
                    receiver: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            isOnline: true,
                        },
                    },
                    messages: {
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
            this.userGateway.emitNewConversation(newConversation, userId, receiverId);
            return newConversation;
        }
        catch (error) {
            console.error('Erreur dans createConversation:', error);
            throw error;
        }
    }
    async getAllConversations(userId) {
        try {
            const conversations = await this.prisma.conversation.findMany({
                where: {
                    OR: [
                        { initiatorId: userId },
                        { receiverId: userId }
                    ]
                },
                include: {
                    initiator: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            isOnline: true,
                        },
                    },
                    receiver: {
                        select: {
                            id: true,
                            username: true,
                            avatar: true,
                            isOnline: true,
                        },
                    },
                    messages: {
                        orderBy: {
                            createdAt: "desc",
                        },
                        take: 1,
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
                orderBy: {
                    updatedAt: "desc",
                },
            });
            return conversations;
        }
        catch (error) {
            console.error('Erreur dans getAllConversations:', error);
            throw error;
        }
    }
};
exports.ConversationsService = ConversationsService;
exports.ConversationsService = ConversationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_gateway_1.UserGateway])
], ConversationsService);
//# sourceMappingURL=conversations.service.js.map