import { registerUser } from "@/app/actions/register";

export default function RegisterPage() {
  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Create Test User</h1>
      <form action={registerUser} style={{ display: "inline-block", textAlign: "left" }}>
        <div>
          <label>Email: </label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Username: </label>
          <input name="username" type="text" required />
        </div>
        <div>
          <label>Password: </label>
          <input name="password" type="password" required />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Create User</button>
      </form>
    </div>
  );
}