import { type Review } from "~/types/user.type"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

import { Icons } from "./icons"
import { Card, CardContent } from "./ui/card"

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  console.log(review)
  return (
    <Card className="border-secondary border-2 transition-transform duration-300 ease-in-out">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p>
              {review.author?.firstName} {review.author?.lastName} -{" "}
              {format(new Date(review.createdAt), "dd MMM, yyyy", {
                locale: pl,
              })}
            </p>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icons.star
                key={i}
                className={`size-5 ${i < review.rating ? "fill-primary text-primary" : "text-primary"}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ReviewCard }
