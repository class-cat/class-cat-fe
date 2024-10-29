"use client"

import Image from "next/image"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { MOBILE_BREAKPOINT, ROUTES } from "~/lib/const"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { IconWithText } from "../ui/icon-text"
import Link from "next/link"

export function Pill(props: any) {
  const { slug, name, location, provider, primaryImage } = props
  const [bookmark, setBookmark] = useState(false)

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const handleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div
      className="relative  flex  items-center gap-2 rounded-2xl border-2 border-secondary p-2 hover:shadow-sm sm:gap-4"
    >
      <Link
        href={{
          pathname: `${ROUTES.ACTIVITY}/${slug}`,
        }}
        className="relative size-[50px] shrink-0 cursor-pointer sm:size-[80px]">
        {primaryImage?.file ? (
          <Image
            src={primaryImage.file}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <Icons.placeholder className="size-full cursor-pointer" />
        )}
      </Link>
      <Link
        href={{
          pathname: `${ROUTES.ACTIVITY}/${slug}`,
        }} 
        className="flex min-w-0 grow cursor-pointer flex-col">
        <p className="truncate text-sm  font-medium sm:text-base">
          {name || "Siatkówka dla klas 1-3"}
        </p>
        {!isMobile && (
          <IconWithText text={location?.address?.addressLine}>
            <Icons.map className="size-4 shrink-0" />
          </IconWithText>
        )}
        <IconWithText text={provider?.name}>
          <Icons.store className="size-4 shrink-0" />
        </IconWithText>
      </Link>
      <div className="size-10" />
      <div className="absolute right-2 top-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleBookmark}>
              <Icons.paw
                className="size-6 sm:size-8"
                color={"#ecdec8"}
                fill={bookmark ? "#ecdec8" : "#FFFEFB"}
                strokeWidth={1.5}
              />
            </TooltipTrigger>
            <TooltipContent>
              {bookmark ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
