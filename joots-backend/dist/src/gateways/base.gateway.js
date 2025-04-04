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
exports.BaseGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
class BaseGateway {
    server;
    logger;
    constructor(name) {
        this.logger = new common_1.Logger(name);
    }
    afterInit(server) {
        server.use(async (socket, next) => {
            try {
                const token = socket.handshake.auth.token;
                const userId = socket.handshake.auth.userId;
                if (!token || !userId) {
                    return next(new Error('Authentification requise'));
                }
                const validUserId = this.extractUserIdFromToken(token);
                if (!validUserId || validUserId !== userId) {
                    return next(new Error('Token invalide'));
                }
                socket.data.userId = userId;
                next();
            }
            catch (error) {
                next(new Error('Erreur d\'authentification'));
            }
        });
    }
    extractUserIdFromToken(token) {
        try {
            const tokenParts = token.split('.');
            if (tokenParts.length !== 3)
                return null;
            const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString());
            return payload.sub;
        }
        catch (error) {
            return null;
        }
    }
}
exports.BaseGateway = BaseGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], BaseGateway.prototype, "server", void 0);
//# sourceMappingURL=base.gateway.js.map