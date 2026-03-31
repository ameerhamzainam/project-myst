import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // This Matcher is CRITICAL. It tells Next.js which routes to run the check on.
  // We exclude static files, images, and the favicon.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};