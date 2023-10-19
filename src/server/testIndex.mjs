import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

    // Create the User
  // ...write Prisma Client Queries here

  // create the User first
  const user = await prisma.user.create({
    data: {
      name: 'Victor He',
    email: 'AW-T3Oct17@VictorHe.io',
    bulletinBoardPost: {
      create: {
        description: 'Testing Prisma BulletinBoard Post Creation Inline' 
      }
    }
  }
    
  })

  //create the bulletinboard post
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

  const allUsers = await prisma.user.findMany()
  console.dir(allUsers)
  // console.log('All users in DB: ', JSON.stringify(allUsers));

// } catch (error) {
//     console.error('Error in testIndex. Failed check within the main function:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
}


//main();
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })




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

//Thursday,0ct12th:
// We learned we need to open a seperate terminal window to run npx prisma studio
// We got prisma studio setup on Dwayne's computer
// Fixed the schema by removing question mark so the fields were optional
// Needed to run prisma studio in a separate terminal and then run the node file in a separate terminal to test the write queries. 
  

// Thursday, 0ct 12th:
// Got this error when running command: npx ts-node testIndex.mjs
/*
➜  server git:(5/Dwayne_PrismaDiscovery) ✗ npx ts-node testIndex.mjs          
Error: PrismaClientUnknownRequestError: 
Invalid `prisma.user.create()` invocation:


Error occurred during query execution:
ConnectorError(ConnectorError { user_facing_error: None, kind: QueryError(Error { kind: Db, cause: Some(DbError { severity: "ERROR", parsed_severity: Some(Error), code: SqlState(E22P03), message: "incorrect binary data format in bind parameter 1", detail: None, hint: None, position: None, where_: None, schema: None, table: None, column: None, datatype: None, constraint: None, file: Some("postgres.c"), line: Some(1901), routine: Some("exec_bind_message") }) }), transient: false })
    at Zr.handleRequestError (/Users/dwayneneckles/Dropbox/_Code/AW-T3/node_modules/@prisma/client/runtime/library.js:171:6587)
    at Zr.handleAndLogRequestError (/Users/dwayneneckles/Dropbox/_Code/AW-T3/node_modules/@prisma/client/runtime/library.js:171:5948)
    at Zr.request (/Users/dwayneneckles/Dropbox/_Code/AW-T3/node_modules/@prisma/client/runtime/library.js:171:5786)
    at async t._request (/Users/dwayneneckles/Dropbox/_Code/AW-T3/node_modules/@prisma/client/runtime/library.js:174:10455)
    at async main (file:///Users/dwayneneckles/Dropbox/_Code/AW-T3/src/server/testIndex.mjs:12:16) {
  clientVersion: '4.11.0'
}

Wins Tuesday Oct. 17th:
- Chain of command to update schema from the schema.prisma file:

# After every change in prisma.schema
# run this command to push the schema state to the database. 
# only use for cloud dbs 
npx prisma db push 
# Run this command to manually insert the new data into the database
npx ts-node src/server/testIndex.mjs

# Browse your results of your data insertion
npx prisma studio

Challenges to look forward to:
- Write more queries in the testIndex.mjs file
- Import the queries to the front end
- Test queries by connecting the front end inputs, to the database
- Create an input field for the bulletinBoard on the front end and see if we can add bulletin posts to the database
- Render the new bulletinBoard posts from the database on the front end



*/