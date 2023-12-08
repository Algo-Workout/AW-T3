import type { NextPage } from "next";
import { useSession } from "next-auth/react";

const User: NextPage = () => {
  const { data: session } = useSession();

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return (<p><a href='https://discord.com/api/oauth2/authorize?client_id=1092281094591750175&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback%2Fdiscord&response_type=code&scope=identify%20email'>SIGN IN</a></p>);
  }

  return <p>Welcome {session.user.name}!</p>;
};

export default User;