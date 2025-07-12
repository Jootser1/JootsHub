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
exports.UserContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const logger_service_1 = require("../../logger/logger.service");
const redis_service_1 = require("../../redis/redis.service");
let UserContactsService = class UserContactsService {
    prisma;
    redis;
    logger = new logger_service_1.AppLogger();
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async getUserContacts(userId) {
        const contacts = await this.prisma.userContact.findMany({
            where: { user_id: userId },
            include: {
                contact: {
                    select: {
                        user_id: true,
                        username: true,
                        avatar: true,
                        last_seen: true,
                    },
                },
            },
        });
        this.logger.log(`[Contacts Service] ${userId} : ${contacts.length} contacts trouvés`);
        return contacts.map((contact) => ({
            contact: {
                user_id: contact.contact.user_id,
                username: contact.contact.username,
                avatar: contact.contact.avatar
            },
        }));
    }
    async getContactsIds(userId) {
        try {
            const contacts = await this.prisma.userContact.findMany({
                where: { user_id: userId },
                select: {
                    contact_id: true,
                },
            });
            if (contacts.length === 0) {
                return;
            }
            const contactsIds = contacts.map((contact) => contact.contact_id);
            return contactsIds;
        }
        catch (error) {
            this.logger.error(`[User Socket] ${userId} : Erreur lors de la récupération des contacts: ${error.message}`);
            return;
        }
    }
    async isUserContact(userId, contactId) {
        const contact = await this.prisma.userContact.findUnique({
            where: {
                user_id_contact_id: {
                    user_id: userId,
                    contact_id: contactId,
                },
            },
        });
        return !!contact;
    }
    async getOnlineContactsFromRedis(userId, contactsIds) {
        try {
            const onlineUsersIds = await this.redis.smembers('online_users');
            const onlineContactIds = contactsIds.filter((contactId) => onlineUsersIds.includes(contactId));
            if (onlineContactIds.length === 0) {
                return;
            }
            return onlineContactIds;
        }
        catch (error) {
            this.logger.error(`[User Socket] ${userId} : Erreur lors de la récupération des contacts en ligne: ${error.message}`);
            return;
        }
    }
    async addUserContactinBDD(userId, contactId) {
        const contactUser = await this.prisma.user.findUnique({
            where: { user_id: contactId },
        });
        if (!contactUser) {
            throw new Error("L'utilisateur à ajouter en contact n'existe pas");
        }
        if (userId === contactId) {
            throw new Error('Vous ne pouvez pas vous ajouter vous-même en contact');
        }
        const existingContact = await this.isUserContact(userId, contactId);
        if (existingContact) {
            return;
        }
        await this.prisma.userContact.create({
            data: {
                user_id: userId,
                contact_id: contactId,
            },
        });
    }
    async removeUserContact(userId, contactId) {
        await this.prisma.userContact.delete({
            where: {
                user_id_contact_id: {
                    user_id: userId,
                    contact_id: contactId,
                },
            },
        });
    }
};
exports.UserContactsService = UserContactsService;
exports.UserContactsService = UserContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, redis_service_1.RedisService])
], UserContactsService);
//# sourceMappingURL=contacts.service.js.map