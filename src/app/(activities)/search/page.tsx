"use client"

import { useCallback, useEffect, useMemo, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useGetLocations } from "~/actions/get-locations"
import { useDebounce } from "~/app/_hooks/useDebounce"
import { useFetch } from "~/app/_hooks/useFetch"
import { MapMobile } from "~/components/map/map-mobile"
import { MapSkeleton } from "~/components/map/map-skeleton"
import { Pill } from "~/components/pill/pill"
import { PillSkeleton } from "~/components/pill/pill-skeleton"
import { Container } from "~/components/ui/container"
import { ENDPOINTS } from "~/lib/const"
import { type DataType } from "~/types/data.type"
import { type CordinatesType, type ResultType } from "~/types/search.type"
import { v4 as uuid } from "uuid"

import {
  useInfinityFetch,
  type PagesType,
  type SearchResultType,
} from "../../_hooks/useInfinityFetch"
import { Map } from "../../../components/map"
import { MoreOptionDialog } from "./_components/more-option-dialog"
import { SearchCombobox } from "./_components/search-combo-box"
import { SearchInput } from "./_components/search-input"
import { SortSelect } from "./_components/sort-select"

export type MapDataType = ResultType & {
  cordinates: CordinatesType
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search")
  const location = searchParams.get("location")
  const sort = searchParams.get("sort")
  const category = searchParams.get("category")
  const distance = searchParams.get("distance")
  const age = searchParams.get("age")
  const price = searchParams.get("price")
  const queryClient = useQueryClient()
  const { data: locationData } = useGetLocations()
  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedSearch = useDebounce(search, 500)

  const buildQueryParams = () => {
    const params: Record<string, string> = {}
    if (debouncedSearch) params.search = debouncedSearch
    if (location) params.location = location
    if (sort) params.sort = sort
    if (category) params.category = category
    if (distance) params.distance = distance
    if (age) params.age = age
    if (price) params.price = price
    return params
  }

  const queryParams = useMemo(
    () => buildQueryParams(),
    [search, location, sort, category, distance, age, price]
  )

  const activitiesParams = useMemo(
    () => ({
      ...queryParams,
      pageSize: 10,
    }),
    [queryParams]
  )

  const {
    data: activitiesData,
    isLoading: activitiesIsLoading,
    isFetching: activitiesIsFetching,
    isError: activitiesIsError,
    fetchNextPage: fetchNextPageActivities,
    hasNextPage: hasNextPageActivities,
  } = useInfinityFetch<PagesType<SearchResultType>>({
    url: ENDPOINTS.SEARCH.ACTIVIES,
    params: activitiesParams,
  })

  const { data: mapData, isLoading: mapIsLoading } = useFetch<
    DataType<MapDataType>
  >({
    url: ENDPOINTS.SEARCH.MAP,
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
    return activitiesData.pages.flatMap((page) => page?.data || [])
  }, [activitiesData])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 })
    }
  }, [search, location, sort, distance, age, price, category, queryClient])

  return (
    <Container className="flex h-[calc(100vh-120px)] flex-col justify-center pt-2 sm:h-[calc(100vh-80px)] sm:pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <div className="flex items-center space-x-2">
              <p className="truncate text-lg font-bold md:text-3xl">{`Wyniki wyszukiwania dla: ${search || ""}`}</p>
              <p className="text-lg font-bold md:text-3xl">{`(${activitiesList?.length || 0})`}</p>
            </div>
            <div className="my-2 flex gap-2">
              <SearchInput value={search || ""} />
              <div className="flex w-[60px] items-center md:w-full">
                <SearchCombobox
                  data={locationData || []}
                  value={location || ""}
                />
              </div>
              <div className="flex w-[60px] items-center md:w-full">
                <MoreOptionDialog
                  distanceValue={distance || ""}
                  ageValue={age || ""}
                  priceValue={price || ""}
                  categoryValue={category || ""}
                />
              </div>
            </div>
            <SortSelect value={sort || ""} />
            <div className="mb-6 xl:hidden">
              <MapMobile />
            </div>
            <div
              ref={containerRef}
              className="sm:sidebar relative h-[calc(100vh-385px)] overflow-y-auto sm:h-[calc(100vh-415px)] sm:pr-3 md:h-[calc(100vh-455px)] lg:h-[calc(100vh-315px)] xl:mt-2 xl:pr-0"
            >
              <div className="mr-2">
                {activitiesIsLoading ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="py-2">
                      <PillSkeleton />
                    </div>
                  ))
                ) : activitiesList?.length !== 0 ? (
                  activitiesList?.map((item, index) => {
                    const isLastElement = index === activitiesList.length - 1
                    return (
                      <div
                        key={uuid()}
                        className="py-2"
                        ref={isLastElement ? lastElementRef : null}
                      >
                        <Pill {...item} />
                      </div>
                    )
                  })
                ) : (
                  <div className="py-2 text-red-500">Brak wyników</div>
                )}
              </div>
              {activitiesIsError && (
                <div className="py-2 text-red-500">
                  Error loading activities.
                </div>
              )}
            </div>
          </div>
          <div className="hidden h-full xl:block">
            {mapData === undefined || mapIsLoading ? <MapSkeleton /> : <Map />}
          </div>
        </div>
      </section>
      <div className="sm:h-16" />
    </Container>
  )
}
