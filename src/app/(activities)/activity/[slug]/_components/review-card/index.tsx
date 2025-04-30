import { Icons } from "~/components/icons"
import { Card, CardContent } from "~/components/ui/card"

export const ReviewCard = () => {
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
