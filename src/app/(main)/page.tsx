"use client"

import { useQueryClient } from "@tanstack/react-query"
import { Container } from "lucide-react"
import React, { useRef, useMemo, useEffect } from "react"
import { Card, CardContent } from "~/components/ui/card"
import { ENDPOINTS } from "~/lib/const"
import { Activity } from "~/types/search.type"
import { MobileMap } from "../_components/map/mobileMap"
import SearchBar from "../_components/searchbar"
import { useInfinityFetch, PagesType } from "../_hooks/useInfinityFetch"
import ActivityList from "./_components/activityList"
import CompanyOffer from "./_components/companyOffer"
import RecommendedCategories from "./_components/recommendedCategories"
import Image from "next/image"
import { useInfiniteScroll } from "../_hooks/useInfiniteScroll"
import { CategoryTabs } from "./_components/categoryTabs"
import { Map } from "../_components/map"

const createCardItems = (count: number) =>
  Array.from({ length: count }, () => ({
    title: "piłka nożna",
    desc: "34",
    avatar: "/ball.svg",
    href: "search?category=pilkanozna",
  }))

type MostSearchItemProps = {
  title: string
  desc: string
  avatar: string
}
const MostSearchItem = ({ title, desc, avatar }: MostSearchItemProps) => {
  return (
    <>
      <Card className="aspect-square rounded-2xl border-2 border-secondary bg-secondary p-4 shadow-none sm:rounded-3xl">
        <CardContent className="flex h-full flex-col items-center justify-center space-y-2 p-0">
          <div className="relative size-20">
            <Image
              src={avatar}
              alt={title}
              layout="fill"
              width={128}
              height={128}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col items-center justify-center pt-2 text-center capitalize max-sm:hidden">
            <p className="text-md text-foregroundMuted">{title}</p>
            <p className="text-md text-foregroundMuted">{desc}</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center pt-2 text-center capitalize sm:hidden">
        <p className="text-sm text-foregroundMuted">{title}</p>
      </div>
    </>
  )
}
const mostSearchedItems = createCardItems(16)

export default function HomePage() {
  const [searchType, setSearchType] = React.useState("newest")
  const handleChangeTab = (value: string) => () => setSearchType(value)
  const containerRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

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
