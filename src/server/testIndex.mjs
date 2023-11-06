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
//Thursday,0ct12th:
// We learned we need to open a seperate terminal window to run npx prisma studio
// We got prisma studio setup on Dwayne's computer
// Fixed the schema by removing question mark so the fields were optional

// Things to research or think about for tomorrow:
// Errors with the "binary data format"
// Leads:
// Clearing out pre exisiting data in the database, since the tables don't correlate with the new schema
// Adding data in two different tables using Prisma that have relational fields with each other

// Oct 19th
//Created the front end component and made the form have react state
// broke down the differences in using Prisma and not using Prisma for an ORM
// Next steps to research
//pass the data via fetch to the Bulleting board function in the testIndex component
// Complete tasks from front end to back end.

// Export the query and implemenet to a front end component
// Make a test area testIndex

/* Oct 20th Wins:
Within testIndexfile:
-Created defaulttest userID
Createdaspecific functionto createbulletinposts
Assigned all test bulletin posts to the default user ID (temperoary)

Within TestFieldInput file:
 Updated the handle button click functionality
Created a fetch function to invoke the createBulletinPost function
Created detailed error handling


Need to do next:
Update the fetch path to properly handle the POST request to create the bulletin post from the front end
*/
