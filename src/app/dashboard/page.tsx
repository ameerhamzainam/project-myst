import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "../components/Navbar/page";
export default async function DashboardPage() {
  const session = await auth();

  // If for some reason middleware is bypassed, this "Double Lock" catches it
  if (!session) {
    redirect("/signIn");
  }

  return (
    
    <div style={{ padding: "40px" }}>
      <div>
      <Navbar></Navbar>
    </div>
      <h1>Dashboard</h1>
      <p>Welcome back, <strong>{session.user?.name || session.user?.email}</strong>!</p>
      
      <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc" }}>
        <h3>Your Profile Info</h3>
        <p>Email: {session.user?.email}</p>
      </div>
    </div>
  );
}