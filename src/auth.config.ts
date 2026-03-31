import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/signIn", // Redirect unauthenticated users here
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isDashboard) {
        if (isLoggedIn) return true; // Allow access
        return false; // Redirect to /signIn
      }
      
      return true; // Allow access to other public pages (like /register)
    },
  },
  providers: [], // Empty array here, as we keep providers in auth.ts
} satisfies NextAuthConfig;