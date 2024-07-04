import { useRouter } from "next/navigation"
import { useCallback } from "react"

export const useUpdateQueryParams = () => {
  const router = useRouter()

  const updateQueryParams = useCallback(
    (params: Record<string, string>) => {
      const url = new URL(window.location.href)
      Object.keys(params).forEach((key) => {
        if (params[key]) {
          url.searchParams.set(key, params[key] as string)
        } else {
          url.searchParams.delete(key)
        }
      })
      router.push(url.toString())
    },
    [router]
  )

  return updateQueryParams
}
