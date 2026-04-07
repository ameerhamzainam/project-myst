import getServerSession from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { auth } from "@/auth";

export async function POST(request: Request) {
  await dbConnect();
  // 1. Get the session using the new v5 auth() function
  const session = await auth();
  const user = session?.user;
  // 2. Check if the user is logged in
  if (!session || !user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 },
    );
  }
  // 3. Extract the User ID (which we added via callbacks)
  const userId = user._id;

  try {
    // 4. Get the data from the request body
    const { acceptMessages } = await request.json();

    // 5. Update the user in the database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }, // returns the updated document
    );

    if (!updatedUser) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully",
        updatedUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Error updating message status:", err);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function GET(request: Request) {
  await dbConnect();
  // 1. Get the session using the new v5 auth() function
  const session = await auth();
  const user = session?.user;
  // 2. Check if the user is logged in
  if (!session || !user) {
    return Response.json(
      { success: false, message: "Not authenticated" },
      { status: 401 },
    );
  }
  // 3. Extract the User ID (which we added via callbacks)
  const userId = user._id;
  try{

  
  const foundUser = await UserModel.findById(userId);
  if (!foundUser) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 },
    );
  }
  return Response.json(
    {
      success: true,
      message: "User not found",
      isAcceptingMessages: foundUser.isAcceptingMessage,
    },
    { status: 200 },
  );
}
catch(err){
    console.error("Error in getting message acceptance status", err);
    return Response.json(
      { success: false, message: "Error in getting message acceptance status" },
      { status: 500 },
    );
}
}
getServerSession;
