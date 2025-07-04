"use server";

import prisma from "@/lib/db";
import { User } from "@prisma/client";

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};

// Get User By Id
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};
