import { z } from "zod"

export const CouponSchema = z
  .object({
    code: z.string({ required_error: "required" }).min(1, "required").max(50, "long"),
    name: z.string({ required_error: "required" }).min(1, "required").max(50, "long"),
    amount: z.coerce.number({ required_error: "required" }),
    video_ids: z.array(z.coerce.string()).nonempty("required"), // Array of video IDs; ensure these IDs exist in your videos table
    date_start: z.coerce.date({ required_error: "required" }).min(new Date(), { message: "invalidDate" }), // Must be a valid date and after yesterday
    date_end: z.coerce.date({ required_error: "required" }), // Must be after date_start and in the correct format
    max_uses: z.coerce.number().min(1, "smallNumber").max(100000, "largeNumber"), // Must be a number and max 100000
    max_customer_uses: z.coerce.number().min(1, "smallNumber").max(500, "largeNumber"), // Number of uses per customer, must be less than 1000
    type: z.string(), // Must be one of the defined CouponType values
    langs: z.array(z.string()).nonempty("required"), // Must be one or more of the defined Lang values
  })
  .refine(
    (data) => {
      if (data.date_end > data.date_start) return true
      return false
    },
    {
      path: ["date_start"],
      message: "invalidDate",
    },
  )
