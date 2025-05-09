"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IcebreakerModule = void 0;
const common_1 = require("@nestjs/common");
const icebreaker_service_1 = require("./icebreaker.service");
const icebreaker_controller_1 = require("./icebreaker.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const redis_module_1 = require("../redis/redis.module");
const redis_service_1 = require("../redis/redis.service");
const question_service_1 = require("../questions/question.service");
const gateways_module_1 = require("../gateways/gateways.module");
let IcebreakerModule = class IcebreakerModule {
};
exports.IcebreakerModule = IcebreakerModule;
exports.IcebreakerModule = IcebreakerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            (0, common_1.forwardRef)(() => gateways_module_1.GatewaysModule),
        ],
        controllers: [icebreaker_controller_1.IcebreakerController],
        providers: [icebreaker_service_1.IcebreakerService, redis_service_1.RedisService, question_service_1.QuestionService],
        exports: [icebreaker_service_1.IcebreakerService],
    })
], IcebreakerModule);
//# sourceMappingURL=icebreaker.module.js.map