import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;
  try {
    const data = await request.json();

    // حذف المنتجات القديمة وإعادة ربط الجديدة
    await prisma.invoiceProduct.deleteMany({
      where: { invoiceId: invoiceId },
    });

    const invoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        date: data.date,
        totalPrice: data.totalPrice,
        userId: data.userId,
        invoiceProducts: {
          create: data.products.map((productId: string) => ({
            productId,
          })),
        },
      },
    });

    return NextResponse.json(invoice, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ PUT ~ error:", error);

    return NextResponse.json(
      { message: "حدث خطأ حاول مرة اخري" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ invoiceId: string }> }
) {
  const { invoiceId } = await params;
  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      return NextResponse.json(
        { message: "الفاتورة غير موجودة" },
        { status: 404 }
      );
    }

    await prisma.invoice.deleteMany({
      where: { id: invoiceId },
    });

    return NextResponse.json({ message: "تم حذف الفاتورةئ" }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error);

    return NextResponse.json(
      { message: "حدث خطأ حاول مرة اخري" },
      { status: 500 }
    );
  }
}
