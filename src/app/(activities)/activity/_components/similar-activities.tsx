import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"

export default function SimilarActivities({ slug }: { slug: string }) {
  // Fetch similar activities here

  console.log(slug)

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Sprawdź podobne zajęcia</h2>
      <Card className="mb-4 cursor-pointer border-none bg-white hover:shadow-md">
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">Siatkówka dla dzieci 3-6</h3>
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

