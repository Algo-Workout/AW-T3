import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma, PrismaClient} from "@prisma/client";
import type { BulletinBoard } from "@prisma/client";
const prisma = new PrismaClient();

type ResponseData = {
  userID: string,
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    try {
      const body = req.body as ResponseData;
      const inputText:string = body.message;
      const userID:string = body.userID || "";
      // Process the inputText as needed
      //const data = { userID: userID,message: inputText }; // Replace with your data

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
      const bulletinBoard:unknown = await prisma.bulletinBoard.create({
        data,
      });

    // console.log(`bulletinBoardCreate: ${bulletinBoard}`);

    res.status(200).json({ userID, message: inputText });


    } catch (error) {
      res.status(400).json({ userID: "", message: "Invalid request data" });
    }
  } else {
    res.status(405).json({ userID: "", message: "Method Not Allowed" });
  }
}





