import { Icons } from "~/components/icons"
import { Card, CardContent } from "~/components/ui/card"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import { type Activity } from "~/types/search.type"

type ApiResponse<T> = {
  success: boolean
  data: T
}

interface ReviewsProps {
  slug: string
}
async function getReviews(slug: string): Promise<Activity> {
  try {
    const response = await httpClient.get<ApiResponse<Activity>>(
      `${ENDPOINTS.ACTIVITIES.REVIEW}${slug}`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch activity info:", error)
    throw error
  }
}

export default async function Reviews({ slug }: ReviewsProps) {
  // const reviews = await getReviews(slug)
  // console.log(reviews)
  return (
    <Card className="border-2 border-secondary">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">Jan Kowalski - 20 Mar, 2024</p>
            <p className="text-gray-600 text-sm">
              Syn mówi, że najlepsze zajęcia na jakich był, gorąco polecamy!
            </p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icons.star
                key={i}
                className="size-5 fill-primary text-primary"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
