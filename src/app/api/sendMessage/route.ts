import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";
import { date } from "zod";

export async function POST(request: Request) {
  await dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }
    if (!user.isAcceptingMessage) {
      return Response.json(
        { success: false, message: "User not accepting messages" },
        { status: 403 },
      );
    }
    try {
      const newMessage = { content, createdAt: new Date() };
      user.message.push(newMessage as Message);
      await user.save();
      return Response.json(
        { success: true, message: "message sent successfuly" },
        { status: 200 },
      );
    } catch (err) {
      return Response.json(
        { success: false, message: "Error while sending messages",err },
        { status: 403 },
      );
    }
  } catch (err) {
    console.log(err);
    return Response.json(
      { success: false, message: "unExpected Error", err },
      { status: 401 },
    );
  }
}
