import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ...write Prisma Client Queries here

  // create user 
  await prisma.user.create({
    data: {
      name: 'Standsups Gang77777',
      email: 'AW-T37777@wonderland.io',
      posts: {
        create: { title: 'Thursday777777' },
      },
      profile: {
        create: { bio: 'I like it REALLY spicy!!!!!77777' },
      },
    },
  })

  // reads data only
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  // The current depth option is not properly rendering all fields as intended
  console.log('All users in DB: ', JSON.stringify(allUsers));

  // // Log all fields
  // allUsers.forEach((user) => {
  //   console.log(`User: `, user);
  //   console.log(`Posts: `, user.posts);
  //   console.log(`Profile: `, user.profile);

  // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })