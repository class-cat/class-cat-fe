"use client"

import { Map } from "~/components/map"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { MOBILE_BREAKPOINT } from "~/lib/const"
import { MapMobile } from "~/components/map/map-mobile"

export const ActivityMap = () => {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  return isMobile ? <MapMobile /> : <Map/>
}
