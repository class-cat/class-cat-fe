import { useFetch } from "~/app/_hooks/useFetch"
import { ReviewCard } from "~/components/review-card"
import { Skeleton } from "~/components/ui/skeleton"
import { ENDPOINTS } from "~/lib/const"
import { type DataType } from "~/types/data.type"
import { type Review } from "~/types/user.type"

export const UserReviewContent = () => {
  const { data: reviews, isLoading } = useFetch<DataType<Review>>({
    url: `${ENDPOINTS.USER_REVIEWS}`,
  })

  return (
    <>
      {!isLoading ? (
        <>
          {reviews && reviews.data.length > 0 ? (
            <div className="space-y-4 overflow-y-auto">
              {reviews.data.map((review) => {
                return <ReviewCard key={review.slug} review={review} />
              })}
            </div>
          ) : null}
        </>
      ) : (
        <Skeleton className="card min-h-[200px] rounded-3xl" />
      )}
    </>
  )
}
