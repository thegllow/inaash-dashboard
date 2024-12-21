import InaashApi from "@/services/inaash"
import { UserGraphResponse } from "./types"

export const GetUserGraph = async () => {
  const response = await InaashApi.get<UserGraphResponse>(`/home/user-graph`)
  return response.data.data.graph
}
