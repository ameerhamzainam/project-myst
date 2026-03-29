import { signIn } from "@/auth"; 
import Image from "next/image";
import "../../styles/AuthPages.css";
import AvatarImage from "../../../assets/authPages/login.jpg";

export default function LoginPage() {
  return (
    <div className="login-wrapper">
      <header>
        {/* Matches .Your-Application in CSS */}
        <h1 className="Your-Application">Myst Application</h1>
      </header>

      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
      >
        {/* Matches .container in CSS */}
        <div className="container">
          
          {/* Matches .img-container in CSS */}
          <div className="img-container">
            <Image 
              src={AvatarImage} 
              alt="login page image" 
              width={100} 
              height={100}
              priority
            />
          </div>
          
          {/* Matches .login-text in CSS */}
          <div className="login-text">
            <h1>Sign In</h1>
          </div>

          {/* Matches .form in CSS */}
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

            {/* Matches .check in CSS */}
            <div className="check">
              <input type="checkbox" id="checkbox" name="saveDevice" />
              <label htmlFor="checkbox">Save Device ( Beta )</label>
            </div>
          </div>

          {/* Matches .login-button in CSS */}
          <div className="login-button">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>

      <footer>
        <p>© 2026 All rights reserved | Version 1.0</p>
      </footer>
    </div>
  );
}