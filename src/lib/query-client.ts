import {
  type InvalidateQueryFilters,
  type QueryFunctionContext,
  type UseQueryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"
import { httpClient } from "./http-client"

export type FetchConfig<T> = Omit<
  UseQueryOptions<T, Error, T, QueryKeyT>,
  "queryKey" | "queryFn"
>

export type QueryKeyT = [string, Record<string, string | number>]

// Simple in-memory cache for GET responses (5 minutes TTL)
const FIVE_MINUTES_MS = 5 * 60 * 1000
const responseCache = new Map<string, { timestamp: number; data: unknown }>()

function buildCacheKey(url: string, params?: Record<string, string | number>) {
  const search = params ? new URLSearchParams(params as Record<string, string>).toString() : ""
  return `${url}?${search}`
}

export const fetcher = async <T>({
  queryKey,
}: QueryFunctionContext<QueryKeyT>): Promise<T> => {
  const [url, params] = queryKey

  // Try cache first
  const cacheKey = buildCacheKey(url, params)
  const cached = responseCache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < FIVE_MINUTES_MS) {
    return cached.data as T
  }

  // Network request
  const res = await httpClient.get<T>(url, params)

  // Store in cache
  responseCache.set(cacheKey, { timestamp: Date.now(), data: res })

  return res
}

type FetchFn<T, S> = (data: T | S) => Promise<Response>

export const useGenericMutation = <T, S>(
  mutationFn: FetchFn<T, S>,
  url: string | null,
  params?: object,
  updater?: ((oldData: T, newData: S) => T) | undefined,
  invalidateQuery?: InvalidateQueryFilters
) => {
  const queryClient = useQueryClient()

  const queryKey = [url!, params] as const
  return useMutation<Response, Error, T | S>({
    mutationFn: async (data: T | S) => {
      const response = await mutationFn(data)
      if (!response) {
        throw new Error(`Network response failed`)
      }

      return response
    },
    mutationKey: [url],
    onMutate: async (data: T | S) => {
      await queryClient.cancelQueries({ queryKey })
      const previousData = queryClient.getQueryData<T>(queryKey)

      queryClient.setQueryData<T>(queryKey, (oldData) =>
        updater ? updater(oldData!, data as S) : (data as T)
      )

      return previousData
    },
    onError: (_err: Error, _: unknown, context: unknown) => {
      queryClient.setQueryData(queryKey, context)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })

      if (invalidateQuery) {
        queryClient.invalidateQueries(invalidateQuery)
      }
    },
  })
}
