import { useQueryClient } from "@tanstack/react-query"
import { useMemo, useRef, useState } from "react"
import { ENDPOINTS } from "~/lib/const"
import { type Activity } from "~/types/search.type"
import { type PagesType, useInfinityFetch } from "~/app/_hooks/useInfinityFetch"
import { useInfiniteScroll } from "~/app/_hooks/useInfiniteScroll"

export const useActivities = () => {
  const [searchType, setSearchType] = useState("newest")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const queryClient = useQueryClient()

  const shouldFetchFromAPI = searchType !== "favorites"

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
    enabled: shouldFetchFromAPI,
  })

  const activitiesList = useMemo(() => {
    if (!activitiesData?.pages) return []
    return activitiesData?.pages.reduce((acc: Array<any>, page) => {
      return [...acc, ...(page?.data || [])]
    }, [])
  }, [activitiesData])

  const { lastElementRef } = useInfiniteScroll(
    activitiesIsLoading,
    activitiesIsFetching as boolean,
    hasNextPageActivities as boolean,
    fetchNextPageActivities as (options?: any) => Promise<any>
  )

  const handleChangeTab = (value: string) => () => {
    setSearchType(value)
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 })
    }
    if (value !== "favorites") {
      queryClient.invalidateQueries({ queryKey: [ENDPOINTS.ACTIVITIES.ROOT] })
    }
  }

  const showOnlyFavorites = searchType === "favorites"

  return {
    searchType,
    containerRef,
    activitiesList,
    activitiesIsLoading: shouldFetchFromAPI ? activitiesIsLoading : false,
    activitiesIsError: shouldFetchFromAPI ? activitiesIsError : false,
    lastElementRef,
    handleChangeTab,
    showOnlyFavorites,
  }
}
