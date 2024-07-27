import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import axios from "axios";

interface ApiResponseHeaders {
  [header: string]: string | string[] | undefined;
}

interface GitHubAuthProps {
  session: Session;
}

interface AccessTokenResponse {
  access_token: string;
}

// interface Session extends NextAuthSession {
//   access_token?: string;
// }

// custom hook
const useGitHubAuthCheck = (accessToken: string) => {
  const [hasUserEmailScope, setHasUserEmailScope] = useState(false);

  const checkScopes = async (token: string) => {
    try {
      const response = await axios.get<AccessTokenResponse>("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      
      const responseHeaders = response.headers as ApiResponseHeaders;
      const grantedScopes = responseHeaders["x-oauth-scopes"];
      return grantedScopes ? grantedScopes.includes("user:email") : false;
    } catch (error) {
      console.error("Error fetching user: ", error);
      return false;
    }
  };

  useEffect(() => {

    const fetchScopes = async () => {
      const result = await checkScopes(accessToken);
      setHasUserEmailScope(result);
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchScopes();
  }, [accessToken]);

  return hasUserEmailScope;
};


const GitHubAuthCheck: React.FC<GitHubAuthProps> = ({ session }) => {
  const { data: sessionData } = useSession();
  const accessToken = (sessionData || "") as string;
  const hasUserEmailScope = useGitHubAuthCheck(accessToken);

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

export default GitHubAuthCheck;