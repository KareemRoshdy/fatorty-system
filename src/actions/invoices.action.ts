"use server";

import prisma from "@/lib/db";
import { InvoiceWithUser } from "@/types";

export const getAllInvoices = async (): Promise<InvoiceWithUser[]> => {
  try {
    const invoices = await prisma.invoice.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
            arabicName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return invoices;
  } catch (error) {
    return [];
  }
};
