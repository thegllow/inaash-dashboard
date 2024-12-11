import { VideosResponse } from "@/@types/videos"
import InaashApi from "@/services/inaash"

export const getVideos = async () => {
  const response = await InaashApi.get<VideosResponse>("/videos")
  return response.data.data.items.data
}
