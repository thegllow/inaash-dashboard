import { z } from "zod"

export const LoginSchema = z.object({
  email: z.string({ required_error: "required" }).min(1, "required").email("invalidEmail"),
  password: z.string({ required_error: "required" }).min(6, "short").max(32, "long"),
})
export const OTPSchema = z.object({
  otp: z.string({ required_error: "required" }).min(4, "required"),
})

export const ResetPasswordSchema = z.object({
  password: z.string({ required_error: "required" }).min(6, "short").max(32, "long"),
  password_confirmation: z.string({ required_error: "required" }).min(6, "short").max(32, "long"),
})
