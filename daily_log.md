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

## Nov 16th Code review:
- Removed these imports from the globals.css file:
```
@import '@radix-ui/colors/black-alpha.css';
@import '@radix-ui/colors/green.css';
@import '@radix-ui/colors/mauve.css';
@import '@radix-ui/colors/violet.css';
```

## Nov 30th
- Attempting to deploy. Received following error from build on vercel dashboard:
```
Failed to compile.
./src/components/GitHubAuthCheck.tsx:64:61
Type error: Property 'access_token' does not exist on type 'Session'.
  62 |   }
  63 | 
> 64 |   const hasUserEmailScope = useGitHubAuthCheck(sessionData?.access_token || "");
     |                                                             ^
  65 | 
  66 |   return (
  67 |     <div>
Error: Command "npm run build" exited with 1
```

- First edit was to change argument "sessionToken?" to  "sessionData?.access_token" within the useGitHubAuthCheck function
  
Next, we have two errors:
- **Error 1: React Hook "useGitHubAuthCheck" is called conditionally.**
  - The invocation of the **useGitHubtAuthCheck** function is conditional which makes it invalid.
  - To resolve, call the hook unconditionally in the top level of component, and then use the result conditionally.
The fix:
```
const GitHubAuthCheck: React.FC<GitHubAuthProps> = ({ session }) => {
  const { data: sessionData } = useSession();
  const accessToken = sessionData?.access_token || "";
  const hasUserEmailScope = useGitHubAuthCheck(accessToken);

  if (!session) {
    return <p className="text-white">Please log in with GitHub. TESTING</p>;
  }

  return (
    <div>
      <p>Hello, {session.user.name}!</p>
      {hasUserEmailScope ? (
        <p className="text-white">You have the user:email scope.</p>
      ) : (
        <p className="text-white">You don&apos;t have the user:email scope.</p>
      )}
    </div>
  );
};

```

- **Error 2: Unsafe argument of type any assigned to a parameter of type string.**
- Adding module client in api/auth/[...nextauth]
- [Docs](https://next-auth.js.org/getting-started/typescript)
- [Docs2](https://next-auth.js.org/getting-started/client)


## Monday December 4th.
- Removed the "?.access_token" property from the "type 'Session'" from `const hasUserEmailScope`. 
- It removed the error, but will have to see if it affects the deployment
- HookWebpackError: Unexpected '/'. Escaping special characters with \
  - [Docs](https://github.com/vercel/next.js/issues/50989) TL:DR; Soultion provided in canary update;

## Thursday Dec 7th:
- CUrrent error from terminal during build attempt:
```
error - Failed to load next.config.mjs, see more info here https://nextjs.org/docs/messages/next-config-error
> Build error occurred
Error: Invalid environment variables
    at file:///vercel/path0/src/env.mjs:79:11
    at ModuleJob.run (node:internal/modules/esm/module_job:194:25)
Error: Command "npm run build" exited with 1

```
- This could be due to a syntax error or attempting to require/import a module that wasn't available.
- `npm i postcss-flexbugs-fixes`
- `npm i postcss-preset-env`
- `npm i postcss-normalize`
- `npm i @fullhuman/postcss-purgecss`
- Error after installing all of these:
```
error - ./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[1].oneOf[13].use[1]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[1].oneOf[13].use[2]!./src/styles/globals.css
Error: Unexpected '/'. Escaping special characters with \ may help.
Import trace for requested module:
./node_modules/next/dist/build/webpack/loaders/css-loader/src/index.js??ruleSet[1].rules[1].oneOf[13].use[1]!./node_modules/next/dist/build/webpack/loaders/postcss-loader/src/index.js??ruleSet[1].rules[1].oneOf[13].use[2]!./src/styles/globals.css
./src/styles/globals.css
```
- Checked globals.css file. Found type at line 29: Missing forward slash to make the comment
```
* reset */ button,
fieldset,
input {
  all: unset;
}
```