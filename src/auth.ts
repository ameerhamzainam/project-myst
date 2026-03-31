import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import dbConnect from "./lib/dbConnect";
import UserModel from "./model/User";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: {},
        username: {},
        password: {}
      },
      authorize: async (credentials: any): Promise<any> => {
        await dbConnect()
        try {
          // 1. Find User
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.email },
              { username: credentials.username }
            ]
          })

          if (!user) {
            throw new Error('No user found with this email/username');
          }

          // 2. Check Verification Status
          if (!user.isVerified) {
            throw new Error('Please verify your account first');
          }

          // 3. Compare Password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string, 
            user.password
          );

          if (isPasswordCorrect) {
            // Return only what you need in the session
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.username,
            };
          } else {
            throw new Error('Incorrect Password');
          }
        } catch (err: any) {
          // Throwing the message directly is better for the Auth.js callback
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],
  // --- MISSING PART 1: SESSION STRATEGY ---
  session: {
    strategy: "jwt", 
  },
  // --- MISSING PART 2: SECRET ---
  // Ensure this is in your .env file as AUTH_SECRET
  secret: process.env.AUTH_SECRET, 
  
  pages: {
    signIn: "/signIn", // Points to your custom login page
  }
})