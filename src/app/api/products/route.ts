import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const product = await prisma.product.findUnique({
      where: {
        name: data.name,
      },
    });

    if (product) {
      return NextResponse.json(
        { message: "المنتج موجود بالفعل" },
        { status: 400 }
      );
    }

    await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });

    return NextResponse.json(
      { message: "تم انشاء المنتج بنجاح" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);

    return NextResponse.json(
      { message: "حدث خطأ حاول مرة اخري" },
      { status: 500 }
    );
  }
}
