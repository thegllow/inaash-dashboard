import InaashApi from "@/services/inaash"
import { UserResponse } from "./types"

export const GetUser = async (id: string) => {
  const response = await InaashApi.get<UserResponse>(`/users/${id}`)
  return response.data.data.item
}
