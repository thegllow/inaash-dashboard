import InaashApi from "@/services/inaash"
import { Coupon } from "./types"

export const PostToggleActivity = async ({ id, status }: { id: string; status: "true" | "false" }) => {
  const response = await InaashApi.put<{ data: { item: Coupon } }>(`/coupons/${id}/toggleActive/${status}`)
  return response.data.data.item
}
