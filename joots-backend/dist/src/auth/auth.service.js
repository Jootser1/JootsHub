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
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    generateTokens(user) {
        const accessToken = this.jwtService.sign({ userId: user.id, username: user.username }, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = this.jwtService.sign({ userId: user.id, username: user.username }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRATION });
        return { accessToken, refreshToken };
    }
    async register(email, password) {
        if (!password)
            throw new Error('Password is required');
        const hashedPassword = await bcrypt.hash(password, 10);
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
            const username = `Jooster${user.userNumber}`;
            return prisma.user.update({
                where: { id: user.id },
                data: { username },
            });
        });
        const tokens = this.generateTokens(result);
        await this.updateTokens(result.id, tokens);
        return result;
    }
    async login(email, password) {
        console.log(this.prisma);
        const auth = await this.prisma.auth.findUnique({
            where: { email },
            include: { user: true },
        });
        if (!auth) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, auth.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.prisma.user.update({
            where: { id: auth.userId },
            data: { isOnline: true },
        });
        const tokens = this.generateTokens(auth.user);
        await this.updateTokens(auth.userId, tokens);
        return {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            user: {
                ...auth.user,
                email: auth.email
            }
        };
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
            const auth = await this.prisma.auth.findUnique({
                where: { userId: decoded.userId },
                include: { user: true },
            });
            if (!auth) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const tokens = this.generateTokens(auth.user);
            await this.updateTokens(auth.userId, tokens);
            return {
                access_token: tokens.accessToken,
                refresh_token: tokens.refreshToken
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { isOnline: false },
        });
        return { message: 'User logged out successfully' };
    }
    async updateTokens(userId, tokens) {
        await this.prisma.auth.update({
            where: { userId },
            data: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map