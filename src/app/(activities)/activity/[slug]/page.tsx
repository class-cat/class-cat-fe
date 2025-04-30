import { Suspense } from "react"
import { SignedIn } from "@clerk/nextjs"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Container } from "~/components/ui/container"
import { type Activity } from "~/types/search.type"
import { type Metadata } from "next"
import { ActivityDetails } from "./_components/activity-details"
import ActivityMap from "./_components/activity-map"
import OtherActivities from "./_components/other-activities"
import SimilarActivities from "./_components/similar-activities"
import { AddReviewDialog } from "./_components/review-dialog"
import Reviews from "./_components/reviews"
import { getActivityInfo } from "~/actions/get-activity-info"

type ActivityPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Activity: ${resolvedParams.slug}`,
  }
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const resolvedParams = await params

  let activity: Activity
  try {
    activity = await getActivityInfo(resolvedParams.slug)
  } catch (error) {
    notFound()
  }

  return (
    <Container className="container mb-8 min-h-[calc(100vh-120px)] space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="cardSmall w-full p-0 md:col-span-2">
          <CardContent className="p-0">
            <div className="flex flex-col  space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Image
                src={activity.primaryImage.file}
                alt={activity.name}
                width={480}
                height={480}
                className="bg-gray-200 size-36 rounded-md rounded-r-none object-cover sm:size-48"
              />
              <div className="flex flex-1 flex-col justify-between space-y-2 p-4 pl-0">
                <div className="space-y-2">
                  <h4 className="text-2xl">{activity.name}</h4>
                  <ActivityDetails activity={activity} />
                </div>
                <div className="mt-auto flex justify-end">
                  <Button
                    variant="outline"
                    className="rounded-lg shadow-none"
                    size="sm"
                  >
                    Wyświetl informacje
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Suspense
          fallback={<div className="bg-gray-200 h-[300px] animate-pulse" />}
        >
          <ActivityMap />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h4 className="mb-4 text-2xl ">Opis zajęć</h4>
            <p>{activity.description}</p>
          </section>
          <section>
            <Reviews slug={activity.slug} />
            <SignedIn>
              <AddReviewDialog acticitySlug={activity?.slug} />
            </SignedIn>
          </section>
        </div>
        <div className="cardSmall space-y-8">
          <OtherActivities slug={activity.provider?.slug} />
          <SimilarActivities slug={activity?.slug} />
        </div>
      </div>
    </Container>
  )
}
