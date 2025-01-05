import { SignedIn } from "@clerk/nextjs"
import Image from "next/image"
import { Map } from "~/app/_components/map"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Container } from "~/components/ui/container"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import { type Activity } from "~/types/search.type"
import { AddReviewDialog } from "./_components/review-dialog"
import { MobileMap } from "~/app/_components/map/mobileMap"
import RatingSummary from "./_components/rating-summary"
import Reviews from "./_components/reviews"

type ApiResponse<T> = {
  success: boolean
  data: T
}
async function getActivityInfo(slug: string): Promise<Activity> {
  try {
    const response = await httpClient.get<ApiResponse<Activity>>(
      `${ENDPOINTS.ACTIVITIES.ROOT}${slug}`
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch activity info:", error)
    throw error
  }
}

type Params = Promise<{ slug: string }>
export default async function ActivityPage({ params }: { params: Params }) {
  const { slug } = await params
  const activity = await getActivityInfo(slug)

  return (
    <Container className="container h-[calc(100vh-120px)]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="cardSmall w-full">
          <CardContent className="px-0">
            <div className="flex space-x-4">
              {activity.primaryImage?.file ? (
                <Image
                  src={activity.primaryImage.file}
                  alt="Activity Image"
                  width={144}
                  height={144}
                  className="bg-gray-200 size-36 rounded-md object-cover"
                />
              ) : (
                <Image
                  src={"/business.png"}
                  alt="Activity Image"
                  width={144}
                  height={144}
                  className="bg-gray-200 size-36 rounded-md object-cover"
                />
              )}
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold leading-tight">
                  {activity.name}
                </h1>
                <p className="flex items-start text-sm font-medium sm:text-base">
                  <Icons.map className="mr-2 mt-1 size-4 shrink-0" />
                  <span className="break-words">{activity.provider.name}</span>
                </p>
                {activity.location ? (
                  <p className="flex items-start text-sm font-medium sm:text-base">
                    <Icons.map className="mr-2 mt-1 size-4 shrink-0" />
                    <span className="break-words">
                      {" "}
                      {activity.location.address.address_line}{" "}
                      {activity.location.address.city}
                    </span>
                  </p>
                ) : null}
                <p className="flex items-start text-sm font-medium sm:text-base">
                  <Icons.phone className="mr-2 mt-1 size-4 shrink-0" />
                  <span className="break-words">
                    {activity.provider.phoneNumber}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end p-0">
            <Button variant="outline" size={"lg"}>
              Wyświetl informacje
            </Button>
          </CardFooter>
        </Card>
        <div className="md:hidden">
          <MobileMap />
        </div>
        <div className="hidden md:block">
          <Map />
        </div>
      </div>
      <div className="sm:h-8" />
      <div className="py-2">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Opis zajęć</h2>
              <p>{activity.description}</p>
            </section>
            <section>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <h2 className="mb-4 text-2xl font-bold">Opinie</h2>
                  <SignedIn>
                    <AddReviewDialog acticitySlug={slug} />
                  </SignedIn>
                </div>
                <Reviews slug={slug} />
              </div>
            </section>
          </div>

          <div className="cardSmall space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Inne zajęcia w szkole</h2>
              <Card className="radius-xs mb-4 cursor-pointer border-none bg-white hover:shadow-md">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">
                    Koszykówka dla dzieci 1-3
                  </h3>
                  <div className="mt-2 flex space-x-2">
                    <span className=" rounded-lg border-2 border-secondary px-2 py-1 text-sm">
                      poniedziałek
                    </span>
                    <span className=" rounded-lg border-2 border-secondary px-2 py-1 text-sm">
                      środa
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Button variant="outline" className="w-full">
                Pokaż więcej
              </Button>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold">
                Sprawdź podobne zajęcia
              </h2>
              <Card className="mb-4 cursor-pointer border-none bg-white  hover:shadow-md">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">
                    Siatkówka dla dzieci 3-6
                  </h3>
                  <p className="text-gray-600 text-sm">Szkoła Podstawowa 2</p>
                </CardContent>
              </Card>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="radius-xs mb-4 h-16 cursor-pointer rounded-xl border-none bg-white  hover:shadow-md"
                ></div>
              ))}
              <Button variant="outline" className="w-full">
                Pokaż więcej
              </Button>
            </section>
          </div>
        </div>
      </div>
    </Container>
  )
}
