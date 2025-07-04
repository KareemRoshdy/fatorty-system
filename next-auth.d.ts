import NextAuth, { type DefaultSession } from "next-auth";
import { Invoice, Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      name: string;
      invoices: Invoice[];
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    name?: string;
  }
}
