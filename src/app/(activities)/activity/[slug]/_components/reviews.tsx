import { Icons } from "~/components/icons"
import { Card, CardContent } from "~/components/ui/card"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import { type Review } from "~/types/user.type"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

type ApiResponse<T> = {
  success: boolean
  data: T
}

interface ReviewsProps {
  slug: string
}

async function getReviews(slug: string): Promise<Array<Review>> {
  try {
    const response = await httpClient.get<ApiResponse<Array<Review>>>(
      `${ENDPOINTS.ACTIVITIES.ROOT}${slug}/review`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch activity info:", error)
    throw error
  }
}

export default async function Reviews({ slug }: ReviewsProps) {
  const reviews = await getReviews(slug)

  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
  return (
    <>
      {reviews ? (
        <>
          {sortedReviews.map((review) => {
            return (
              <Card className="border-2 border-secondary" key={review.slug}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">
                        {review.author.firstName} {review.author.lastName} -{" "}
                        {format(new Date(review.createdAt), "dd MMM, yyyy", {
                          locale: pl,
                        })}
                      </p>
                      <p className="text-gray-600 text-sm">{review.comment}</p>
                    </div>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
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
          })}
        </>
      ) : (
        <p className="font-semibold">
          Te zajęcia nie mają jeszcze recenzji. Bądź pierwszy!
        </p>
      )}
    </>
  )
}
