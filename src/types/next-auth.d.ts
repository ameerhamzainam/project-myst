// next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
  }
  interface Session {
    user: {
      _id?: string;
      username?: string;
    } & DefaultSession["user"];
  }
}

// THIS PART IS CRITICAL FOR THE TOKEN ERROR
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
  }
}
