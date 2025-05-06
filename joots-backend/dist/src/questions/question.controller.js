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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let QuestionController = class QuestionController {
    questionService;
    constructor(questionService) {
        this.questionService = questionService;
    }
    async getQuestionGroup(id) {
        return this.questionService.getQuestionGroup(id);
    }
    async getNextRandomQuestionGroup(userId1, userId2) {
        return this.questionService.getNextRandomQuestionGroup(userId1, userId2);
    }
    async postResponseToQuestion(body) {
        const { userId, questionGroupId, optionId, conversationId } = body;
        if (!userId || !questionGroupId || !optionId || !conversationId) {
            throw new Error('Les paramètres userId, questionGroupId, optionId et conversationId sont requis');
        }
        return this.questionService.saveResponse(userId, questionGroupId, optionId, conversationId);
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.Get)('by-id/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getQuestionGroup", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('random'),
    __param(0, (0, common_1.Query)('userId1')),
    __param(1, (0, common_1.Query)('userId2')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "getNextRandomQuestionGroup", null);
__decorate([
    (0, common_1.Post)('response'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "postResponseToQuestion", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map