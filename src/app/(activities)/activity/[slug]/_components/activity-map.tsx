'use client'


import { Map } from "~/app/_components/map"
import { MobileMap } from "~/app/_components/map/mobileMap"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { MOBILE_BREAKPOINT } from "~/lib/const"

export default function ActivityMap() {
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  return isMobile ? <MobileMap /> : <Map />
}

