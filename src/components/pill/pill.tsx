"use client"
import Image from "next/image"
import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Icons } from "~/components/icons"
import { MOBILE_BREAKPOINT } from "~/lib/const"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { IconWithText } from "../ui/icon-text"
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
          <IconWithText text={location?.address?.addressLine}>
            <Icons.map />
          </IconWithText>
        )}
        {
          <IconWithText text={provider?.name}>
            <Icons.store />
          </IconWithText>
        }
      </div>
      {/* <button onClick={handleBookmark}>
        <Icons.badge
          className="absolute right-[10px] top-[-15px] size-8"
          color={bookmark ? "#E74C3C" : "#FFFEFB"}
        />{" "}
      </button> */}
      <div className="absolute right-[10px] top-[5px] ">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger onClick={handleBookmark}>
              <Icons.paw
                className="size-8"
                color={"#ecdec8"}
                fill={bookmark ? "#ecdec8" : "#FFFEFB"}
                strokeWidth={1.5}
              />{" "}
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
