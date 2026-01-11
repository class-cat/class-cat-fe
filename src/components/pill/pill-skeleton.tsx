import React from "react"

import { Icons } from "../icons"

export const PillSkeleton = () => {
  return (
    <div className="border-secondary relative flex h-[120px] items-start gap-3 rounded-2xl border-2 p-3 hover:shadow-sm sm:h-[150px] sm:gap-4">
      {/* Left Image Skeleton */}
      <div className="relative h-[90px] w-[120px] shrink-0 overflow-hidden rounded-lg sm:h-[121px] sm:w-[150px]">
        <div className="bg-secondary/50 absolute inset-0 animate-pulse" />
      </div>

      {/* Right Content Skeleton */}
      <div className="flex h-full min-w-0 grow flex-col justify-between">
        {/* Top Content */}
        <div className="flex flex-col gap-1">
          {/* Title - Fixed height */}
          <div className="flex h-[20px] items-center sm:h-[24px]">
            <div className="bg-secondary/50 h-3 w-[calc(100%-40px)] animate-pulse rounded" />
          </div>

          {/* Description - Fixed height */}
          <div className="flex h-[32px] w-[calc(100%-40px)] flex-col justify-between sm:h-[36px]">
            <div className="bg-secondary/50 h-3 w-full animate-pulse rounded" />
            <div className="bg-secondary/40 h-3 w-5/6 animate-pulse rounded" />
          </div>
        </div>

        {/* Bottom Badge Placeholder */}
        <div className="mt-1 flex items-center gap-2">
          <div className="bg-primary/40 h-6 w-28 animate-pulse rounded-full" />
        </div>
      </div>

      {/* Bookmark Icon */}
      <div className="absolute top-2 right-2">
        <Icons.paw
          className="size-6 sm:size-8"
          color={"#ecdec8"}
          fill={"#FFFEFB"}
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}
