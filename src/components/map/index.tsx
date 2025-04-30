"use client"

import { Suspense, useEffect, useState, useCallback, useMemo } from "react"
import { Layer, Map as MapGL, Source, Popup } from "react-map-gl"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { Protocol } from "pmtiles"
import Image from "next/image"
import "./style.css"
import { useFetch } from "~/app/_hooks/useFetch"
import { ENDPOINTS } from "~/lib/const"
import { type Map } from "~/types/map.type"
import { geoJson, layerStyle, MAP_STYLE } from "./map-constants"
import { createGeoJSON } from "./map-helpers"
import { MapSkeleton } from "./map-skeleton"

export function Map({ data }: any) {
  const [popupInfo, setPopupInfo] = useState<any>(null)

  const {
    data: map,
    isLoading,
    isError,
  } = useFetch<Map>({
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

  const memoizedGeoJson = useMemo(() => {
    return data ? createGeoJSON(data) : geoJson
  }, [data])

  const handleClick = useCallback(
    (event: {
      target: {
        queryRenderedFeatures: (arg0: any, arg1: { layers: string[] }) => any
      }
      point: any
    }) => {
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: ["point"],
      })

      if (features.length > 0) {
        const feature = features[0]
        setPopupInfo((prev: { longitude: any; latitude: any }) => {
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

  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  return (
    <Suspense fallback={<MapSkeleton />}>
      <div className="mb-6 size-full rounded-2xl">
        {isError || isLoading || map === undefined || map.success === false ? (
          <MapSkeleton />
        ) : (
          <MapGL
            reuseMaps
            initialViewState={{
              longitude: 18.6435,
              latitude: 54.352,
              zoom: 12,
              bearing: 0,
            }}
            mapStyle={mapStyle as any}
            mapLib={maplibregl as any}
            onClick={handleClick}
            interactiveLayerIds={["point"]}
            cursor="pointer"
            maxPitch={0}
          >
            <Source id="my-data" type="geojson" data={memoizedGeoJson}>
              <Layer {...layerStyle} />
            </Source>
            {popupInfo && (
              <Popup
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={() => setPopupInfo(null)}
                closeOnClick={false}
                className="custom-popup"
              >
                <div className="flex items-center space-x-4 p-2">
                  <Image
                    src={popupInfo.properties.image}
                    alt={popupInfo.properties.title}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-left font-bold">
                      {popupInfo.properties.title}
                    </h3>
                    <p className="text-left">ID: {popupInfo.properties.id}</p>
                  </div>
                </div>
              </Popup>
            )}
          </MapGL>
        )}
      </div>
    </Suspense>
  )
}
