"use server";
// done
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { LoginSchema } from "@/validation/validationSchemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (data: z.infer<typeof LoginSchema>) => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid credentials" };
  }

  const { username, password } = validation.data;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user || !user.username || !user.password) {
      return { success: false, message: "البيانات غير صالحة" };
    }

    await signIn("credentials", { username, password, redirectTo: "/profile" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            message: "اسم المستخدم أو كلمة المرور غير صالحة",
          };
        default:
          return { success: false, message: "Something went wrong" };
      }
    }

    throw error;
  }

  return { success: true, message: "تم تسجيل الدخول بنجاح" };
};

export const logoutAction = async (): Promise<void> => {
  await signOut();
};
