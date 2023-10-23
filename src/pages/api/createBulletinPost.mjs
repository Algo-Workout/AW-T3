import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function createBulletinPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { description } = req.body;

    try {
      const bulletinBoardPost = await prisma.bulletinBoard.create({
        data: {
          description,
          owner: {
            connect: {
              id: defaultTestUser.id,
            },
          },
        },
      });

      res.status(201).json(bulletinBoardPost);
    } catch (error) {
      res.status(500).json({
        error: "Unable to create bulletin board post. Error in testIndex.mjs",
      });
    }
  } else {
    res.status(405).end();
  }
}