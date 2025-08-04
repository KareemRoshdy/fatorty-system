import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const { productId } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "المنتج غير موجود بالفعل" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return NextResponse.json({ message: "تم حذف المنتج" }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error);

    return NextResponse.json(
      { message: "حدث خطأ حاول مرة اخري" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { productId } = await params;
    const data = await request.json();

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "المنتج غير موجود بالفعل" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);

    return NextResponse.json(
      { message: "حدث خطأ حاول مرة اخري" },
      { status: 500 }
    );
  }
}
