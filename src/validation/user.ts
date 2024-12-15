import { z } from "zod"
import phoneNumberSchema from "./phone-number"

export const UserSchema = z.object({
  name: z.string({ required_error: "required" }).min(1, "required"),
  mobile: phoneNumberSchema,
  email: z.string().email("invalidEmail").optional(),
})
