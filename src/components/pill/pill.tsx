"use client"
import Image from "next/image"
import { useState } from "react"
import { Icons } from "~/components/icons"

type Props = {
  item: {
    name?: string
    title: string
    address: string
    avatar: string
  }
}

export function Pill({ item }: Props) {
  const { name, title, address, avatar } = item
  const [bookmark, setBookmark] = useState(false)

  const handleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div className="relative flex items-center gap-4 rounded-2xl border-2 border-secondary p-2 mt-2 hover:shadow-md cursor-pointer">
     <div className="relative w-[80px] h-[80px]">
        <Image
          src={avatar}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        {
          name && (
            <div className="flex items-center gap-1">
              <Icons.map className="h-4 w-4" />
              <p className="text-foregroundMuted text-xs">{name}</p>
            </div>
          )
        }
        {
          <div className="flex items-center gap-1 pt-1">
            <Icons.store className="h-4 w-4" />
            <p className="text-foregroundMuted text-xs">{address}</p>
          </div>
        }

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
