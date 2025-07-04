import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (user) {
      return NextResponse.json(
        { message: "المستخدم موجود بالفعل" },
        { status: 400 }
      );
    }

    await prisma.user.create({
      data: {
        username: data.username,
        arabicName: data.arabicUsername,
        password: data.password,
        role: data.isAdmin,
      },
    });

    return NextResponse.json(
      { message: "تم انشاء المستخدم بنجاح" },
      { status: 201 }
    );
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
