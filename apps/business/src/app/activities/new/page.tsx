"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ROUTES } from "~/lib/const"

export default function NewActivityPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to calendar page where activities can be added
    router.replace(ROUTES.CALENDAR)
  }, [router])

  return null
}

