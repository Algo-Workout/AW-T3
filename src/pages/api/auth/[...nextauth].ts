import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

// export default NextAuth({
//   callbacks: {
//     session({ session, token, user }) {
//       return session // The return type will match the one returned in `useSession()`
//     },
//   },
// });

export default NextAuth(authOptions);
