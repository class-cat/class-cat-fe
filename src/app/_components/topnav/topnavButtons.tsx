"use client"

import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { MOBILE_BREAKPOINT, ROUTES } from "~/lib/const"

export function TopNavButtons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const UserButtons = () => {
    return (
      <div className="flex flex-row items-center gap-4 max-sm:hidden">
        <SignedOut>
          <SignInButton>
            <Button className="shadow-none">Zaloguj się</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton userProfileUrl={ROUTES.ROOT.PROFILE} />
        </SignedIn>
        <Button variant="outline" asChild>
          <Link href={ROUTES.COMPANY.ROOT}>Dodaj zajęcia</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <UserButtons />
      {isMobile ? (
        <Button size="icon" onClick={handleMenu}>
          <Icons.menu />
        </Button>
      ) : null}
      {isMobile && isMenuOpen && (
        <div className="absolute right-0 top-[80px] z-50 h-[calc(100vh-80px)] w-full animate-slide-in  border-t-2 border-primary bg-secondary p-4 shadow-md">
          <div>
            <li>tu jakies itemki</li>
            <li>tu jakies itemki</li>
            <li>tu jakies itemki</li>
            <li>tu jakies itemki</li>
          </div>
        </div>
      )}
    </>
  )
}
