import { Card, CardContent } from "~/components/ui/card"
import { Button } from "~/components/ui/button"

export default function OtherActivities({ slug }: { slug: string }) {
  // Fetch other activities by provider ID here

  console.log(slug)

  return (
    <section>
      <h4 className="mb-4 text-2xl">Inne zajęcia w szkole</h4>
      <Card className="radius-xs mb-4 cursor-pointer border-none bg-white hover:shadow-md">
        <CardContent className="p-4">
          <h4 className="text-lg">Koszykówka dla dzieci 1-3</h4>
          <div className="mt-2 flex space-x-2">
            <span className="rounded-lg border-2 border-secondary px-2 py-1 text-sm">poniedziałek</span>
            <span className="rounded-lg border-2 border-secondary px-2 py-1 text-sm">środa</span>
          </div>
        </CardContent>
      </Card>
      <Button variant="outline" className="w-full rounded-lg shadow-none">
        Pokaż więcej
      </Button>
    </section>
  )
}

