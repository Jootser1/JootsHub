"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.NODE_ENV === 'production'
            ? 'https://joots.app'
            : 'http://localhost:3000',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.enableShutdownHooks();
    await app.listen(process.env.PORT || 4000);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => console.error(err));
//# sourceMappingURL=main.js.map