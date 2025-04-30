import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import { type Review } from "~/types/user.type"
import RatingSummary from "./rating-summary"
import { ReviewCard } from "~/components/review-card"

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

  const ratings = reviews.map((review) => review.rating)

  return (
    <>
      <RatingSummary ratings={ratings} />
      {reviews && reviews.length > 0 ? (
        <div className="md:sidebar h-[550px] space-y-4 overflow-y-auto md:pr-3">
          {sortedReviews.map((review) => {
            return <ReviewCard key={review.slug} review={review} />
          })}
        </div>
      ) : (
        <p>Te zajęcia nie mają jeszcze recenzji. Bądź pierwszy!</p>
      )}
    </>
  )
}
