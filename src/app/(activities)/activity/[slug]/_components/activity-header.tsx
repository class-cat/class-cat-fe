'use client'

import Image from "next/image"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { type Activity } from "~/types/search.type"
import { ActivityDetails } from "./activity-details"
import { useFavorites, type FavoriteActivity } from "~/app/_hooks/useFavorites"
import { Icons } from "~/components/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

interface ActivityHeaderProps {
  activity: Activity
}

export function ActivityHeader({ activity }: ActivityHeaderProps) {
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites()
  
  const bookmark = isLoaded ? isFavorite(activity.slug) : false

  const handleBookmark = () => {
    if (!isLoaded) return
    
    const favoriteActivity: FavoriteActivity = {
      slug: activity.slug,
      name: activity.name,
      location: activity.location?.address?.address_line || '',
      primaryImage: activity.primaryImage,
      description: activity.description
    }
    toggleFavorite(favoriteActivity)
  }

  return (
    <Card className="w-full overflow-hidden border-2 border-secondary p-0 md:col-span-2">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="relative h-48 w-full sm:size-36 md:size-48">
            {activity?.primaryImage?.file && (
            <Image
              src={activity?.primaryImage?.file}
              alt={activity?.name}
              fill
              className="object-cover sm:rounded-l-md"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 144px, 192px"
              priority
            />
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between space-y-4 p-4 sm:space-y-2 sm:p-4 sm:pl-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-center text-2xl sm:text-left">{activity.name}</h4>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger onClick={handleBookmark} disabled={!isLoaded}>
                      <Icons.paw
                        className="size-6 sm:size-8"
                        color={"#ecdec8"}
                        fill={bookmark ? "#ecdec8" : "#FFFEFB"}
                        strokeWidth={1.5}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      {bookmark ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ActivityDetails activity={activity} />
            </div>
            <div className="flex justify-center sm:justify-end">
              <Button
                variant="outline"
                className="w-full rounded-lg shadow-none sm:w-auto"
                size="sm"
              >
                Wyświetl informacje
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
