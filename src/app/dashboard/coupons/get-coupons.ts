import InaashApi from "@/services/inaash"
import { CouponsResponse } from "./types"

export const GetCoupons = async (params: URLSearchParams) => {
  const response = await InaashApi.get<CouponsResponse>(`/coupons`, {
    params,
  })
  return response.data
}
