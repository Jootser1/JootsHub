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
        const accessToken = this.jwtService.sign({ email: user.email, username: user.username }, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION });
        const refreshToken = this.jwtService.sign({ email: user.email, username: user.username }, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRATION });
        return { accessToken, refreshToken };
    }
    async register(email, password) {
        if (!password)
            throw new Error('Password is required');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username: '',
            },
        });
        const username = `Jooster${newUser.userNumber}`;
        return this.prisma.user.update({
            where: { id: newUser.id },
            data: { username },
        });
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('Login user', user);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { isOnline: true },
        });
        const tokens = this.generateTokens(user);
        return {
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
            user
        };
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
            const user = await this.prisma.user.findUnique({ where: { email: decoded.email } });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const tokens = this.generateTokens(user);
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map