import InaashApi from "@/services/inaash"
import { RevenueGraphResponse } from "./types"

export const GetRevenueGraph = async () => {
  const response = await InaashApi.get<RevenueGraphResponse>(`/home/revenue-graph`)
  return response.data.data.graph
}
