"use client"
import { useState } from "react"
import { Icons } from "~/components/icons"

type TabPillProps = {
  item: {
    title: string
    address: string
    avatar: string
  }
}

export function TabPill({ item }: TabPillProps) {
  const { title, address, avatar } = item
  const [bookmark, setBookmark] = useState(false)

  const handleBookmark = () => {
    setBookmark(!bookmark)
  }
  return (
    <div className="relative flex items-center gap-4 rounded-2xl border-2 border-secondary p-3 mt-2">
      <img
        src={avatar}
        alt={title}
        width={65}
        height={70}
        className="rounded-2xl"
      />
      <div>
        <p className="font-medium">{title}</p>
        <div className="flex items-center gap-1">
          <Icons.map className="h-4 w-4" />
          <p className="text-foregroundMuted text-xs">{address}</p>
        </div>
      </div>
      <button onClick={handleBookmark}>
        <Icons.badge
          className="absolute right-[10px] top-[-15px] h-8 w-8"
          color={bookmark ? "#E74C3C" : "#FFFEFB"}
        />{" "}
      </button>
    </div>
  )
}
