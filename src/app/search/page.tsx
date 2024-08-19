"use client"

import { useSearchParams } from "next/navigation"
import { Container } from "~/components/ui/container"
import { useCallback, useEffect, useRef } from "react"
import { SearchInput } from "./_components/searchInput"
import { SearchCombobox } from "./_components/searchComboBox"
import { useQueryClient } from "@tanstack/react-query"
import { SortSelect } from "./_components/sortSelect"
import { useGetLocations } from "~/actions/get-locations"
import { MoreOptionDialog } from "./_components/moreOptionDialog"
import PlaceholderPill from "~/components/pill/placeholerPill"
import { Pill } from "~/components/pill/pill"
import { Map, PlaceholderMap } from "../_components/map"
import { MobileMap } from "../_components/map/mobileMap"
import { ENDPOINTS } from "~/lib/const"
import { useFetch } from "../_hooks/useFetch"
import usePagination from "../_hooks/usePagination"
import { type ActivitiesData, type Activity } from "~/types/search.type"

export default function SearchPage() {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const name = searchParams.get("name")
  const location = searchParams.get("location")
  const sort = searchParams.get("sort")
  const category = searchParams.get("category")
  const distance = searchParams.get("distance")
  const age = searchParams.get("age")
  const price = searchParams.get("price")

  const { data: locationData } = useGetLocations()

  const { currentPage, goToNextPage, updateTotalPages } = usePagination({
    initialPage: 1,
  })

  const {
    data: activitiesData,
    isLoading: activitiesIsLoading,
    isError: activitiesIsError,
  } = useFetch<ActivitiesData>({
    url: `${ENDPOINTS.ACTIVITIES}?page=${currentPage}&pageSize=10`,
  })

  const activitiesList = useRef<Activity[]>([])

  useEffect(() => {
    if (activitiesData?.results) {
      activitiesList.current = [
        ...activitiesList.current,
        ...activitiesData.results,
      ]
      updateTotalPages(Math.ceil(activitiesData.count / 10))
    }
  }, [activitiesData, updateTotalPages])

  useEffect(() => {
    activitiesList.current = []
    queryClient.invalidateQueries({ queryKey: ["activities-data"] })
  }, [name, location, sort, distance, age, price, category, queryClient])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastActivityElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (activitiesIsLoading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries: any) => {
        if (entries[0].isIntersecting && activitiesData?.next) {
          goToNextPage()
        }
      })
      if (node) observer.current.observe(node)
    },
    [activitiesIsLoading, activitiesData?.next, goToNextPage]
  )

  return (
    <Container className="flex h-[calc(100vh-120px)] flex-col justify-center pt-2 sm:h-[calc(100vh-80px)] sm:pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <div className="flex items-center space-x-2">
              <p className="truncate text-lg font-bold md:text-3xl">{`Wyniki wyszukiwania dla: ${name || ""}`}</p>
              <p className="text-lg font-bold md:text-3xl">{`(${activitiesList.current.length || 0})`}</p>
            </div>
            <div className="my-2 flex gap-2">
              <SearchInput value={name || ""} />
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
              <MobileMap />
            </div>
            <div className="sm:sidebar relative h-[calc(100vh-385px)] overflow-y-auto sm:h-[calc(100vh-415px)] sm:pr-3 md:h-[calc(100vh-455px)] lg:h-[calc(100vh-315px)] xl:mt-2 xl:pr-0">
              <div className=" mr-2">
                {activitiesIsLoading || activitiesList.current.length === 0
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <div key={index} className="py-2">
                        <PlaceholderPill />
                      </div>
                    ))
                  : activitiesList.current.map((item, index) => {
                      if (activitiesList.current.length === index + 1) {
                        return (
                          <div
                            ref={lastActivityElementRef}
                            key={item.slug}
                            className="pt-3 sm:py-2"
                          >
                            <Pill {...item} />
                          </div>
                        )
                      } else {
                        return (
                          <div key={item.slug} className="pt-3 sm:py-2">
                            <Pill {...item} />
                          </div>
                        )
                      }
                    })}
              </div>
              {activitiesIsError && (
                <div className="text-red-500 py-2">
                  Error loading activities.
                </div>
              )}
            </div>
          </div>
          <div className="hidden h-full xl:block">
            {activitiesIsLoading ? <PlaceholderMap /> : <Map />}
          </div>
        </div>
      </section>
      <div className=" sm:h-16" />
    </Container>
  )
}
