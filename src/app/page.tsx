import { redirect } from "next/navigation";

export default function RootPage() {
  // As soon as this component tries to render, it sends the user to /signIn
  redirect("/sign-up");
}