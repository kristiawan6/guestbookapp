import { PrismaClient } from '../app/generated/prisma';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('password123', 12);
  const user = await prisma.user.create({
    data: {
      username: 'superadmin',
      email: 'superadmin@example.com',
      password,
      role: 'SuperAdmin',
    },
  });

  const event = await prisma.event.create({
    data: {
      name: 'BCA Economic Outlook 2025',
      description: 'A test event for the application',
      users: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  console.log({ user, event });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });