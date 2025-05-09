"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { isUser } from "~/lib/auth"

interface ProtectedUserRouteProps {
  children: React.ReactNode
}

export function ProtectedUserRoute({ children }: ProtectedUserRouteProps) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/user/sign-in")
      return
    }

    if (isLoaded && userId && !isUser()) {
      router.push("/company/dashboard")
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId || !isUser()) {
    return null
  }

  return <>{children}</>
} 