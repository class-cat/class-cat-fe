'use client'


import { Map } from "~/components/map"
import { MobileMap } from "~/components/map/map-mobile"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { MOBILE_BREAKPOINT } from "~/lib/const"

export default function ActivityMap() {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  return isMobile ? <MobileMap /> : <Map />
}

