"use server";

import prisma from "@/lib/db";
import { UserWithInvoices } from "@/types";
import { User } from "@prisma/client";

export const getAllUsers = async (): Promise<UserWithInvoices[]> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        invoices: true,
      },
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
export const getUserById = async (
  userId: string
): Promise<UserWithInvoices | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        invoices: true,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    return null;
  }
};
