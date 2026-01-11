"use client"

import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { Map } from "~/components/map"
import { MapMobile } from "~/components/map/map-mobile"
import { MOBILE_BREAKPOINT } from "~/lib/const"

export const ActivityMap = ({
  latitude,
  longitude,
  title,
  image,
  slug,
}: {
  latitude?: number | null
  longitude?: number | null
  title?: string
  image?: string
  slug?: string
}) => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const hasPoint =
    latitude !== null &&
    latitude !== undefined &&
    longitude !== null &&
    longitude !== undefined

  const singlePoint = hasPoint
    ? {
        latitude: latitude as number,
        longitude: longitude as number,
        title,
        image,
        slug,
      }
    : undefined

  return isMobile ? (
    <MapMobile singlePoint={singlePoint} />
  ) : (
    <Map singlePoint={singlePoint} />
  )
}
