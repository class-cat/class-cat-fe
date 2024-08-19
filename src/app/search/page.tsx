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
import { ActivitiesData, Activity } from "~/types/search.type"


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

  const {
    currentPage,
    goToNextPage,
    updateTotalPages,
  } = usePagination({ initialPage: 1 })

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
      activitiesList.current = [...activitiesList.current, ...activitiesData.results]
      updateTotalPages(Math.ceil(activitiesData.count / 10))
    }
  }, [activitiesData, updateTotalPages])

  useEffect(() => {
    activitiesList.current = []
    queryClient.invalidateQueries({ queryKey: ['activities-data'] })
  }, [name, location, sort, distance, age, price, category, queryClient])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastActivityElementRef = useCallback((node: HTMLDivElement | null) => {
    if (activitiesIsLoading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries: any) => {
      if (entries[0].isIntersecting && activitiesData?.next) {
        goToNextPage()
      }
    })
    if (node) observer.current.observe(node)
  }, [activitiesIsLoading, activitiesData?.next, goToNextPage])

  return (
    <Container className="h-[calc(100vh-80px)] flex flex-col justify-center pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 w-full">
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold truncate md:text-3xl">{`Wyniki wyszukiwania dla: ${name || ""}`}</p>
              <p className="text-lg font-bold md:text-3xl">{`(${activitiesList.current.length || 0})`}</p>
            </div>
            <div className="flex gap-2 my-2">
              <SearchInput value={name || ''} />
              <div className="flex w-[60px] md:w-full items-center">
                <SearchCombobox data={locationData || []} value={location || ''} />
              </div>
              <div className="flex w-[60px] md:w-full items-center">
                <MoreOptionDialog
                  distanceValue={distance || ''}
                  ageValue={age || ''}
                  priceValue={price || ''}
                  categoryValue={category || ''}
                />
              </div>
            </div>
            <SortSelect value={sort || ''} />
            <div className="xl:hidden mb-6">
              <MobileMap />
            </div>
            <div className="relative overflow-y-auto h-[calc(100vh-450px)] sm:h-[calc(100vh-315px)] pr-3 xl:pr-0 sidebar xl:mt-2">
              <div className="overflow-y-auto mr-2">
                {activitiesIsLoading || activitiesList.current.length === 0 ? (
                  Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="py-2">
                      <PlaceholderPill />
                    </div>
                  ))
                ) : (
                  activitiesList.current.map((item, index) => {
                    if (activitiesList.current.length === index + 1) {
                      return <div ref={lastActivityElementRef} key={item.slug} className="pt-3 sm:py-2">
                        <Pill {...item} />
                      </div>
                    } else {
                      return <div key={item.slug} className="pt-3 sm:py-2">
                        <Pill {...item} />
                      </div>
                    }
                  })
                )}
              </div>
              {activitiesIsError && (
                <div className="py-2 text-red-500">
                  Error loading activities.
                </div>
              )}
            </div>
          </div>
          <div className="hidden xl:block h-full">
            {activitiesIsLoading ? <PlaceholderMap /> : <Map />}
          </div>
        </div>
      </section>
      <div className="h-16" />
    </Container>
  );
}