import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Container } from "~/components/ui/container"
import { type Activity } from "~/types/search.type"
import { type Metadata } from "next"
import { ActivityMap } from "./_components/activity-map"
import { getActivityInfo } from "~/actions/get-activity-info"
import { ActivityHeader } from "./_components/activity-header"
import { ActivityDescription } from "./_components/activity-description"
import { ReviewsSection } from "./_components/reviews-section"
import { ActivitySidebar } from "./_components/activity-sidebar"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  return {
    title: `Activity: ${resolvedParams.slug}`,
  }
}

export default async function ActivityPage({ params }: Props) {
  const resolvedParams = await params

  let activity: Activity
  try {
    activity = await getActivityInfo(resolvedParams.slug)
  } catch (error) {
    notFound()
  }

  console.log(activity)

  return (
    <Container className="container mb-8 min-h-[calc(100vh-120px)] space-y-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <ActivityHeader activity={activity} />
        <Suspense
          fallback={<div className="bg-gray-200 h-[300px] animate-pulse" />}
        >
          <ActivityMap
            latitude={activity.location?.address?.coordinates?.lat ?? null}
            longitude={activity.location?.address?.coordinates?.lon ?? null}
            title={activity.name}
            image={activity.primaryImage?.file}
            slug={activity.slug}
          />
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ActivityDescription description={activity.description} />
          <ReviewsSection slug={activity.slug} />
        </div>
        <ActivitySidebar 
          providerSlug={activity.provider?.slug} 
          activitySlug={activity.slug} 
        />
      </div>
    </Container>
  )
}
