import InaashApi from "@/services/inaash"
import { CouponSchema } from "@/validation/coupon"
import { z } from "zod"

export const PutUpdateCoupon = async ({ id, ...data }: z.infer<typeof CouponSchema> & { id: string }) => {
  const response = await InaashApi.put(`/coupons/${id}`, data)
  return response.data
}
