import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUserCount (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const userCount = await prisma.user.count();
      res.status(200).json({ userCount });
    } catch (error) {
      res.status(500).json({ error: "Error fetching user count from back end" });
    }
  } else {
    res.status(405).end();
  }
}

export default getUserCount;