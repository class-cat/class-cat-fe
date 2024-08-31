import {
  useInfiniteQuery,
  type QueryKey,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query"
import { fetcher } from "~/lib/query-client"

export type CordinatesType = {
  lat: number | null
  lon: number | null
}
type AddressType = {
  addressLine: string | null
  city: string | null
  cordinates: CordinatesType
  postalCode: string | null
}
export type SearchResultType = {
  adrdress: AddressType
  locationName: string | null
  name: string
  searchType: "activity" | "location" | "provider" | "category"
  slug: string
  thumbnail: string | null
}

export type DataType = {
  count: number
  next: string | null
  previous: string | null
  results: Array<SearchResultType>
  sucess: boolean
}

type UseFetch<T> = {
  url: string | null
  params?: Record<string, string | number>
  config?: Omit<
    UseInfiniteQueryOptions<
      PageData<T>,
      Error,
      InfiniteData<PageData<T>>,
      PageData<T>,
      QueryKey
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
  enabled?: boolean
}

type PageData<T> = {
  data: DataType
}

export const useInfinityFetch = <T>({
  url,
  params,
  config,
  enabled = !!url,
}: UseFetch<T>) => {
  const queryKey: QueryKey = [url as string, params]

  return useInfiniteQuery<PageData<T>, Error, InfiniteData<PageData<T>>>({
    queryKey,
    initialPageParam: 1,

    queryFn: ({ pageParam = 1, signal }) => {
      if (!url) throw new Error("URL is required")
      const queryParams = { page: pageParam as string, ...params }
      return fetcher<PageData<T>>({
        queryKey: [url, queryParams],
        signal,
        meta: {
          persist: false,
        },
      })
    },
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.data?.next ? allPages.length + 1 : undefined
    },

    ...config,
  })
}
