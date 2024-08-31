import { useInfiniteQuery } from "@tanstack/react-query";
import { type FetchConfig, type QueryKeyT, fetcher } from "~/lib/query-client";

type UseFetch<T> = {
  url: string | null;
  params?: Record<string, string | number>;
  config?: FetchConfig<T>;
  enabled?: boolean;
};

interface PageData<T> {
  data: {
    next: boolean;
  };
}

export const useInfinityFetch = <T>({
  url,
  params,
  config,
  enabled = !!url,
}: UseFetch<T>) => {
  const queryKey: QueryKeyT = [url as string, params as Record<string, string | number>];

  return useInfiniteQuery<PageData<T>, Error>({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) => {
      if (!url) throw new Error("URL is required");
      const queryParams = { page: pageParam as string, ...params };
      return fetcher({
        queryKey: [url, queryParams],
        signal,
      });
    },
    enabled: enabled,
    getNextPageParam: (lastPage, allPages) => {
      console.log(allPages);
      return lastPage?.data.next ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...config,
  });
};
