import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";

const CLIENT_ID: string = process.env.GITHUB_CLIENT_ID ?? "";
const CLIENT_SECRET: string = process.env.GITHUB_CLIENT_SECRET ?? "";

// Define the expected response structure
interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const authURL = `https://github.com/login/oauth/authorize?scope=user:email&client_id=${CLIENT_ID}`;
    res.redirect(authURL);
  } else if (req.method === "POST") {
    const { code } = req.query;

    try {
      console.log(`test: client_id: ${CLIENT_ID}`)
      console.log(`test: client_secret: ${CLIENT_SECRET}`)

      const response = await axios.post<AccessTokenResponse>(
        "https://github.com/login/oauth/access_token",
        {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        },
        { headers: { Accept: "application/json" } }
      );
      
      // Access the access_token property safely
      const access_token: string = response.data.access_token;

      // Now you have the access_token for making authentication requests
      // You can save this token in your database
      res.status(200).json({ access_token });
    } catch (error) {
      console.error("Error obtaining access token: ", error);
      res.status(500).json({ error: "Failed to obtain access token" });
    }
  } else {
    res.status(405).end(); // Method not allowed
  }
}