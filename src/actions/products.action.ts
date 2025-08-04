"use server";

import prisma from "@/lib/db";
import { Product } from "@prisma/client";

// Get All Products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch {
    return [];
  }
};

// Get Product By Id
export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) return null;

    return product;
  } catch {
    return null;
  }
};
