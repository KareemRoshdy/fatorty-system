import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: {
    userId: string;
  };
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "المستخدم غير موجود بالفعل" },
        { status: 404 }
      );
    }

    await prisma.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json({ message: "تم حذف المستخدم" }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ DELETE ~ error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, context: Props) {
  try {
    const { params } = context;
    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "المستخدم غير موجود بالفعل" },
        { status: 404 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        ...data,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
