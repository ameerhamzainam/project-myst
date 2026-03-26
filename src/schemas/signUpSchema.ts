import {z} from "zod";

export const usernameValidation = z 
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(12, "Username must be at most 12 characters long")
    .regex(/^[a-zA-Z0-9]+$/, "Username must contain only letters and numbers");

export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})