import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { success, z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { error } from "console";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
   
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"),
    };
    const isUsernameUnique = UsernameQuerySchema.safeParse(queryParam);
    // console.log(isUsernameUnique);
    if (!isUsernameUnique.success) {
      const usernameError =
        isUsernameUnique.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameError?.length > 0
              ? usernameError.join(", ")
              : "Invalid Query Paramters found",
        },
        {
          status: 500,
        },
      );
    }
    const { username } = isUsernameUnique.data;
    const CheckIsUserNameUnique = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (CheckIsUserNameUnique) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        {
          status: 400,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username Available",
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error("Error Checking username", error);
    return Response.json(
      {
        success: false,
        message: "Error Checking username",
      },
      {
        status: 500,
      },
    );
  }
}
