"use client"

import Image from "next/image"
import { useState } from "react"
import { Icons } from "~/components/icons"
import { ROUTES } from "~/lib/const"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import Link from "next/link"

export function Pill(props: any) {
  const { slug, name, location, primaryImage, description } = props
  const [bookmark, setBookmark] = useState(false)

  const handleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div className="relative flex h-[110px] items-start gap-3 rounded-2xl border-2 border-secondary p-1.5  hover:shadow-sm sm:h-[150px] sm:gap-4 sm:p-2">
      {/* Left Image */}
      <Link
        prefetch={true}
        href={{
          pathname: `${ROUTES.ACTIVITY}/${slug}`,
        }}
        className="relative h-[94px] w-[120px] shrink-0 cursor-pointer overflow-hidden rounded-lg sm:h-[129px] sm:w-[150px]"
      >
        {primaryImage?.file ? (
          <Image
            src={primaryImage.file}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <div className="bg-muted absolute inset-0 flex size-full items-center justify-center">
            <Icons.placeholder className="size-full" />
          </div>
        )}
      </Link>

      {/* Right Content */}
      <div className="flex h-full min-w-0 grow flex-col justify-between">
        {/* Top Content */}
        <div className="flex flex-col gap-1">
          {/* Title - Fixed height */}
          <Link
            prefetch={true}
            href={{
              pathname: `${ROUTES.ACTIVITY}/${slug}`,
            }}
            className="flex h-[25px] w-[calc(100%-40px)] cursor-pointer items-center"
          >
            <h3 className="truncate text-sm font-semibold leading-none text-foreground transition-colors hover:text-primary sm:text-base">
              {name}
            </h3>
          </Link>

          {/* Description - Fixed height */}
          <div className="flex h-[24px] items-start sm:h-[36px] sm:w-[calc(100%-40px)]">
            {description ? (
              <p className="line-clamp-2 text-xs leading-tight text-foregroundMuted sm:text-sm">
                {description}
              </p>
            ) : (
              <div className="h-full"></div>
            )}
          </div>
        </div>

        {/* Address Badge - Below provider */}
        {location?.address?.addressLine && (
          <div className="mt-1 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full border-0 bg-primary/50 px-2 py-1 text-xs font-medium text-white`}
            >
              {location.address.addressLine}
            </span>
          </div>
        )}
      </div>

      {/* Bookmark Button */}
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
