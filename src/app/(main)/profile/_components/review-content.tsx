import { ENDPOINTS } from "~/lib/const"
import { type Review } from "~/types/user.type"
import { useFetch } from "~/app/_hooks/useFetch"
import { type DataType } from "~/types/data.type"
import { ReviewCard } from "~/components/review-card"
import { Skeleton } from "~/components/ui/skeleton"

function UserReviewContent() {
  const { data: reviews, isLoading } = useFetch<DataType<Review>>({
    url: `${ENDPOINTS.USER_REVIEWS}`,
  })

  console.log(reviews)
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

export { UserReviewContent }
