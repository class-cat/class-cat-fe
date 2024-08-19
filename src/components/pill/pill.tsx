"use client"
import Image from "next/image"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { MOBILE_BREAKPOINT } from "~/lib/const"
import { Activity } from "~/types/search.type"


export function Pill(props: Activity) {
  const { name, location, provider, primary_image } = props
  const [bookmark, setBookmark] = useState(false)

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const handleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div className="relative flex items-center gap-4 rounded-2xl border-2 border-secondary p-2 mt-2 hover:shadow-md cursor-pointer">
     <div className="relative w-[50px] h-[50px] sm:w-[80px] sm:h-[80px]">
        <Image
          src={primary_image?.file}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div>
        <p className="font-medium">{name}</p>
        {
          (name && !isMobile) && (
            <div className="flex items-center gap-1">
              <Icons.map className="h-4 w-4" />
              <p className="text-foregroundMuted text-xs">{location.address.address_line}</p>
            </div>
          )
        }
        {
          <div className="flex items-center gap-1 pt-1">
            <Icons.store className="h-4 w-4" />
            <p className="text-foregroundMuted text-xs">{provider?.name}</p>
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
