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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContactsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const contacts_service_1 = require("./contacts.service");
let UserContactsController = class UserContactsController {
    userContactsService;
    constructor(userContactsService) {
        this.userContactsService = userContactsService;
    }
    async getContacts(req) {
        try {
            const userId = req.user.id;
            const contacts = await this.userContactsService.getUserContacts(userId);
            return contacts;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async addContact(req, body) {
        try {
            const userId = req.user.id;
            const { contactId } = body;
            if (!contactId) {
                throw new common_1.BadRequestException('contactId est requis');
            }
            await this.userContactsService.addUserContact(userId, contactId);
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async removeContact(req, contactId) {
        try {
            const userId = req.user.id;
            const isContact = await this.userContactsService.isUserContact(userId, contactId);
            if (!isContact) {
                throw new common_1.NotFoundException('Contact non trouvé');
            }
            await this.userContactsService.removeUserContact(userId, contactId);
            return { success: true };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkContact(req, contactId) {
        const userId = req.user.id;
        const isContact = await this.userContactsService.isUserContact(userId, contactId);
        return { isContact };
    }
};
exports.UserContactsController = UserContactsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserContactsController.prototype, "getContacts", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserContactsController.prototype, "addContact", null);
__decorate([
    (0, common_1.Delete)(':contactId'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('contactId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserContactsController.prototype, "removeContact", null);
__decorate([
    (0, common_1.Get)(':contactId/check'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('contactId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserContactsController.prototype, "checkContact", null);
exports.UserContactsController = UserContactsController = __decorate([
    (0, common_1.Controller)('users/contacts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [contacts_service_1.UserContactsService])
], UserContactsController);
//# sourceMappingURL=contacts.controller.js.map