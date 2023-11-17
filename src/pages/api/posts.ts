import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient} from "@prisma/client";
import type { BulletinBoard } from "@prisma/client";
const prisma = new PrismaClient();

type ResponseData = {
  userID: string,
  message: string;
};

type BulletinBoardData = {
  // Define the properties of a single row from the bulletinBoard table
  id: string;
  description: string;
  // ... add other properties based on your schema
};

type BulletinBoardArray = {
  allRows: BulletinBoardData[];
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | BulletinBoardArray>
) {
  if (req.method === "POST") {
    try {
      const body = req.body as ResponseData;
      const inputText:string = body.message;
      const userID:string = body.userID || "";

      // create the bulletinboard post
      const data: Prisma.BulletinBoardCreateInput = {
        description: inputText,
        owner: {
          connect: {
            id: userID, // use the ID of the bulletin board post
          },
        },
      };

      // Create the bulletin board post
      const bulletinBoard:BulletinBoardData = await prisma.bulletinBoard.create({
        data,
      });

   // console.log(`bulletinBoardCreate: ${bulletinBoard}`);
console.log(inputText)
     res.status(200).json({ userID, message: inputText });

    } catch (error) {

      res.status(400).json({ userID: "", message: "Invalid request data" });
    }
  } else if (req.method === "GET") {
    try {
      const allRows:BulletinBoardData[] = await prisma.bulletinBoard.findMany();

      res.status(200).json({ allRows });
    }
    catch (error) {
      console.error('Error fetching all rows:', error);
      res.status(500).json({ allRows: [] });
    }
    finally {
      await prisma.$disconnect();
    }
  }
  else {
    res.status(405).json({ userID: "", message: "Method Not Allowed" });
  }
}





