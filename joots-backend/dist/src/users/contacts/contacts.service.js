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
exports.UserContactsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let UserContactsService = class UserContactsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserContacts(userId) {
        const contacts = await this.prisma.userContact.findMany({
            where: { userId },
            include: {
                contact: {
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                        isOnline: true
                    }
                }
            }
        });
        console.log(`[Contacts Service] ${userId} : ${contacts.length} contacts trouvés`);
        if (contacts.length === 0) {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            });
            console.log(`L'utilisateur ${userId} existe-t-il?`, !!user);
        }
        return contacts.map(contact => ({
            contact: {
                id: contact.contact.id,
                username: contact.contact.username,
                avatar: contact.contact.avatar,
                isOnline: contact.contact.isOnline
            }
        }));
    }
    async isUserContact(userId, contactId) {
        const contact = await this.prisma.userContact.findUnique({
            where: {
                userId_contactId: {
                    userId,
                    contactId
                }
            }
        });
        return !!contact;
    }
    async addUserContact(userId, contactId) {
        const contactUser = await this.prisma.user.findUnique({
            where: { id: contactId }
        });
        if (!contactUser) {
            throw new Error('L\'utilisateur à ajouter en contact n\'existe pas');
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
                userId,
                contactId
            }
        });
    }
    async removeUserContact(userId, contactId) {
        await this.prisma.userContact.delete({
            where: {
                userId_contactId: {
                    userId,
                    contactId
                }
            }
        });
    }
};
exports.UserContactsService = UserContactsService;
exports.UserContactsService = UserContactsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserContactsService);
//# sourceMappingURL=contacts.service.js.map