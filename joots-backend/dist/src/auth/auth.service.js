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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const argon2 = require("argon2");
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
                select: { id: true },
            });
            await prisma.userQuestionPreference.createMany({
                data: categories.map((category) => ({
                    userId: user.id,
                    categoryId: category.id,
                    enabled: true,
                })),
                skipDuplicates: true,
            });
            const username = `Jootser${user.userNumber}`;
            return prisma.user.update({
                where: { id: user.id },
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
            where: { id: auth.userId },
            data: { isOnline: true },
        });
        const payload = {
            sub: auth.userId,
            email: auth.email,
            username: auth.user.username
        };
        const access_token = this.jwtService.sign(payload);
        return {
            user: {
                ...auth.user,
                email: auth.email
            },
            access_token
        };
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { isOnline: false },
        });
        return { message: 'Logged out successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map