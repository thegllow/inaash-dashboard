import InaashApi from "@/services/inaash"
import { CouponResponse } from "./types"

export const GetCoupon = async (id: string) => {
  const response = await InaashApi.get<CouponResponse>(`/coupons/${id}`)
  return response.data.data.item
}
