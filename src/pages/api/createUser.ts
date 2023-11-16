import type { NextApiRequest, NextApiResponse } from 'next';
import type { UserData } from '../../server/controllers/userController';
import { createUser } from '../../server/controllers/userController';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (isValidUserData(req.body)) {

      const userData: UserData = req.body;
      const user = await createUser(userData);
      res.status(201).json({ user });
    } else {
      
      res.status(400).json({ error: 'Invalid requst body structure. Inside createUser.ts' });
    }
      
  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal Server Error, inside createUser.ts' });
  }
}


// included eslint disables on warnings for the "unsafe assignment of any" for both of these functions
function isValidUserData(data: any): data is UserData {
  if (typeof data === 'object' && data !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, email, bulletinBoardPost } = data;
    return typeof name === 'string' && typeof email === 'string' && (bulletinBoardPost === undefined || isValidBulletinBoardPost(bulletinBoardPost));
  }
  return false;
}

function isValidBulletinBoardPost(post: any): post is UserData['bulletinBoardPost'] {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return typeof post === 'object' && post !== null && typeof post.description === 'string';
}