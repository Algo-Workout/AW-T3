import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import { getServerAuthSession } from '~/server/auth';
import type { GitHubUserData } from '~/types/github';

const CLIENT_ID: string = process.env.GITHUB_CLIENT_ID ?? "";
const CLIENT_SECRET: string = process.env.GITHUB_CLIENT_SECRET ?? "";

// Define the expected response structure
interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  userResponse: string;
  userData: string;
}

interface GithubRequestBody {
  code: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const authURL = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${CLIENT_ID}`;
    res.redirect(authURL);
  } else if (req.method === "POST") {
    const { code } = req.body as GithubRequestBody;

    try {
      // Exchange the authorization code for an access token
      const response = await axios.post<AccessTokenResponse>(
        "https://github.com/login/oauth/access_token",
        null,
        {
          params: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: 'http://localhost:3000/api/auth/callback/github'
          },
          headers: { Accept: "application/json" }
        },
      );
      
      // Access the access_token property safely
      const access_token: string = response.data.access_token;

      // Use the access token to fetch user data from GitHub API
      const userResponse = await axios.get<GitHubUserData>('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      // process user data as needed
      const userData: GitHubUserData = userResponse.data;

      // Now you have the access_token for making authentication requests
      // You can save this token in your database

      // create a session for the user
      const session = await getServerAuthSession({ req, res, userData });
      if (!session || !session.user) {
        res.status(401).json({ error: "Failed to authorize user" });
        return;
      }

      res.redirect("/");

    } catch (error) {
      console.error("Error obtaining access token: ", error);
      res.status(500).json({ error: "Failed to obtain access token" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}