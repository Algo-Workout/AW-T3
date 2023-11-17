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

Oct 30th Win
Figured out the right file structure the api should be in.
Because we are using the pages style of Next js structuring vs the app folder.
I had to create an api folder with a file named posts.ts.
Then fetch the api with the path "/api/posts"
Converted it to typescript
Adjusted the fetch function and server response, so the latter console logs what is sent from the form.

Need to do next:
Create the bulletin post in the actual database from the front end

*/

## Wins for Halloween:
- GOT FRONTEND CONNECTED WITH BACKEND!!!
- Imported prisma client to post.ts file
- Note: Need to run```npx prisma generate``` everytime prisma client is imported into a new file

- Added prisma create code to insert into bulletinboard table
- converted it to type script
- Showed the data we inputed inside of the database

### Things to work on:
- Finish the Bulletin Board ( Break it down)
  - Create Add Post button when you login
  - Moving the form into logged in state in a modal
    - add modal window or seperate page with the form

  - Add the new form entries to the top of the div
  - on submit click of the form, data gets saved to database,
    - the form closes and the component refreshes
  ---
  Refinement
  Need getposts to send back an json array of posts
  Need to call getPosts from the front end and see if it returns json

- Kevin will work on the counter to have the db match the users we have

