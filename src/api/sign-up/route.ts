import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { success } from "zod";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, passowrd } = await request.json();
    const ExistedVerifiedUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (ExistedVerifiedUsername) {
      return Response.json(
        {
          success: false,
          message: "Username Already Taken",
        },
        {
          status: 400,
        },
      );
    }
    const ExistedUserEmail = await UserModel.findOne({ email });
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    if (ExistedUserEmail) {
      if (ExistedUserEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User Already Exist with this email",
          },
          {
            status: 400,
          },
        );
      } else {
        const hashedPassword = await bcrypt.hash(passowrd, 8);
        ExistedUserEmail.password = hashedPassword;
        ExistedUserEmail.verifyCode = verificationCode;
        ExistedUserEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await ExistedUserEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(passowrd, 8);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); //1 Hour expiry date

      const NewUser = await new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode: verificationCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        message: [],
      });
      await NewUser.save();
    }
    //send verification Email now
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verificationCode,
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        },
      );
    }
    return Response.json(
      {
        success: true,
        message: "User Registed Successfully, Please Verify your email",
      },
      {
        status: 200,
      },
    );
  } catch (Error) {
    console.log("Error Registering User", Error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      },
    );
  }
}
