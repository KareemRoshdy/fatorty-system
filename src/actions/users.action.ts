"use server";

import prisma from "@/lib/db";
import { InvoiceWithProductItems, UserWithInvoices } from "@/types";

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
    console.error("Error getting all users:", error);
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
    console.error("Error getting user by id:", error);
    return null;
  }
};

export const getInvoiceNotPaid = async (
  userId: string
): Promise<InvoiceWithProductItems[] | null> => {
  try {
    const invoicesNotPaid = await prisma.invoice.findMany({
      where: {
        userId,
        isPaid: false,
      },
      include: {
        invoiceProducts: {
          include: {
            Product: true,
          },
        },
      },
    });

    return invoicesNotPaid;
  } catch (error) {
    console.error("Error getting unpaid invoices:", error);
    return null;
  }
};
