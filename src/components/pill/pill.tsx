"use client"
import Image from "next/image"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { MOBILE_BREAKPOINT } from "~/lib/const"
// import { Activity } from "~/types/search.type"

export function Pill(props: any) {
  const { name, location, provider, primary_image } = props
  const [bookmark, setBookmark] = useState(false)

  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const handleBookmark = () => {
    setBookmark(!bookmark)
  }

  return (
    <div className="relative mt-2 flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-secondary p-2 hover:shadow-md">
      <div className="relative size-[50px] sm:size-[80px]">
        {primary_image?.file ? (
          <Image
            src={primary_image?.file}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <Icons.placeholder />
        )}
      </div>
      <div>
        <p className="font-medium">{name || "Siatkówka dla klas 1-3"}</p>
        {name && !isMobile && (
          <div className="flex items-center gap-1">
            <Icons.map className="size-4" />
            <p className="text-xs text-foregroundMuted">
              {location.address.address_line || "Gdańsk, Dragana 2"}
            </p>
          </div>
        )}
        {
          <div className="flex items-center gap-1 pt-1">
            <Icons.store className="size-4" />
            <p className="text-xs text-foregroundMuted">
              {provider?.name || "Szkoła podstawowa nr 8"}
            </p>
          </div>
        }
      </div>
      <button onClick={handleBookmark}>
        <Icons.badge
          className="absolute right-[10px] top-[-15px] size-8"
          color={bookmark ? "#E74C3C" : "#FFFEFB"}
        />{" "}
      </button>
    </div>
  )
}
