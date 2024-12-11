import InaashApi from "@/services/inaash"
import { CouponSchema } from "@/validation/coupon"
import { z } from "zod"

export const PostAddCoupon = async (data: z.infer<typeof CouponSchema>) => {
  const response = await InaashApi.post("/coupons", data)
  return response.data
}
