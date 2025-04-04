"use client"

import React, { Suspense, useEffect, useMemo, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Container } from "~/components/ui/container"
import { ENDPOINTS } from "~/lib/const"
import { type PagesType, useInfinityFetch } from "../_hooks/useInfinityFetch"
import { type Activity } from "~/types/search.type"
import { MobileMap } from "../_components/map/mobileMap"
import { Map } from "../_components/map"
import ActivityList from "./_components/activityList"
import RecommendedCategories from "./_components/recommendedCategories"
import CompanyOffer from "./_components/companyOffer"
import { CategoryTabs } from "./_components/categoryTabs"
import { useInfiniteScroll } from "../_hooks/useInfiniteScroll"
import { SearchBar } from "./_components/searchbar"

export default function HomePage() {
  const [searchType, setSearchType] = React.useState("newest")
  const handleChangeTab = (value: string) => () => setSearchType(value)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()

  const {
    data: activitiesData,
    isLoading: activitiesIsLoading,
    isFetching: activitiesIsFetching,
    isError: activitiesIsError,
    fetchNextPage: fetchNextPageActivities,
    hasNextPage: hasNextPageActivities,
  } = useInfinityFetch<PagesType<Activity>>({
    url: ENDPOINTS.ACTIVITIES.ROOT,
    params: {
      type: searchType,
      pageSize: 10,
    },
  })

  const activitiesList = useMemo(() => {
    if (!activitiesData?.pages) return []
    return activitiesData?.pages.reduce((acc: Array<any>, page) => {
      return [...acc, ...(page?.data || [])]
    }, [])
  }, [activitiesData])

  const { lastElementRef } = useInfiniteScroll(
    activitiesIsLoading,
    activitiesIsFetching,
    hasNextPageActivities,
    fetchNextPageActivities
  )

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 })
    }
    queryClient.invalidateQueries({ queryKey: [ENDPOINTS.ACTIVITIES.ROOT] })
  }, [searchType, queryClient])

  return (
    <Container className="h-full flex-1 justify-center pt-2 md:pt-6">
      <section className="md:rounded-3xl md:bg-secondary">
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBar />
        </Suspense>
      </section>
      <div className="md:h-10" />
      <section>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <CategoryTabs onTabChange={handleChangeTab}>
              <div className="mt-6 xl:hidden">
                <MobileMap />
              </div>
              <div className="h-6" />
              <ActivityList
                containerRef={containerRef}
                activitiesList={activitiesList}
                activitiesIsLoading={activitiesIsLoading}
                activitiesIsError={activitiesIsError}
                lastElementRef={lastElementRef}
              />
            </CategoryTabs>
          </div>
          <div className="hidden h-full xl:block">
            <Map />
          </div>
        </div>
      </section>
      <div className="md:h-8" />
      <RecommendedCategories />
      <div className="md:h-8" />
      <CompanyOffer />
    </Container>
  )
}
