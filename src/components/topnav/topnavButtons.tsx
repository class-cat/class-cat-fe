"use client"

import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { MOBILE_BREAKPOINT } from "~/lib/const"

export function TopNavButtons() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
      {isMobile ? (
        <Button size="icon" onClick={handleMenu}>
          <Icons.menu />
        </Button>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button className="shadow-none">Zaloguj się</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton userProfileUrl="/profile" />
          </SignedIn>
          <Button variant="outline" className="shadow-none">
            Dodaj zajęcia
          </Button>
        </div>
      )}
      {isMobile && isMenuOpen && (
        <div className="absolute right-0 top-[80px] h-[calc(100vh-80px)] w-full animate-slide-in  border-t-2 border-primary bg-secondary p-4 shadow-md">
          <div>
            <li>tu jakies itemki</li>
            <li>tu jakies itemki</li>
            <li>tu jakies itemki</li>
            <li>tu jakies itemki</li>
          </div>
          <div className="flex flex-row items-center gap-4 ">
            <SignedOut>
              <SignInButton>
                <Button>Zaloguj się</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton userProfileUrl="/profile" />
            </SignedIn>
            <Button variant="outline">Dodaj zajęcia</Button>
          </div>
        </div>
      )}
    </>
  )
}
