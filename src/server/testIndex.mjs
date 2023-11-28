import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ...write Prisma Client Queries here

  // create the User first
  const user = await prisma.user.create({
    data: {
      name: "",
      email: "",
      bulletinBoardPost: {
        create: {
          description: "",
        },
      },
    },
  });

  // Create defaulttestuser to assign all test bulletin board posts to
  const defaultTestUser = await prisma.user.create({
    data: {
      name: "Default Test User",
      email: "DefaultTestUser@Testing.com",
    },
  });

  console.log("User created:", user);
  console.log("Test created:", defaultTestUser);

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers);
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
