import type { DefaultSession } from 'next-auth';
import type { GitHubUserData } from './github';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      githubUserData?: GitHubUserData;
      id: string; // Import the type if needed
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }
}

export {};