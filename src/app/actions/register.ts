"use server"
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function registerUser(prevState: any,formData: FormData) {
  await dbConnect();

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({
    email,
    username,
    password: hashedPassword,
    isVerified: true, // We still want this true for testing
    
    // ADD THESE TWO LINES TO SATISFY YOUR SCHEMA:
    verifyCode: "000000", 
    verifyCodeExpiry: new Date(Date.now() + 3600000), // Expiry 1 hour from now
  });

  try {
    await newUser.save();
    return { success: "User created! Now go to /signIn" };
  } catch (error: any) {
    console.error("Save Error:", error);
    return { error: "Failed to save user." };
  }
}