import { resend } from "@/lib/resend";
import OTPEmail from "../../emails/verificationEmailTemplate";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verificationCode: string,
): Promise<ApiResponse> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Myst Verification Code",
      react: OTPEmail({ username, verificationCode }),
    });
    return {
      success: true,
      message: "Verification Email has been sent",
    };
  } catch (error) {
    console.log("Error sending Verification Email", error);
    return { success: false, message: "Failed to send verification Email" };
  }
}
