import getServerSession from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
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
  // 3. Extract the User ID (which we added via callbacks)
  //Okay for best practices for aggregation piplines in mongodb there could be an error as user._id could be string or maybe not so we convert it in mongoose object
  //   const userId = user._id; This can be usefull where you perform qwueries like find by ID etc methods
  const userId = new mongoose.Types.ObjectId(user._id); //aggregation case as what if we have 1000 messages? 
  try{
    const user = await UserModel.aggregate([
        //{}, first pipeline 
        //{}, second pipeline
        //{} nth pipeline

        {$match:{id:userId}},
        {$unwind:'$message'},
        {$sort:{'message.createdAt':-1}},
        {$group:{_id:'$_id',message:{$push:'$message'}}}
    ])
    if(!user || user.length === 0 ){
        return Response.json(
      { success: false, message: "user not found" },
      { status: 500 },
    );
    }
    return Response.json(
      { success: true, message: user[0].message },
      { status: 200 },
    );
  }
  catch(err){

  }
}
