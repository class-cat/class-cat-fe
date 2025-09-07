import {
  useInfiniteQuery,
  type QueryKey,
  type InfiniteData,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query"
import { fetcher } from "~/lib/query-client"
import { type DataType } from "~/types/data.type"
import { type CordinatesType, type ResultType } from "~/types/search.type"

type AddressType = {
  addressLine: string | null
  city: string | null
  cordinates: CordinatesType
  postalCode: string | null
}
export type SearchResultType = ResultType & {
  adrdress: AddressType
  locationName: string | null
  name: string
  thumbnail: string | null
}

export type PagesType<T> = {
  pageParams: Array<number>
  pages: DataType<T>
}

type UseFetch<T> = {
  url: string | null
  params?: Record<string, string | number>
  config?: Omit<
    UseInfiniteQueryOptions<
      PageData<T>,
      Error,
      InfiniteData<PageData<T>, unknown>,
      QueryKey,
      unknown
    >,
    "queryKey" | "queryFn" | "initialPageParam" | "getNextPageParam"
  >
  enabled?: boolean
}

// eslint-disable-next-line
export type PageData<T> = DataType<SearchResultType>

export const useInfinityFetch = <T>({
  url,
  params,
  config,
  enabled = !!url,
}: UseFetch<T>) => {
  const queryKey: QueryKey = [url as string, params]

  return useInfiniteQuery<PageData<T>, Error, InfiniteData<PageData<T>, unknown>, QueryKey, unknown>({
    queryKey,
    initialPageParam: 1,

    queryFn: ({ pageParam = 1, signal }) => {
      if (!url) throw new Error("URL is required")
      const queryParams = { page: pageParam as string, ...params }
      return fetcher<PageData<T>>({
        queryKey: [url, queryParams],
        signal,
      } as any)
    },
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage?.next ? allPages.length + 1 : undefined
    },

    ...config,
  })
}
