"use client";

import React, { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import { registerUser } from "@/app/actions/register";

// Using a distinct icon to differentiate it from your Sign In page
// Make sure this file exists, or use a default like https://ui-avatars.com/api/?name=R
import RegisterIcon from "../../../assets/authPages/login.jpg"; 

export default function RegisterPage() {
  // state will catch the success/error from your registerUser action
  const [state, formAction, isPending] = useActionState(registerUser, undefined);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 antialiased">
      {/* Header with Project Myst Name */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          Project <span className="text-blue-600">Myst</span>
        </h1>
        <p className="mt-2 text-lg text-gray-600">Secure Community Access v1.0</p>
      </header>

      {/* Main Registration Card */}
      <main className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Sub-Header with Avatar and Text */}
        <div className="p-8 text-center bg-gray-50/50 border-b border-gray-100 flex flex-col items-center">
          <div className="relative mb-5 p-1 bg-white rounded-full shadow-inner border border-gray-100">
            <Image
              src={RegisterIcon}
              alt="register user icon"
              width={85}
              height={85}
              priority
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-950">Create Account</h2>
          <p className="mt-1 text-sm text-gray-500 max-w-xs">
            Join thousands of users—register to access the Myst dashboard.
          </p>
          
          {/* User Feedback (Success/Error Messages) */}
          {state?.error && (
            <div className="mt-4 p-3 w-full bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-lg">
              ❌ {state.error}
            </div>
          )}
          {state?.success && (
            <div className="mt-4 p-3 w-full bg-green-50 border border-green-100 text-green-700 text-sm font-medium rounded-lg">
              ✅ {state.success}
            </div>
          )}
        </div>

        {/* The Form */}
        <form action={formAction} className="p-8 space-y-6">
          
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Username
            </label>
            <input
              name="username"
              type="text"
              id="username"
              required
              placeholder="e.g. mystical_user"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-150 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              id="email"
              required
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-150 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              required
              placeholder="Min. 8 characters with numbers"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition duration-150 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={isPending}
              className={`w-full flex justify-center items-center gap-2 py-3 px-6 rounded-lg text-white font-semibold text-sm transition duration-150 shadow-md ${
                isPending 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {isPending && (
                <span className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
              )}
              {isPending ? "Setting up account..." : "Register"}
            </button>
          </div>
        </form>
        

        {/* Form Footer */}
        <div className="px-8 py-5 text-center bg-gray-50 border-t border-gray-100 text-sm text-gray-600">
          Already a member?{" "}
          <Link href="/signIn" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign In
          </Link>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="mt-16 text-center text-xs text-gray-500">
        <p>© 2026 Project Myst | All rights reserved.</p>
      </footer>
    </div>
  );
}