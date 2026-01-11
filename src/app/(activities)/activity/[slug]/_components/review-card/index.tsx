import { Icons } from "~/components/icons"
import { Card, CardContent } from "~/components/ui/card"

export const ReviewCard = () => {
  return (
    <Card className="border-secondary border-2">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold">Jan Kowalski - 20 Mar, 2024</p>
            <p className="text-sm text-gray-600">
              Syn mówi, że najlepsze zajęcia na jakich był, gorąco polecamy!
            </p>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Icons.star
                key={i}
                className="fill-primary text-primary size-5"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
