import React, { type RefObject, useMemo } from "react"
import { v4 as uuid } from "uuid"
import { Pill } from "~/components/pill/pill"
import { PillSkeleton } from "~/components/pill/pill-skeleton"
import { useFavorites } from "~/app/_hooks/useFavorites"

interface Props {
  containerRef: RefObject<HTMLDivElement | null>
  activitiesList: any[]
  activitiesIsLoading: boolean
  activitiesIsError: boolean
  lastElementRef: (node: HTMLDivElement) => void
  showOnlyFavorites?: boolean
}

export const ActivityList = ({
  containerRef,
  activitiesList,
  activitiesIsLoading,
  activitiesIsError,
  lastElementRef,
  showOnlyFavorites = false,
}: Props) => {
  const { isLoaded, favorites } = useFavorites()

  const filteredActivities = useMemo(() => {
    if (showOnlyFavorites) {
      if (!isLoaded) return []
      return favorites
    }
    return activitiesList
  }, [showOnlyFavorites, isLoaded, favorites, activitiesList])

  const isLoading = showOnlyFavorites ? !isLoaded : activitiesIsLoading

  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement | null>}
      className="md:sidebar relative h-[calc(100vh-325px)] overflow-y-auto md:h-[calc(100vh-455px)] md:pr-3 lg:h-[calc(100vh-315px)] xl:pr-0"
    >
      <div className="mr-2">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="md:not-first:py-2 mt-2 first:mt-0">
              <PillSkeleton />
            </div>
          ))
        ) : filteredActivities?.length !== 0 ? (
          filteredActivities?.map((item, index) => {
            const isLastElement = index === filteredActivities.length - 1
            return (
              <div
                key={uuid()}
                className="md:not-first:py-2 mt-2 first:mt-0"
                ref={isLastElement && !showOnlyFavorites ? lastElementRef : null}
              >
                <Pill {...item} />
              </div>
            )
          })
        ) : (
          <div className="text-red-500 py-2">
            {showOnlyFavorites ? "Brak ulubionych aktywności" : "Brak wyników"}
          </div>
        )}
      </div>
      {activitiesIsError && !showOnlyFavorites && (
        <div className="text-red-500 py-2">
          Błąd podczas ładowania aktywności
        </div>
      )}
    </div>
  )
}
