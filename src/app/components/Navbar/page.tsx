"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react"; // Add useSession
import Link from "next/link"; // Use Next.js Link for better performance

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession(); // Grab the live session data

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent <a> tag from reloading the page
    await signOut({
      callbackUrl: "/signIn", 
      redirect: true,
    });
  };

  // Use session data if available, otherwise fall back to a default
  const userName = session?.user?.name || session?.user?.email || "User";
  const userImage = session?.user?.image || "https://ui-avatars.com/api/?name=" + userName;

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-6 text-white">
          <h1 className="font-bold text-xl mr-4">Project Myst</h1>
          <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link href="#" className="hover:text-gray-300">How to use</Link>
          <Link href="#" className="hover:text-gray-300">About</Link>
        </div>

        {/* Right Side */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition"
          >
            <span className="text-white mr-2 hidden md:block">{userName}</span>
            <img
              className="h-10 w-10 rounded-full object-cover bg-gray-500"
              src={userImage}
              alt="User profile"
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
              <div className="px-4 py-2 text-xs text-gray-500 border-b">
                Logged in as <br />
                <span className="font-bold text-gray-700 truncate block">
                  {session?.user?.email}
                </span>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;