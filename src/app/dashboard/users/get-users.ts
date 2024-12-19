import InaashApi from "@/services/inaash"
import { UsersResponse } from "./types"

export const GetUsers = async (params: URLSearchParams) => {
  const response = await InaashApi.get<UsersResponse>(`/users`, {
    params,
  })
  return response.data.data.items
}
