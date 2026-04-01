"use client"; // Required for handling form state/errors in the UI
import RegisterPage from "../register/page";
import { useActionState } from "react";
import Image from "next/image";
import { loginAction } from "../actions/login"; // We will create this action
import "../../styles/AuthPages.css";
import AvatarImage from "../../../assets/authPages/login.jpg";
import Link from "next/link";
export default function LoginPage() {
  // state will contain whatever our server action returns (error or success)
  const [state, formAction, isPending] = useActionState(loginAction, undefined);

  return (
    <div className="login-wrapper">
      <header>
        <h1 className="Your-Application">Myst Application</h1>
      </header>

      <form action={formAction}>
        <div className="container">
          <div className="img-container">
            <Image
              src={AvatarImage}
              alt="login page image"
              width={100}
              height={100}
              priority
            />
          </div>

          <div className="login-text">
            <h1>Sign In</h1>
            {/* Display the error message if the action returns one */}
            {state?.error && (
              <p
                style={{
                  color: "#ff4d4d",
                  fontSize: "14px",
                  marginTop: "10px",
                }}
              >
                {state.error}
              </p>
            )}
          </div>

          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              required
              placeholder="email@example.com"
              className="form-input-email"
            />

            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              className="form-input-password"
            />
          </div>

          <div className="login-button">
            <button type="submit" disabled={isPending}>
              {isPending ? "Please Wait..." : "Login"}
            </button>
          </div>
          <div className="mb-2 text-blue-400">
            <Link href={'/register'}> Register your Account</Link>
          </div>
        </div>
      </form>

      <footer>
        <p>© 2026 All rights reserved | Version 1.0</p>
      </footer>
    </div>
  );
}
