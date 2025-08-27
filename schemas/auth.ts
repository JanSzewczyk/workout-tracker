import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    email: z.email("Please enter a valid email address").trim(),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must contain at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string("Confirm Password is required").min(1, "Please confirm your password")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  });
export type SignUpFormData = z.infer<typeof signUpSchema>;

export const otpSchema = z.object({
  code: z
    .string()
    .min(1, "Verification code is required")
    .length(6, "Code must be exactly 6 digits")
    .regex(/^\d+$/, "Code must contain only numbers")
    .transform((val) => val.trim())
});
export type OTPFormData = z.infer<typeof otpSchema>;
