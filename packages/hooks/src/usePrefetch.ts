import { useQueryClient } from "@tanstack/react-query"
// Note: This hook requires the consuming app to have ~/lib/query-client
// @ts-expect-error - Path alias resolved by consuming app
import { type QueryKeyT, fetcher } from "~/lib/query-client"

export const usePrefetch = <T>(
  url: string | null,
  params?: Record<string, string | number>
) => {
  const queryClient = useQueryClient()

  return () => {
    if (!url) return

    queryClient.prefetchQuery<T, Error, T, QueryKeyT>({
      queryKey: [url!, params!],
      queryFn: (query) => fetcher(query),
    })
  }
}

