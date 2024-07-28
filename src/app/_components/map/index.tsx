"use client"

import { Suspense, useEffect } from "react"
import { Layer, Map as MapGL, NavigationControl, Source } from "react-map-gl"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { default as layers } from "protomaps-themes-base"
import { Protocol } from "pmtiles"
import { type CircleLayerSpecification } from "mapbox-gl"

import "./style.css"
import { useFetch } from "~/app/_hooks/useFetch"
import { ENDPOINTS } from "~/lib/const"
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [18.6435, 54.352] },
    },
  ],
}

const layerStyle: CircleLayerSpecification = {
  source: "my-data",
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
  },
}
interface MapType {
  success: boolean
  data: {
    file: string
  }
}
export function Map() {
  const {
    data: map,
    isLoading,
    isError,
  } = useFetch<MapType>({
    url: `${ENDPOINTS.MAP}`,
  })
  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  return (
    <Suspense fallback={<PlaceholderMap />}>
      <div className="mb-6  h-full w-full rounded-2xl">
        {isError || isLoading || map === undefined || map.success === false ? (
          <PlaceholderMap />
        ) : (
          <MapGL
            reuseMaps
            initialViewState={{
              longitude: 18.6435,
              latitude: 54.352,
              zoom: 12,
            }}
            mapStyle={{
              version: 8,
              glyphs:
                "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
              sources: {
                protomaps: {
                  attribution:
                    '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
                  type: "vector",
                  url: `pmtiles://${map.data.file}`,
                },
              },
              // @ts-expect-error it is what is is
              layers: layers("protomaps", "light"),
            }}
            // @ts-expect-error it is what is is
            mapLib={maplibregl}
          >
            <NavigationControl />
            <Source id="my-data" type="geojson" data={geojson}>
              <Layer {...layerStyle} />
            </Source>
          </MapGL>
        )}
      </div>
    </Suspense>
  )
}

export function PlaceholderMap() {
  return (
    <div className="h-[200px] w-full animate-pulse rounded-2xl bg-secondary xl:h-full">
      <div className="h-full w-full rounded-2xl" />
    </div>
  )
}
