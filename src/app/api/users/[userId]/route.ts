import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

interface Props {
  params: Promise<{
    userId: string;
  }>;
}

export async function DELETE(_: NextRequest, { params }: Props) {
  const { userId } = await params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
        id: userId,
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

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const { userId } = await params;
    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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
        id: userId,
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
