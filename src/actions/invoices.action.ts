"use server";

import prisma from "@/lib/db";
import {
  InvoiceWithProducts,
  InvoiceWithUser,
  UserWithInvoicesAndProductDetails,
} from "@/types";

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
  } catch {
    return [];
  }
};

export const getInvoiceById = async (
  invoiceId: string
): Promise<InvoiceWithProducts | null> => {
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        invoiceProducts: true,
        user: {
          select: {
            id: true,
            username: true,
            arabicName: true,
          },
        },
      },
    });

    return invoice;
  } catch {
    return null;
  }
};

export const getInvoicesByUserId = async (
  userId: string
): Promise<UserWithInvoicesAndProductDetails | null> => {
  try {
    const invoices = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        invoices: {
          include: {
            invoiceProducts: {
              include: {
                Product: true, // لو عايز بيانات المنتج
              },
            },
          },
        },
      },
    });

    return invoices;
  } catch (error) {
    return null;
  }
};

export const markInvoicesAsPaid = async (invoiceIds: string[]) => {
  try {
    const updated = await prisma.invoice.updateMany({
      where: {
        id: { in: invoiceIds },
      },
      data: {
        isPaid: true,
      },
    });

    return updated;
  } catch (error) {
    console.error("حدث خطأ أثناء تحديث الفواتير:", error);
    throw error;
  }
};
