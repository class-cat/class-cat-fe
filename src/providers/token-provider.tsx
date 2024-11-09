"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { useEffect } from "react"
import { httpClient } from "~/lib/http-client"

export default function TokenProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { getToken } = useAuth()
  const { isSignedIn, isLoaded } = useUser()

  useEffect(() => {
    async function fetchToken() {
      if (isSignedIn) {
        const fetchedToken = await getToken()
        httpClient.setAuthToken(fetchedToken || "")
      }
    }
    fetchToken()
  }, [isSignedIn, isLoaded])
  return <div>{children}</div>
}
