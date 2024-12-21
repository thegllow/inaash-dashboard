import InaashApi from "@/services/inaash"
import { UsersInfoResponse } from "./types"

export const GetUsersInfo = async (params: URLSearchParams) => {
  const response = await InaashApi.get<UsersInfoResponse>(`/home/user-information`, {
    params,
  })

  return response.data.data
}
