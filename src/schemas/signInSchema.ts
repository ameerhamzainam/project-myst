import { z } from "zod";

export const signInSchema = z.object({
    // We remove .email() so it accepts any string (username OR email)
    identifier: z.string().min(2, "Username or email is required"), 
    password: z.string().min(1, "Password is required")
});