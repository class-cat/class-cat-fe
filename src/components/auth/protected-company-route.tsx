"use client"

import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useIsCompany } from "~/lib/auth"

interface ProtectedCompanyRouteProps {
  children: React.ReactNode
}

export function ProtectedCompanyRoute({ children }: ProtectedCompanyRouteProps) {
  const { isLoaded, userId } = useAuth()
  const router = useRouter()
  const isCompany = useIsCompany()

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/company/sign-in")
      return
    }

    if (isLoaded && userId && !isCompany) {
      router.push("/user/dashboard")
    }
  }, [isLoaded, userId, router])

  if (!isLoaded || !userId || !isCompany) {
    return null
  }

  return <>{children}</>
} 