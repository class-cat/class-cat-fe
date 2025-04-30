import React from "react"
import { Icons } from "../icons"

export default function PlaceholderPill() {
  return (
    <div className="relative  flex cursor-pointer items-center gap-2 rounded-2xl border-2 border-secondary p-2 hover:shadow-sm sm:gap-4">
      <div className="relative size-[50px] animate-pulse overflow-hidden rounded-lg sm:size-[80px]">
        <div className="animate-pulse-slow absolute inset-0 bg-secondary opacity-50"></div>
      </div>
      <div className="flex-1">
        <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-secondary opacity-50"></div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-1/2 animate-pulse rounded bg-secondary opacity-50"></div>
        </div>
        <div className="flex items-center gap-1 pt-1">
          <div className="h-3 w-1/2 animate-pulse rounded bg-secondary opacity-50"></div>
        </div>
      </div>
      <div className="absolute right-2 top-2">
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
