import { type InvalidateQueryFilters } from "@tanstack/react-query"
// Note: This hook requires the consuming app to have ~/lib/http-client and ~/lib/query-client
// @ts-expect-error - Path alias resolved by consuming app
import { httpClient } from "~/lib/http-client"
// @ts-expect-error - Path alias resolved by consuming app
import { useGenericMutation } from "~/lib/query-client"

type UsePost<T, S> = {
  url: string
  params?: Record<string, string | number>
  updater?: (oldData: T, newData: S) => T
  invalidateQuery?: InvalidateQueryFilters
}

export const usePost = <T, S>({
  url,
  params,
  updater,
  invalidateQuery,
}: UsePost<T, S>) => {
  return useGenericMutation<T, S>(
    (data) => httpClient.post<Response>(url, data),
    url,
    params,
    updater,
    invalidateQuery
  )
}

