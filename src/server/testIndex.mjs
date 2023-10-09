import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {

    // Create the User
  // ...write Prisma Client Queries here

  // create the User first
  const user = await prisma.user.create({
    data: {
      name: 'Victor He',
      email: 'AW-T3@VictorHe.io',
    },
  })

  // create the bulletinboard post
  const bulletinBoardPost = await prisma.bulletinBoard.create({
    data: {
      description: 'Testing Prisma BulletinBoard Post Creation',
      owner: {
        connect: { 
          id: user.id, // use the ID of the bulletin board post
        },
      },
    },
  });

  console.log('User created:', user);

  console.log('Bulletin Board Post created:', bulletinBoardPost);

  const allUsers = await prisma.user.findMany({
    include: {
      bulletinBoardPost:true
    },
  })
  console.dir(allUsers,{depth:null})
  console.log('All users in DB: ', JSON.stringify(allUsers));

} catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}


main();
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })




    // reads data only
  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     posts: true,
  //     profile: true,
  //   },
  // })
  // // The current depth option is not properly rendering all fields as intended

    // // Log all fields
  // allUsers.forEach((user) => {
  //   console.log(`User: `, user);
  //   console.log(`Posts: `, user.posts);
  //   console.log(`Profile: `, user.profile);

  // })


// Wins
//We established our first schema and corrected lingering errors
//We were able to see the bulletinboard table in the database
//We are getting close to entering actual data
// Prisma studio is up and running and we can see the custom tables we've created in the schema


// Things to research or think about for tomorrow:
// Errors with the "binary data format"
// Leads:
  // Clearing out pre exisiting data in the database, since the tables don't correlate with the new schema
  // Adding data in two different tables using Prisma that have relational fields with each other 
  