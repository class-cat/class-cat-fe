"use client"

import { Suspense, useEffect, useState, useCallback, useMemo } from "react"
import { Layer, Map as MapGL, Source, Popup, type MapMouseEvent } from "react-map-gl"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { Protocol } from "pmtiles"
import Image from "next/image"
import "./style.css"
import { useFetch } from "~/app/_hooks/useFetch"
import { ENDPOINTS } from "~/lib/const"
import { type Map } from "~/types/map.type"
import { geoJson, MAP_STYLE } from "./constants"
import { createGeoJSON } from "./map-helpers"
import { MapSkeleton } from "./map-skeleton"

type MapFeature = {
  layer: { id: string }
  properties: {
    cluster_id?: number
    [key: string]: any
  }
  geometry: {
    type: string
    coordinates: [number, number]
  }
}

export function Map({ data }: any) {
  const [popupInfo, setPopupInfo] = useState<any>(null)
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null)

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
    if (!data) return geoJson
    
    const features = data.map((item: any) => ({
      type: 'Feature',
      properties: {
        id: item.id,
        title: item.title,
        image: item.image,
        cluster: false
      },
      geometry: {
        type: 'Point',
        coordinates: [item.longitude, item.latitude]
      }
    }))

    return {
      type: 'FeatureCollection',
      features
    }
  }, [data])

  const handleClick = useCallback(
    (event: MapMouseEvent) => {
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: ["clusters", "cluster-count", "unclustered-point"],
      })

      if (features.length > 0) {
        const feature = features[0] as unknown as MapFeature
        
        if (feature.layer.id === "clusters" && feature.properties.cluster_id) {
          const clusterId = feature.properties.cluster_id
          const map = event.target
          const source = map.getSource("my-data")
          
          if (source && 'getClusterExpansionZoom' in source) {
            const geojsonSource = source as unknown as maplibregl.GeoJSONSource
            geojsonSource.getClusterExpansionZoom(clusterId)
              .then((zoom: number) => {
                map.easeTo({
                  center: feature.geometry.coordinates,
                  zoom: zoom,
                  duration: 500
                })
              })
              .catch(() => {})
          }
        } else if (feature.layer.id === "unclustered-point") {
          setPopupInfo({
            longitude: feature.geometry.coordinates[0],
            latitude: feature.geometry.coordinates[1],
            properties: feature.properties,
          })
        }
      } else if (popupInfo) {
        setPopupInfo(null)
      }
    },
    []
  )

  const handleMouseEnter = useCallback((event: MapMouseEvent) => {
    const map = event.target
    map.getCanvas().style.cursor = 'pointer'
  }, [])

  const handleMouseLeave = useCallback((event: MapMouseEvent) => {
    const map = event.target
    map.getCanvas().style.cursor = ''
    setHoveredPointId(null)
  }, [])

  const handleMouseMove = useCallback((event: MapMouseEvent) => {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ["unclustered-point"]
    })

    if (features.length > 0) {
      const feature = features[0]
      if (!feature?.properties?.id) return

      if (feature.properties.id !== hoveredPointId) {
        setHoveredPointId(feature.properties.id)
        event.target.setFeatureState(
          { source: 'my-data', id: feature.properties.id },
          { hover: true }
        )
      }
    } else if (hoveredPointId) {
      event.target.setFeatureState(
        { source: 'my-data', id: hoveredPointId },
        { hover: false }
      )
      setHoveredPointId(null)
    }
  }, [hoveredPointId])

  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  return (
    <Suspense fallback={<MapSkeleton />}>
      <div className="mb-6 size-full overflow-hidden rounded-2xl">
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            interactiveLayerIds={["clusters", "unclustered-point"]}
            cursor="pointer"
            maxPitch={0}
          >
            <Source 
              id="my-data" 
              type="geojson" 
              data={memoizedGeoJson}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
              generateId={true}
              promoteId="id"
            >
              <Layer
                id="clusters"
                type="circle"
                filter={["has", "point_count"]}
                paint={{
                  "circle-color": [
                    "step",
                    ["get", "point_count"],
                    "#51bbd6",
                    100,
                    "#f1f075",
                    750,
                    "#f28cb1"
                  ],
                  "circle-radius": [
                    "step",
                    ["get", "point_count"],
                    20,
                    100,
                    30,
                    750,
                    40
                  ],
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff"
                }}
              />
              <Layer
                id="cluster-count"
                type="symbol"
                filter={["has", "point_count"]}
                layout={{
                  "text-field": "{point_count_abbreviated}",
                  "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                  "text-size": 12
                }}
                paint={{
                  "text-color": "#ffffff"
                }}
              />
              <Layer
                id="unclustered-point"
                type="circle"
                filter={["all", ["!", ["has", "point_count"]], ["!", ["has", "cluster"]]]}
                paint={{
                  "circle-color": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    "#ff4d4d",
                    "#11b4da"
                  ],
                  "circle-radius": [
                    "case",
                    ["boolean", ["feature-state", "hover"], false],
                    10,
                    8
                  ],
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff"
                }}
              />
            </Source>
            {popupInfo && (
              <Popup
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={() => setPopupInfo(null)}
                closeOnClick={true}
                closeButton={false}
                className="custom-popup"
                anchor="bottom"
                offset={[0, -10]}
              >
                <div className="flex items-center space-x-4 bg-white p-3">
                  <Image
                    src={popupInfo.properties.image}
                    alt={popupInfo.properties.title}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-gray-800 text-left font-bold">
                      {popupInfo.properties.title}
                    </h3>
                    <p className="text-gray-600 text-left">ID: {popupInfo.properties.id}</p>
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
