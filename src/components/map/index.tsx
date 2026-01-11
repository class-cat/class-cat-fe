"use client"

import { Suspense, useMemo, useState } from "react"
import { useFetch } from "~/app/_hooks/useFetch"
import { ENDPOINTS } from "~/lib/const"
import { type Map as MapType } from "~/types/map.type"

import { InteractiveMap } from "./interactive-map"
import {
  transformMapPointsToPlaces,
  type MapPointApiResponse,
  type Place,
} from "./map-helpers"
import { MapSkeleton } from "./map-skeleton"
import type { ViewportState } from "./types/viewport.types"

export function Map({
  singlePoint,
}: {
  singlePoint?: {
    latitude: number
    longitude: number
    title?: string
    image?: string
    slug?: string
  }
}) {
  // Fetch map source (tiles)
  const {
    data: map,
    isLoading: isMapLoading,
    isError: isMapError,
  } = useFetch<MapType>({
    url: `${ENDPOINTS.MAP}`,
  })

  // Fetch points (markers)
  const {
    data: pointsData,
    isLoading: isPointsLoading,
    isError: isPointsError,
  } = useFetch<MapPointApiResponse>({
    url: ENDPOINTS.SEARCH.MAP,
    params: {
      distance: 0.1,
    },
  })

  // Convert API data to places format
  const places = useMemo<Place[]>(() => {
    return transformMapPointsToPlaces(pointsData)
  }, [pointsData])

  // Initialize viewport state
  const [viewport, setViewport] = useState<ViewportState>({
    longitude: singlePoint?.longitude ?? 18.6435,
    latitude: singlePoint?.latitude ?? 54.352,
    zoom: singlePoint ? 14 : 12,
  })

  return (
    <Suspense fallback={<MapSkeleton />}>
      <div className="mb-6 size-full overflow-hidden sm:rounded-lg xl:rounded-2xl">
        {isMapError ||
        isMapLoading ||
        isPointsError ||
        isPointsLoading ||
        map === undefined ||
        map.success === false ? (
          <MapSkeleton />
        ) : (
          <InteractiveMap
            places={places}
            viewport={viewport}
            onViewportChange={setViewport}
            mapStyleConfig={map}
            singlePoint={singlePoint}
          />
        )}
      </div>
    </Suspense>
  )
}
