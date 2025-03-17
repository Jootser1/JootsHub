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
exports.IcebreakerGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const redis_1 = require("redis");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let IcebreakerGateway = class IcebreakerGateway {
    server;
    redisClient = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
    async handleConnection(client) {
        await this.redisClient.connect();
        try {
            const { token } = client.handshake.auth;
            if (!token)
                throw new Error("Token manquant");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.pseudo;
            console.log("username dans icebreaker gateway", username);
            await this.redisClient.sAdd("online_users", username);
            await this.redisClient.expire("online_users", 600);
            this.server.emit("user_connected", username);
            const users = await this.redisClient.sMembers("online_users");
            client.emit("users_connected", users);
        }
        catch (error) {
            client.disconnect();
        }
    }
    async handleDisconnect(client) {
        try {
            const { token } = client.handshake.auth;
            if (!token)
                throw new Error("Token manquant");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.pseudo;
            await this.redisClient.sRem("online_users", username);
            this.server.emit("user_disconnected", username);
        }
        catch (error) {
            client.disconnect();
        }
    }
};
exports.IcebreakerGateway = IcebreakerGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], IcebreakerGateway.prototype, "server", void 0);
exports.IcebreakerGateway = IcebreakerGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: "*" } }),
    (0, common_1.Injectable)()
], IcebreakerGateway);
//# sourceMappingURL=icebreaker.gateway.js.map