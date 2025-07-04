import { LoginSchema } from "@/validation/validationSchemas";
import type { NextAuthConfig } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import prisma from "./db";

export default {
  providers: [
    Credentials({
      authorize: async (data: Partial<Record<string, unknown>>) => {
        const validation = LoginSchema.safeParse(data);
        if (validation.success) {
          const { username, password } = validation.data;
          const user = await prisma.user.findFirst({ where: { username } });
          if (!user || !user.password) return null;

          const isPasswordMatch = password === user.password;
          if (isPasswordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
