import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import { type Activity } from "~/types/search.type"

type ApiResponse<T> = {
  success: boolean
  data: T
}

export async function getActivityInfo(slug: string): Promise<Activity> {
  try {
    const response = await httpClient.get<ApiResponse<Activity>>(`${ENDPOINTS.ACTIVITIES}${slug}`)
    return response.data
  } catch (error) {
    console.error("Failed to fetch activity info:", error)
    throw error
  }
}

