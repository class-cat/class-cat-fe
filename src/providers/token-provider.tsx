"use client"

import { useAuth, useUser } from "@clerk/nextjs"
import { useEffect, useRef } from "react"
import { httpClient } from "~/lib/http-client"

export default function TokenProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { getToken } = useAuth()
  const { isSignedIn, isLoaded } = useUser()

  const intervalRef = useRef<number | null>(null)

  const fetchToken = async () => {
    if (isSignedIn) {
      try {
        const fetchedToken = await getToken()
        httpClient.setAuthToken(fetchedToken || "")
      } catch (error) {
        console.error("Failed to fetch token", error)
      }
    }
  }

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchToken()

      intervalRef.current = window.setInterval(() => {
        console.log("Refreshing token every 2 minutes...")
        fetchToken()
      }, 120000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isSignedIn, isLoaded])

  useEffect(() => {
    const handleWindowFocus = () => {
      console.log("Window focused, refreshing token...")
      fetchToken()
    }

    if (isLoaded && isSignedIn) {
      window.addEventListener("focus", handleWindowFocus)
    }

    return () => {
      window.removeEventListener("focus", handleWindowFocus)
    }
  }, [isSignedIn, isLoaded])

  return <div>{children}</div>
}
