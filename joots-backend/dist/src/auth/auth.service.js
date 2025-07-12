"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = __importStar(require("argon2"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(email, password) {
        if (!password)
            throw new Error('Password is required');
        const hashedPassword = await argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 5,
            parallelism: 1,
        });
        const result = await this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: {
                    username: '',
                    auth: {
                        create: {
                            email,
                            password: hashedPassword,
                        },
                    },
                },
            });
            const categories = await prisma.category.findMany({
                select: { category_id: true },
            });
            await prisma.userCategoryPreference.createMany({
                data: categories.map((category) => ({
                    user_id: user.user_id,
                    category_id: category.category_id,
                    enabled: true,
                })),
                skipDuplicates: true,
            });
            const username = `Jootser${user.user_number}`;
            return prisma.user.update({
                where: { user_id: user.user_id },
                data: { username },
            });
        });
        return result;
    }
    async login(email, password) {
        const auth = await this.prisma.auth.findUnique({
            where: { email },
            include: { user: true },
        });
        if (!auth) {
            console.log('Utilisateur non trouvé');
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await argon2.verify(auth.password, password);
        if (!passwordValid) {
            console.log('Mot de passe invalide');
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('[AuthService] Mise à jour du statut en ligne');
        await this.prisma.user.update({
            where: { user_id: auth.user_id },
            data: { last_seen: new Date() },
        });
        const payload = {
            sub: auth.user_id,
            email: auth.email,
            username: auth.user.username,
        };
        const access_token = this.jwtService.sign(payload);
        console.log('Access token:', access_token);
        return {
            user: {
                ...auth.user,
                email: auth.email,
            },
            access_token,
        };
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { user_id: userId },
            data: { last_seen: new Date() },
        });
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map