'use client'

import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Container } from "~/components/ui/container"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { ENDPOINTS } from "~/lib/const"
import { type PagesType, useInfinityFetch } from "../_hooks/useInfinityFetch"
import { type Activity } from "~/types/search.type"
import SearchBar from "./_components/searchbar"
import { MobileMap } from "../_components/map/mobileMap"
import { Map } from "../_components/map"
import ActivityList from "./_components/activityList"
import RecommendedCategories from "./_components/recommendedCategories"
import CompanyOffer from "./_components/companyOffer"

const tabsTriggers = [
  { id: 1, title: "Oferty dnia", value: "today" },
  { id: 2, title: "Polecane", value: "recommended" },
  { id: 3, title: "Najnowsze oferty", value: "newest" },
  { id: 4, title: "Polubione", value: "viewed" },
]

export default function HomePage() {
  const [searchType, setSearchType] = React.useState("newest")
  const handleChangeTab = (value: string) => () => setSearchType(value)

  const {
    data: activitiesData,
    isLoading: activitiesIsLoading,
    isFetching: activitiesIsFetching,
    isError: activitiesIsError,
    fetchNextPage: fetchNextPageActivities,
    hasNextPage: hasNextPageActivities,
  } = useInfinityFetch<PagesType<Activity>>({
    url: ENDPOINTS.ACTIVITIES,
    params: {
      type: searchType,
      pageSize: 10,
    },
  })

  const observer = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (activitiesIsLoading || activitiesIsFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasNextPageActivities) {
            fetchNextPageActivities()
          }
        },
        { threshold: 1.0 }
      )

      if (node) observer.current.observe(node)
    },
    [fetchNextPageActivities, hasNextPageActivities, activitiesIsLoading, activitiesIsFetching]
  )

  const activitiesList = useMemo(() => {
    if (!activitiesData?.pages) return []
    return activitiesData?.pages.reduce((acc: Array<any>, page) => {
      return [...acc, ...(page?.data || [])]
    }, [])
  }, [activitiesData])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 })
    }
    queryClient.invalidateQueries({ queryKey: [ENDPOINTS.ACTIVITIES] })
  }, [searchType, queryClient])

  return (
    <Container className="h-full flex-1 justify-center pt-2 md:pt-6">
      <section className="md:rounded-3xl md:bg-secondary">
        <SearchBar />
      </section>
      <div className="md:h-10" />
      <section>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <Tabs defaultValue="newest" className="w-full">
              <TabsList className="flex justify-between max-md:hidden">
                {tabsTriggers.map((tab, index) => (
                  <TabsTrigger
                    onClick={handleChangeTab(tab.value)}
                    key={tab.id}
                    value={tab.value}
                    className={`${
                      index === 1
                        ? "border-x-2"
                        : index !== tabsTriggers.length - 1
                          ? "border-r-2"
                          : "hidden border-0 md:block"
                    }`}
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
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
            </Tabs>
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