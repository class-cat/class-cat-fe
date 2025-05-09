import { useState, useCallback, useMemo } from "react"
import { useFetch } from "~/app/_hooks/useFetch"
import { ENDPOINTS } from "~/lib/const"
import { type Map as MapType } from "~/types/map.type"
import { MAP_STYLE } from "../constants"
import type { MapPopupInfo, MapFeature } from "../types/map.types"

export const useMapData = () => {
  const [popupInfo, setPopupInfo] = useState<MapPopupInfo | null>(null)

  const {
    data: map,
    isLoading,
    isError,
    error,
  } = useFetch<MapType>({
    url: `${ENDPOINTS.MAP}`,
  })

  const mapStyle = useMemo(() => {
    if (!map?.data?.file) return MAP_STYLE
    return {
      ...MAP_STYLE,
      sources: {
        ...MAP_STYLE.sources,
        protomaps: {
          ...MAP_STYLE.sources.protomaps,
          url: `pmtiles://${map.data.file}`,
        },
      },
    }
  }, [map])

  const handleClick = useCallback(
    (event: {
      target: {
        queryRenderedFeatures: (
          point: [number, number],
          options: { layers: string[] }
        ) => MapFeature[]
      }
      point: [number, number]
    }) => {
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: ["point"],
      })

      if (features.length > 0) {
        const feature = features[0]
        if (!feature) return

        setPopupInfo((prev) => {
          if (
            prev?.longitude === feature.geometry.coordinates[0] &&
            prev?.latitude === feature.geometry.coordinates[1]
          ) {
            return prev
          }
          return {
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            properties: feature.properties,
          }
        })
      } else if (popupInfo) {
        setPopupInfo(null)
      }
    },
    [popupInfo]
  )

  const closePopup = useCallback(() => {
    setPopupInfo(null)
  }, [])

  return {
    mapStyle,
    popupInfo,
    isLoading,
    isError,
    error,
    handleClick,
    closePopup,
  }
} 