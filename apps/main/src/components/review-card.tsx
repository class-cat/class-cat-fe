import { pl } from "date-fns/locale"
import { format } from "date-fns"
import { Icons } from "./icons"
import { Card, CardContent } from "@class-cat/ui"
import { Avatar, AvatarImage, AvatarFallback } from "@class-cat/ui"
import { type Review } from "~/types/user.type"
import Image from "next/image"

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  console.log(review)
  return (
    <Card className="border-2 border-secondary transition-transform duration-300 ease-in-out">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="size-10 rounded-lg mr-4">
            <AvatarImage 
              src={review.author?.avatar?.file} 
              alt={`${review.author?.firstName} ${review.author?.lastName}`}
            />
            <AvatarFallback className="bg-primary/10 font-medium text-primary">
              {review.author?.firstName?.[0]}{review.author?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p>
                  {review.author?.firstName} {review.author?.lastName} -{" "}
                  {format(new Date(review.createdAt), "dd MMM, yyyy", {
                    locale: pl,
                  })}
                </p>
                <p className="text-sm">{review.comment}</p>
              </div>
              <div className="ml-4 flex">
                {[...Array(5)].map((_, i) => (
                  <Icons.star
                    key={i}
                    className={`size-5 ${i < review.rating ? 'fill-primary text-primary' : 'text-primary'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { ReviewCard }
