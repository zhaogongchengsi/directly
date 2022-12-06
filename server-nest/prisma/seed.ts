import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: { account: '12345678901' },
    update: {},
    create: {
      email: 'zzhhaon@163.com',
      name: 'admin',
      account: 'admin',
      // md5(md5(abc12345))
      password: 'e8f9ad8e2b9e76699f8a6cd2e468ec93',
      phone: '12345678901',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
