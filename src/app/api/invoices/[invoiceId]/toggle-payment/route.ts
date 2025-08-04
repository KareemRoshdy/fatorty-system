import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { invoiceId: string } }
) {
  try {
    const { invoiceId } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
    });

    if (!invoice) {
      return NextResponse.json(
        { message: "الفاتورة غير موجودة" },
        { status: 404 }
      );
    }

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoiceId },
      data: {
        isPaid: !invoice.isPaid, // قلب الحالة
      },
    });

    return NextResponse.json(updatedInvoice, { status: 200 });
  } catch (error) {
    console.error("Toggle Payment Error:", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء تعديل حالة الدفع" },
      { status: 500 }
    );
  }
}
