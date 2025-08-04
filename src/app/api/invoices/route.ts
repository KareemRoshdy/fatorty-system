import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const invoice = await prisma.invoice.create({
      data: {
        date: data.date,
        isPaid: false,
        totalPrice: data.totalPrice,
        userId: data.userId, // لو فيه
        invoiceProducts: {
          create: data.products.map((productId: string) => ({
            productId, // ✅ صح
          })),
        },
      },
    });

    return NextResponse.json({ message: "تم إنشاء الفاتورة", invoice });
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);

    return NextResponse.json(
      { message: "حدث خطأ حاول مرة اخري" },
      { status: 500 }
    );
  }
}
