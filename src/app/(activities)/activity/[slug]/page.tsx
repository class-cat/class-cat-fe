import { Suspense } from "react"
import { SignedIn } from "@clerk/nextjs"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Container } from "~/components/ui/container"
import { AddReviewDialog } from "../_components/review-dialog"
import RatingSummary from "../_components/rating-summary"
import { getActivityInfo } from "~/app/api/activities"
import ActivityMap from "../_components/activity-map"
import OtherActivities from "../_components/other-activities"
import SimilarActivities from "../_components/similar-activities"
import { ReviewCard } from "../_components/review-card"
import { ActivityDetails } from "../_components/activity-details"
import { type Activity } from "~/types/search.type"

export default async function ActivityPage({ params }: { params: { slug: string } }) {
  let activity: Activity;
  try {
    activity = await getActivityInfo(params.slug)
  } catch (error) {
    notFound()
  }

  return (
    <Container className="container min-h-[calc(100vh-120px)] space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="cardSmall w-full md:col-span-2">
          <CardContent className="p-0 ">
            <div className="flex flex-col  space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Image
                src={activity.primaryImage.file}
                alt={activity.name}
                width={480}
                height={480}
                className="bg-gray-200 size-36 rounded-md object-cover sm:size-48"
              />
              <div className="flex flex-1 flex-col justify-between space-y-2">
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold leading-tight">{activity.name}</h1>
                  <ActivityDetails activity={activity} />
                </div>
                <div className="mt-auto flex justify-end">
                  <Button variant="outline" className="rounded-lg shadow-none" size="sm">
                    Wyświetl informacje
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Suspense fallback={<div className="bg-gray-200 h-[300px] animate-pulse" />}>
          <ActivityMap />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="mb-4 text-2xl font-bold">Opis zajęć</h2>
            <p>{activity.description}</p>
          </section>
          <section>
            <RatingSummary />
            <SignedIn>
              <AddReviewDialog />
            </SignedIn>
            <ReviewCard />
          </section>
        </div>
        <div className="cardSmall mb-8 space-y-8">
          <OtherActivities slug={activity.provider?.slug} />
          <SimilarActivities slug={activity?.slug} />
        </div>
      </div>
    </Container>
  )
}



