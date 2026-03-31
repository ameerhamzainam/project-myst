// src/app/actions/login.ts
"use server";

import { signIn } from "@/auth";

export async function loginAction(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error: any) {
    // 1. Check if it's a redirect (This is NORMAL, don't treat as error)
    if (error.message === "NEXT_REDIRECT") {
      throw error; 
    }

    // 2. Extract the custom message we threw in auth.ts
    // In Auth.js v5, the custom error message is often nested 
    // inside error.cause.err.message or just error.message
    const errorMessage = error.cause?.err?.message || error.message;

    if (errorMessage) {
      // Clean up the error string if it contains "Read more at..."
      const cleanMessage = errorMessage.split(".")[0]; 
      return { error: cleanMessage || "Invalid credentials" };
    }

    return { error: "An unexpected error occurred" };
  }
}