"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { ROUTES } from "~/lib/const"

interface ProtectedUserRouteProps {
  children: React.ReactNode
}

export function ProtectedUserRoute({ children }: ProtectedUserRouteProps) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && !userId) {
      router.push(ROUTES.ROOT.SIGN_IN)
      return
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId) {
    return null
  }

  return <>{children}</>
}
