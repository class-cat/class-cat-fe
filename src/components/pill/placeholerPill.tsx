import React from "react"
import { Icons } from "../icons"

export default function PlaceholderPill() {
  return (
    <div className="relative mt-2 flex items-center gap-4 rounded-2xl border-2 border-secondary p-2">
      <div className="relative size-[80px] animate-pulse overflow-hidden rounded-lg">
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
      <Icons.badge
        className="absolute right-[10px] top-[-15px] size-8"
        color={"#FFFEFB"}
      />{" "}
    </div>
  )
}
