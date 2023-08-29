import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import axios from "axios";

interface ApiResponseHeaders {
  [header: string]: string | string[] | undefined;
}

interface GitHubAuthProps {
  session: Session | null;
}

interface AccessTokenResponse {
  access_token: string;
}

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
  //   (async () => {
  //     await checkScopes(accessToken);
  //   });
  // }, [accessToken]);

    const fetchScopes = async () => {
      const result = await checkScopes(accessToken);
      setHasUserEmailScope(result);
    };

    fetchScopes();
  }, [accessToken]);

  return hasUserEmailScope;
};


const GitHubAuthCheck: React.FC<GitHubAuthProps> = ({ session }) => {
  const { data: sessionData } = useSession();

  if (!session) {
    return <p className="text-white">Please log in with GitHub. TESTING</p>;
  }

  const hasUserEmailScope = useGitHubAuthCheck(sessionData?.access_token || "");

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