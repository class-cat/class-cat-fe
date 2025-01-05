import { pl } from "date-fns/locale"
import { format } from "date-fns"
import { Icons } from "./icons"
import { Card, CardContent } from "./ui/card"
import { type Review } from "~/types/user.type"

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <Card className="border-2 border-secondary transition-transform duration-300 ease-in-out">
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
}

export { ReviewCard }
