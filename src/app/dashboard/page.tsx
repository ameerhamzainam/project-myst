import { auth } from "@/auth";
import { redirect } from "next/navigation";
import DashboardClient from "../dashboard/DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/signIn");
  }

  // Pass the session to the Client Component
  return <DashboardClient session={session} />;
}