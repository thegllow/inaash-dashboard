import InaashApi from "@/services/inaash"
import { GeneralStatisticsResponse } from "./types"

export const GetGeneralStatistics = async () => {
  const response = await InaashApi.get<GeneralStatisticsResponse>(`home/statistics`)
  return response.data.data
}
