import getServerSession from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } },
) {
  const messageId = params.messageid;
  await dbConnect;
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
  try {
    const response = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } },
    );
    if (response.modifiedCount == 0) {
      return Response.json(
        { success: false, message: "Message not found or already deleted" },
        { status: 404 },
      );
    }
    return Response.json(
      { success: true, message: "Message Deleted" },
      { status: 200 },
    );
  } catch (err) {
    console.log("Error in deleting message", err)
    return Response.json(
      { success: false, message: "Error Deleting message",err },
      { status: 500 },
    );
  }
}
