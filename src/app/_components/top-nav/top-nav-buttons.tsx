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
        <div className="animate-slide-in border-primary bg-secondary absolute top-[80px] right-0 z-50 h-[calc(100vh-80px)] w-full border-t-2 p-4 shadow-md">
          <div></div>
        </div>
      )}
    </>
  )
}
