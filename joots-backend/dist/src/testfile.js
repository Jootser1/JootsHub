"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
async function testBcrypt() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('mypassword', salt);
    console.log('Hashed Password:', hashedPassword);
}
(async () => {
    await testBcrypt();
})().catch((error) => {
    console.error('Error:', error);
});
//# sourceMappingURL=testfile.js.map