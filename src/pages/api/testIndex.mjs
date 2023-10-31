import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ...write Prisma Client Queries here

  // create the User first
  const user = await prisma.user.create({
    data: {
      name: "What's Goin On. it's Friday Oct 20th",
      email: "Hustlin-2.0'@Everyday.io",
      bulletinBoardPost: {
        create: {
          description: "Making default test user",
        },
      },
    },
  });

  // Create defaulttestuser
  const defaultTestUser = await prisma.user.create({
    data: {
      name: "Default Test User",
      email: "DefaultTestUser@Testing.com",
    },
  });

  //create the bulletinboard post
  // const bulletinBoardPost = await prisma.bulletinBoard.create({
  //   data: {
  //     description: "Testing Prisma BulletinBoard Post Creation Thursday ",
  //     owner: {
  //       connect: {
  //         id: user.id, // use the ID of the bulletin board post
  //       },
  //     },
  //   },
  // });

  console.log("User created:", user);
  console.log("Test created:", defaultTestUser);

  //console.log("Bulletin Board Post created:", bulletinBoardPost);

  const allUsers = await prisma.user.findMany();
  console.dir(allUsers);
  // console.log('All users in DB: ', JSON.stringify(allUsers));

  // } catch (error) {
  //     console.error('Error in testIndex. Failed check within the main function:', error);
  //   } finally {
  //     await prisma.$disconnect();
  //   }
}

//Commentingout the main function now to test exporting thebulletinPostfunction

//main();
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// reads data only
// const allUsers = await prisma.user.findMany({
//   include: {
//     posts: true,
//     profile: true,
//   },
// })

// Start of BulletinPost Function


// // The current depth option is not properly rendering all fields as intended

// // Log all fields
// allUsers.forEach((user) => {
//   console.log(`User: `, user);
//   console.log(`Posts: `, user.posts);
//   console.log(`Profile: `, user.profile);

// })

