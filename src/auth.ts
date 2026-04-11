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
              { email: credentials.identifier },
              { username: credentials.identifier }
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
  callbacks: {
    async jwt({ token, user }) {
      // Pass the user ID from the authorize function into the JWT token
      if (user) {
        token._id = user.id?.toString();
        token.username = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass the ID from the token into the session object
      if (token) {
        session.user._id = token._id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
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