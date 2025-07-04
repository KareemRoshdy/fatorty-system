import { NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";
import NextAuth from "next-auth";

const { auth: middleware } = NextAuth(authConfig);

const authRoutes = ["/login"];
const protectedRoutes = ["/profile"];

export default middleware((req) => {
  const { nextUrl } = req;
  const path = nextUrl.pathname;

  const isUserLoggedIn: boolean = Boolean(req.auth);
  if (authRoutes.includes(path) && isUserLoggedIn) {
    return NextResponse.redirect(new URL("/profile", nextUrl));
  }

  if (protectedRoutes.includes(path) && !isUserLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
});

export const config = {
  matcher: ["/login", "/profile/:path*"],
};
