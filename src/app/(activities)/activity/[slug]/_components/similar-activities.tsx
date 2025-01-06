import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"

export default function SimilarActivities({ slug }: { slug: string }) {
  // Fetch similar activities here

  console.log(slug)

  return (
    <section>
      <h4 className="mb-4 text-2xl">Sprawdź podobne zajęcia</h4>
      <Card className="mb-4 cursor-pointer border-none bg-white hover:shadow-md">
        <CardContent className="p-4">
          <h4 className="text-lg">Siatkówka dla dzieci 3-6</h4>
          <p className="text-gray-600 text-sm">Szkoła Podstawowa 2</p>
        </CardContent>
      </Card>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="radius-xs mb-4 h-16 cursor-pointer rounded-xl border-none bg-white hover:shadow-md"
        ></div>
      ))}
      <Button variant="outline" className="w-full rounded-lg shadow-none">
        Pokaż więcej
      </Button>
    </section>
  )
}

