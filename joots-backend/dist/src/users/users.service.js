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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUsers() {
        return this.prisma.user.findMany();
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: { auth: true }
        });
        console.log('findById user:', user);
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return user;
    }
    async getUsersCount() {
        return this.prisma.user.count();
    }
    async getOnlineUsers() {
        return this.prisma.user.findMany({
            where: { isOnline: true },
            select: { id: true, username: true },
        });
    }
    async updateChatPreference(userId, isAvailableForChat) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { isAvailableForChat },
        });
        if (!user) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return user;
    }
    async getRandomAvailableUser(currentUserId) {
        const existingConversations = await this.prisma.conversation.findMany({
            where: {
                OR: [
                    { initiatorId: currentUserId },
                    { receiverId: currentUserId }
                ]
            },
            select: {
                initiatorId: true,
                receiverId: true
            }
        });
        const existingUserIds = new Set(existingConversations.flatMap(conv => [conv.initiatorId, conv.receiverId]));
        const availableUsers = await this.prisma.user.findMany({
            where: {
                AND: [
                    { isOnline: true },
                    { isAvailableForChat: true },
                    { id: { not: currentUserId } },
                    { id: { notIn: Array.from(existingUserIds) } }
                ]
            },
            select: {
                id: true,
                username: true,
                avatar: true
            }
        });
        if (availableUsers.length === 0) {
            throw new common_1.NotFoundException('Aucun utilisateur disponible pour le chat');
        }
        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        return availableUsers[randomIndex];
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map