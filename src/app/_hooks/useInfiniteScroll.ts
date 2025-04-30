import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult,
} from "@tanstack/react-query"
import { useCallback, useRef } from "react"
import { type PageData } from "./useInfinityFetch"
import { type SearchResultType } from "~/types/search.type"

export const useInfiniteScroll = (
  isLoading: boolean,
  isFetching: boolean,
  hasNextPage: boolean,
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<PageData<SearchResultType>, unknown>,
      Error
    >
  >
) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && hasNextPage) {
            fetchNextPage()
          }
        },
        { threshold: 1.0 }
      )

      if (node) observer.current.observe(node)
    },
    [fetchNextPage, hasNextPage, isLoading, isFetching]
  )

  return { lastElementRef }
}
