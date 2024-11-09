import { useAuth, useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { httpClient } from "~/lib/http-client"

export function useToken() {
  const { getToken } = useAuth()
  const { user, isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    async function fetchToken() {
      if (user && isSignedIn && isLoaded) {
        try {
          const fetchedToken = await getToken()
          httpClient.setAuthToken(fetchedToken || "") // Send token to httpClient for future requests
          console.log("Fetched Token:", fetchedToken)
        } catch (error) {
          console.error("Failed to fetch token:", error)
        }
      }
    }

    fetchToken()
  }, [user, isSignedIn, isLoaded, getToken])
}
