"use client"

import { ClerkProvider } from "@clerk/nextjs"
import { plPL } from "@clerk/localizations"

export function BusinessClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={plPL}>
      {children}
    </ClerkProvider>
  )
}

