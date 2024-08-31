import { useInfiniteQuery, QueryKey, InfiniteData, UseInfiniteQueryOptions } from "@tanstack/react-query";
import { type FetchConfig, fetcher } from "~/lib/query-client";

type UseFetch<T> = {
  url: string | null;
  params?: Record<string, string | number>;
  config?: Omit<UseInfiniteQueryOptions<PageData<T>, Error, InfiniteData<PageData<T>>, PageData<T>, QueryKey>, 'queryKey' | 'queryFn' | 'initialPageParam' | 'getNextPageParam'>;
  enabled?: boolean;
};

interface PageData<T> {
  data: any;
  next: boolean;
}

export const useInfinityFetch = <T>({
  url,
  params,
  config,
  enabled = !!url,
}: UseFetch<T>) => {
  const queryKey: QueryKey = [url as string, params];

  return useInfiniteQuery<PageData<T>, Error, InfiniteData<PageData<T>>>({
    queryKey,
    initialPageParam: 1,
    
    queryFn: ({ pageParam = 1, signal }) => {
      if (!url) throw new Error("URL is required");
      const queryParams = { page: pageParam as string, ...params };
      return fetcher<PageData<T>>({
        queryKey: [url, queryParams],
        signal,
        meta: {
          persist: false
        }
      });
    },
    enabled,
    getNextPageParam: (lastPage, allPages) => {
      console.log(allPages);
      return lastPage?.data?.next ? allPages.length + 1 : undefined;
    },
    
    ...config,
  });
};