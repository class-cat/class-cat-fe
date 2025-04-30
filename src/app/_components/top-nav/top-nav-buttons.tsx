"use client"

import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { MOBILE_BREAKPOINT } from "~/lib/const"
import { TopNavUserButtons } from "./top-nav-user-buttons"


export const TopNavButtons = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <div className="flex gap-8">
        <TopNavUserButtons />
        {isMobile ? (
          <Button size="icon" onClick={handleMenu}>
            <Icons.menu />
          </Button>
        ) : null}
      </div>
      {isMobile && isMenuOpen && (
        <div className="absolute right-0 top-[80px] z-50 h-[calc(100vh-80px)] w-full animate-slide-in  border-t-2 border-primary bg-secondary p-4 shadow-md">
          <div>
          </div>
        </div>
      )}
    </>
  )
}
