import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import prisma from "./db";

import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt: async ({ token, user }) => {
      if (token?.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.username;
          token.role = dbUser.role;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token.sub) {
        session.user.id = token.sub;

        const user = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { invoices: true },
        });
        if (user) {
          session.user.role = user.role;
          session.user.name = user.username;
          session.user.invoices = user.invoices;
        }
      }

      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
