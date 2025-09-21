"use client"

import { useActivities } from "./use-activities"
import { ActivitiesSection } from "./activities-section"

export function HomeContent() {
  const {
    containerRef,
    activitiesList,
    activitiesIsLoading,
    activitiesIsError,
    lastElementRef,
    handleChangeTab,
    showOnlyFavorites,
  } = useActivities()

  return (
    <section>
      <ActivitiesSection
        containerRef={containerRef}
        activitiesList={activitiesList}
        activitiesIsLoading={activitiesIsLoading}
        activitiesIsError={activitiesIsError}
        lastElementRef={lastElementRef}
        onTabChange={handleChangeTab}
        showOnlyFavorites={showOnlyFavorites}
      />
    </section>
  )
}
