import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface UserData {
  name: string;
  email: string;
  bulletinBoardPost?: {
    create: {
      description: string;
    };
  };
}

export async function createUser(data: UserData): Promise<User> {
  const user = await prisma.user.create({
    data,
  });

  return user;
}

export async function getAllUsers(): Promise<User[]> {
  const allUsers = await prisma.user.findMany();
  return allUsers;
}