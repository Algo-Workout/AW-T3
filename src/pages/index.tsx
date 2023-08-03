import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { Login } from "./login";
import { Dashboard } from "./dashboard";

const Home: NextPage = () => {
  // Authenticate Session, otherwise render sign in link (currently DISCORD OAUTH)
  const { data: session } = useSession();

  if (!session) {
    // Handle unauthenticated state, e.g. render a SignIn component
    return (
        <Login />
    );
  }

  return (
      <Dashboard />
  );
};

export default Home;
