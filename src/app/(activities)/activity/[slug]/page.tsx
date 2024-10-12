import { Container } from "~/components/ui/container"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import { type Activity } from "~/types/search.type"

async function getActivityInfo(slug: string): Promise<Activity> {
  try {
    const data = await httpClient.get<Activity>(
      `${ENDPOINTS.ACTIVITIES}${slug}`
    )
    return data
  } catch (error) {
    console.error("Failed to fetch activity info:", error)
    throw error
  }
}

export default async function ActivityPage({
  params,
}: {
  params: { slug: string }
}) {
  const activity = await getActivityInfo(params.slug)
  console.log(activity)
  return (
    <Container className="flex h-[calc(100vh-120px)] flex-col justify-center pt-2 sm:h-[calc(100vh-80px)] sm:pt-6">
      test
      <div className=" sm:h-16" />
    </Container>
  )
}
