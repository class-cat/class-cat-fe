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
import { AddReviewDialog } from "../_components/review-dialog"

type ApiResponse<T> = {
  success: boolean
  data: T
}
async function getActivityInfo(slug: string): Promise<Activity> {
  try {
    const response = await httpClient.get<ApiResponse<Activity>>(
      `${ENDPOINTS.ACTIVITIES}${slug}`
    )
    return response.data
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
    <Container className="h-[calc(100vh-120px)]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="cardSmall w-full">
          <CardContent>
            <div className="flex space-x-4">
              <Image
                src={activity.primaryImage.file}
                alt="Activity Image"
                width={144}
                height={144}
                className="bg-gray-200 h-36 w-36 rounded-md object-cover"
              />
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold leading-tight">
                  {activity.name}
                </h1>
                <p className="flex items-start text-sm font-medium sm:text-base">
                  <Icons.map className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                  <span className="break-words">{activity.provider.name}</span>
                </p>
                {activity.location ? (
                  <p className="flex items-start text-sm font-medium sm:text-base">
                    <Icons.map className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                    <span className="break-words">
                      {" "}
                      {activity.location.address.address_line} ", "
                      {activity.location.address.city}
                    </span>
                  </p>
                ) : null}
                <p className="flex items-start text-sm font-medium sm:text-base">
                  <Icons.phone className="mr-2 mt-1 h-4 w-4 flex-shrink-0" />
                  <span className="break-words">
                    {activity.provider.phoneNumber}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <span className="text-2xl font-bold">45 zł/h</span>
            <Button variant="outline" size={"lg"}>
              Wyświetl informacje
            </Button>
          </CardFooter>
        </Card>
        <Map />
      </div>
      <div className="sm:h-16" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Opis zajęć</h2>
              <p>{activity.description}</p>
            </section>

            <section>
              <div className="flex justify-between">
                <h2 className="mb-4 text-2xl font-bold">Opinie</h2>
                <SignedIn>
                  <AddReviewDialog />
                </SignedIn>
              </div>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">
                        Jan Kowalski - 20 Mar, 2024
                      </p>
                      <p className="text-gray-600 text-sm">
                        Syn mówi, że najlepsze zajęcia na jakich był, gorąco
                        polecamy!
                      </p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Icons.star
                          key={i}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="cardSmall space-y-8 bg-secondary">
            <section>
              <h2 className="mb-4 text-2xl font-bold">Inne zajęcia w szkole</h2>
              <Card className="mb-4">
                <CardContent className="p-4">
                  <h3 className="cursor-pointer text-lg font-semibold">
                    Koszykówka dla dzieci 1-3
                  </h3>
                  <div className="mt-2 flex space-x-2">
                    <span className="bg-gray-200 rounded px-2 py-1 text-sm">
                      poniedziałek
                    </span>
                    <span className="bg-gray-200 rounded px-2 py-1 text-sm">
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
              <Card className="mb-4 cursor-pointer">
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
                  className="mb-4 h-16 cursor-pointer rounded bg-white"
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
