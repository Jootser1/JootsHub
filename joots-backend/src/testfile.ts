import * as bcrypt from 'bcrypt';

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
