import { Progress } from "~/components/ui/progress"
import { Icons } from "~/components/icons"

interface Props {
  ratings: Array<number>
}

export const RatingSummary = ({ ratings }: Props) => {
  const totalOpinions = ratings.length

  const averageRating =
    ratings.reduce((total, num) => total + num, 0) / totalOpinions

  return (
    <div className="bg-background w-full pb-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="flex flex-col items-center justify-center gap-2 md:col-span-1">
          <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Icons.star
                key={i}
                className={`size-5 text-primary ${
                  i < Math.round(averageRating) ? "fill-primary" : ""
                }`}
              />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">
            {totalOpinions} opinie
          </span>
        </div>
        <div className="flex flex-col justify-center gap-3 md:col-span-3">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center gap-2 text-sm">
              <span className="w-3 text-right">{rating}</span>
              <Progress
                value={((ratings as any)[index] / totalOpinions) * 100}
                className="h-3 flex-1 [&>div]:bg-primary"
              />
              <span className="text-muted-foreground w-8">
                ({ratings[index]})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
