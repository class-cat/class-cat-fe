import React, { type RefObject } from "react"
import { v4 as uuid } from "uuid"
import { Pill } from "~/components/pill/pill"
import PlaceholderPill from "~/components/pill/placeholerPill"

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
  activitiesList: any[]
  activitiesIsLoading: boolean
  activitiesIsError: boolean
  lastElementRef: (node: HTMLDivElement) => void
}

export const ActivityList = ({
  containerRef,
  activitiesList,
  activitiesIsLoading,
  activitiesIsError,
  lastElementRef,
}: Props) => {
  return (
    <div
      ref={containerRef as RefObject<HTMLDivElement | null>}
      className="md:sidebar relative h-[calc(100vh-325px)] overflow-y-auto md:h-[calc(100vh-455px)] md:pr-3 lg:h-[calc(100vh-315px)] xl:pr-0"
    >
      <div className="mr-2">
        {activitiesIsLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="md:not-first:py-2 mt-2 first:mt-0">
              <PlaceholderPill />
            </div>
          ))
        ) : activitiesList?.length !== 0 ? (
          activitiesList?.map((item, index) => {
            const isLastElement = index === activitiesList.length - 1
            return (
              <div
                key={uuid()}
                className="md:not-first:py-2 mt-2 first:mt-0"
                ref={isLastElement ? lastElementRef : null}
              >
                <Pill {...item} />
              </div>
            )
          })
        ) : (
          <div className="text-red-500 py-2">Brak wyników</div>
        )}
      </div>
      {activitiesIsError && (
        <div className="text-red-500 py-2">
          Błąd podczas ładowania aktywności
        </div>
      )}
    </div>
  )
}
