"use client"

import Image from "next/image"
import { Button } from "~/components/ui/button"
import { Container } from "~/components/ui/container"
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"
import React, { useCallback, useEffect, useMemo, useRef } from "react"
import { v4 as uuid } from "uuid"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { Card, CardContent } from "~/components/ui/card"
import { Pill } from "~/components/pill/pill"
import { Map } from "../_components/map"
import Link from "next/link"
import { MobileMap } from "../_components/map/mobileMap"
import SearchBar from "../_components/searchbar"
import { ENDPOINTS } from "~/lib/const"
import { useFetch } from "../_hooks/useFetch"
import PlaceholderPill from "~/components/pill/placeholerPill"
import { type PagesType, useInfinityFetch, type DataType } from "../_hooks/useInfinityFetch"
import { type Activity } from "~/types/search.type"
import { useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useGetLocations } from "~/actions/get-locations"

const tabsTriggers = [
  {
    id: 1,
    title: "Najnowsze oferty",
    value: "newest",
  },
  {
    id: 2,
    title: "Oferty dnia",
    value: "today",
  },
  {
    id: 3,
    title: "Polecane",
    value: "recommended",
  },
  {
    id: 4,
    title: "Ostatnio oglądane",
    value: "viewed",
  },
]

const tabsTriggers2 = [
  {
    id: 1,
    title: "Najnowsze oferty",
    value: "newest",
  },
  {
    id: 2,
    title: "Oferty dnia",
    value: "today",
  },
]

const createCardItems = (count: number) =>
  Array.from({ length: count }, () => ({
    title: "piłka nożna",
    desc: "34",
    avatar: "ball.svg",
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

  // const {
  //   data: activitiesData,
  //   isLoading: activitiesIsLoading,
  //   refetch: activitiesRefetch,
  // } = useFetch<DataType<Activity>>({
  //   url: `${ENDPOINTS.ACTIVITIES}`,
  //   params: {
  //     type: searchType,
  //     page: 1,
  //     pageSize: 5,
  //   },
  // })

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
        {
          threshold: 1.0,
        }
      )

      if (node) observer.current.observe(node)
    },
    [
      fetchNextPageActivities,
      hasNextPageActivities,
      activitiesIsLoading,
      activitiesIsFetching,
    ]
  )

  const activitiesList = useMemo(() => {
    if (!activitiesData?.pages) return []
    return activitiesData?.pages.reduce(
      (acc: Array<any>, page) => {
        return [...acc, ...(page?.data || [])]
      },
      []
    )
  }, [activitiesData])

  const queryClient = useQueryClient()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 })
    }
    queryClient.invalidateQueries({ queryKey: [ENDPOINTS.ACTIVITIES] })
  }, [location, searchType, queryClient])


  // useEffect(() => {
  //   activitiesRefetch
  // }, [searchType])

  return (
    <Container className="h-full flex-1 justify-center pt-2 sm:pt-6">
      <section className="sm:paddingX sm:flex sm:justify-between sm:gap-4 sm:rounded-3xl sm:bg-secondary sm:py-4">
        <SearchBar />
      </section>
      <div className="sm:h-10" />
      <section>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <Tabs defaultValue="newest" className="w-full">
              <TabsList className="flex justify-between max-sm:hidden">
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
                          : "hidden border-0 sm:block"
                    }`}
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="mt-6 flex justify-between sm:hidden">
                {tabsTriggers2.map((tab, index) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.value}
                    className={`${
                      index === 1
                        ? "border-x-2"
                        : index !== tabsTriggers.length - 1
                          ? "border-r-2"
                          : "hidden border-0 sm:block"
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
              <div
              ref={containerRef}
              className="sm:sidebar relative h-[calc(100vh-385px)] overflow-y-auto sm:h-[calc(100vh-415px)] sm:pr-3 md:h-[calc(100vh-455px)] lg:h-[calc(100vh-315px)] xl:pr-0"
            >
              <div className="mr-2">
              {activitiesIsLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="not-first:py-2">
                      <PlaceholderPill />
                    </div>
                  ))
                ) : activitiesList?.length !== 0 ? (
                  activitiesList?.map((item, index) => {
                    const isLastElement = index === activitiesList.length - 1
                    return (
                      <div
                        key={uuid()}
                        className="sm:not-first:py-2 mt-2 first:mt-0"
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
              </div>
  
              {activitiesIsError && (
                <div className="text-red-500 py-2">
                  Error loading activities.
                </div>
              )}
              
            </Tabs>
          </div>
          <div className="hidden h-full xl:block">
            <Map />
          </div>
        </div>
      </section>
      <div className="h-6 sm:h-8" />
      <section>
        <h4 className="text-center">Wyszukiwane zajęcia</h4>
        <div className="h-2 sm:h-8" />
        <div className="flex justify-center">
          <Carousel
            className="max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-5xl"
            opts={{ align: "start", loop: false }}
          >
            <CarouselContent className="-ml-2">
              {mostSearchedItems.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/4 md:basis-1/3 lg:basis-1/6"
                >
                  <div className="p-1">
                    <Link href={item.href}>
                      <MostSearchItem {...item} />
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselDots />
            <CarouselPrevious className="sx:ml-2 max-sm:hidden" />
            <CarouselNext className="sx:mr-2 max-sm:hidden" />
          </Carousel>
        </div>
      </section>
      <div className="h-6 sm:h-8" />
      <div className="flex w-full flex-col items-center justify-center gap-4 border-t-2 border-secondary text-center sm:flex-row">
        <div className="sm:h-32" />
        <h4>Oferta dla firm</h4>
        <Button variant={"outline"} size={"lg"} className="w-full sm:w-40">
          Sprawdź szczegóły
        </Button>
      </div>
      <div className="max-sm:h-8" />
    </Container>
  )
}
