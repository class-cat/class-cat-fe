"use client"

import { Map } from "~/components/map"
import { MapMobile } from "~/components/map/map-mobile"
import { CategoryTabs } from "../category-tabs"
import { ActivityList } from "../activity-list"
import { type RefObject } from "react"

interface ActivitiesSectionProps {
  containerRef: RefObject<HTMLDivElement | null>
  activitiesList: any[]
  activitiesIsLoading: boolean
  activitiesIsError: boolean
  lastElementRef: (node: HTMLDivElement) => void
  onTabChange: (value: string) => () => void
  showOnlyFavorites?: boolean
}

export const ActivitiesSection = ({
  containerRef,
  activitiesList,
  activitiesIsLoading,
  activitiesIsError,
  lastElementRef,
  onTabChange,
  showOnlyFavorites = false,
}: ActivitiesSectionProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>
        <CategoryTabs onTabChange={onTabChange}>
          <div className="mt-6 xl:hidden">
            <MapMobile />
          </div>
          <div className="h-6" />
          <ActivityList
            containerRef={containerRef}
            activitiesList={activitiesList}
            activitiesIsLoading={activitiesIsLoading}
            activitiesIsError={activitiesIsError}
            lastElementRef={lastElementRef}
            showOnlyFavorites={showOnlyFavorites}
          />
        </CategoryTabs>
      </div>
      <div className="hidden h-full xl:block">
        <Map />
      </div>
    </div>
  )
}