"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewaysModule = void 0;
const common_1 = require("@nestjs/common");
const user_gateway_1 = require("./user.gateway");
const chat_gateway_1 = require("./chat.gateway");
const prisma_service_1 = require("../../prisma/prisma.service");
const redis_module_1 = require("../redis/redis.module");
const redis_service_1 = require("../redis/redis.service");
const heartbeat_service_1 = require("./services/heartbeat.service");
const contacts_service_1 = require("../users/contacts/contacts.service");
const question_service_1 = require("../questions/question.service");
const icebreaker_service_1 = require("../icebreakers/icebreaker.service");
let GatewaysModule = class GatewaysModule {
};
exports.GatewaysModule = GatewaysModule;
exports.GatewaysModule = GatewaysModule = __decorate([
    (0, common_1.Module)({
        imports: [redis_module_1.RedisModule],
        providers: [
            user_gateway_1.UserGateway,
            chat_gateway_1.ChatGateway,
            prisma_service_1.PrismaService,
            redis_service_1.RedisService,
            heartbeat_service_1.HeartbeatService,
            contacts_service_1.UserContactsService,
            question_service_1.QuestionService,
            icebreaker_service_1.IcebreakerService
        ],
        exports: [user_gateway_1.UserGateway, chat_gateway_1.ChatGateway],
    })
], GatewaysModule);
//# sourceMappingURL=gateways.module.js.map