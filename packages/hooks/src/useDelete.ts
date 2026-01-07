// Note: This hook requires the consuming app to have ~/lib/http-client and ~/lib/query-client
// The imports will be resolved by the consuming app's TypeScript configuration
// @ts-expect-error - Path alias resolved by consuming app
import { httpClient } from "~/lib/http-client"
// @ts-expect-error - Path alias resolved by consuming app
import { useGenericMutation } from "~/lib/query-client"

type UseDelete<T> = {
  url: string
  params?: object
  updater?: (oldData: T, id: number) => T
}

export const useDelete = <T>({ url, params, updater }: UseDelete<T>) => {
  return useGenericMutation<T, number>(
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    (id) => httpClient.delete(`${url}/${id}`),
    url,
    params,
    updater
  )
}

