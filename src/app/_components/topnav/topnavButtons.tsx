"use client"

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { MOBILE_BREAKPOINT, ROUTES } from "~/lib/const"

export const userButtonAppearance = {
  elements: {
    avatarBox: "w-10 h-10",
    userButtonAvatarBox: "w-10 h-10",
    userButtonTrigger: "focus:shadow-none focus:outline-none",
  },
}


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
            <Button className="shadow-none" asChild>
            <Link href={ROUTES.ROOT.SIGN_IN}>Zaloguj się</Link>
            </Button>
        </SignedOut>
        <SignedIn>
          <UserButton 
            userProfileUrl={ROUTES.ROOT.PROFILE} 
            appearance={userButtonAppearance}
          />
        </SignedIn>
        <Button variant="outline" className="shadow-none" asChild>
          <Link href={ROUTES.COMPANY.ROOT}>Dodaj zajęcia</Link>
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="flex gap-8">
        <UserButtons />
        {isMobile ? (
          <Button size="icon" onClick={handleMenu}>
            <Icons.menu />
          </Button>
        ) : null}
      </div>
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
