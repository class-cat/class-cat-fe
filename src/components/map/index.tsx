"use client"

import { Suspense, useEffect, useState, useCallback, useMemo, useRef } from "react"
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

export function Map() {
  const [popupInfo, setPopupInfo] = useState<any>(null)
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const mapRef = useRef<any>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Fetch map source (tiles)
  const {
    data: map,
    isLoading: isMapLoading,
    isError: isMapError,
  } = useFetch<Map>({
    url: `${ENDPOINTS.MAP}`,
  })

  // Fetch points (markers)
  const {
    data: pointsData,
    isLoading: isPointsLoading,
    isError: isPointsError,
  } = useFetch<any>({
    url: ENDPOINTS.SEARCH.MAP,
    params: {
      distance: 0.1,
    },
  })

  // Fetch activity details by slug
  const {
    data: activityDetail,
    isLoading: isActivityLoading,
    isError: isActivityError,
  } = useFetch<any>({
    url: selectedSlug ? `${ENDPOINTS.ACTIVITIES.ROOT}${selectedSlug}` : null,
    enabled: !!selectedSlug,
  })

  console.log(pointsData) 

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

  // Filter out points with invalid coordinates before creating GeoJSON
  const memoizedGeoJson = useMemo(() => {
    if (!pointsData?.data) return geoJson
    const filtered = pointsData.data.filter((item: any) => {
      // Accepts both {lat, lon} and {latitude, longitude}
      const lat = item.latitude ?? item.lat ?? item.coordinates?.lat
      const lon = item.longitude ?? item.lon ?? item.coordinates?.lon
      return lat !== null && lat !== undefined && lon !== null && lon !== undefined
    })
    return createGeoJSON(filtered)
  }, [pointsData])

  console.log(memoizedGeoJson)

  // Load custom marker images
  const loadMarkerImages = useCallback(async () => {
    if (!mapRef.current || imagesLoaded) return

    const mapInstance = mapRef.current.getMap()
    
    try {
      // Define your marker images
      const markerImages = [
        {
          id: 'default-marker',
          url: '/defaultcat.png',
        },
        {
          id: 'activity-marker',
          url: '/defaultcat.png',
        },
        {
          id: 'hover-marker',
          url: '/defaultcat.png',
        }
      ]

      // Load each image
      const imagePromises = markerImages.map(({ id, url }) => {
        return new Promise((resolve, reject) => {
          mapInstance.loadImage(url, (error: any, image: any) => {
            if (error) {
              console.warn(`Failed to load image ${id}:`, error)
              // Fallback: create a simple colored circle as image
              const canvas = document.createElement('canvas')
              canvas.width = 32
              canvas.height = 32
              const ctx = canvas.getContext('2d')!
              ctx.fillStyle = id === 'hover-marker' ? '#ff4d4d' : '#11b4da'
              ctx.beginPath()
              ctx.arc(16, 16, 14, 0, 2 * Math.PI)
              ctx.fill()
              ctx.strokeStyle = '#fff'
              ctx.lineWidth = 2
              ctx.stroke()
              
              const imageData = ctx.getImageData(0, 0, 32, 32)
              mapInstance.addImage(id, imageData)
              resolve(true)
            } else {
              mapInstance.addImage(id, image)
              resolve(true)
            }
          })
        })
      })

      await Promise.all(imagePromises)
      setImagesLoaded(true)
    } catch (error) {
      console.error('Error loading marker images:', error)
    }
  }, [imagesLoaded])

  // Handle map load
  const handleMapLoad = useCallback(() => {
    loadMarkerImages()
  }, [loadMarkerImages])

  // Get interactive layers based on current state
  const getInteractiveLayers = useCallback(() => {
    const baseLayers = ["clusters", "cluster-count"]
    if (imagesLoaded) {
      return [...baseLayers, "unclustered-point-image"]
    } else {
      return [...baseLayers, "unclustered-point"]
    }
  }, [imagesLoaded])

  // Get query layers based on current state
  const getQueryLayers = useCallback(() => {
    const baseLayers = ["clusters", "cluster-count"]
    if (imagesLoaded) {
      return [...baseLayers, "unclustered-point-image"]
    } else {
      return [...baseLayers, "unclustered-point"]
    }
  }, [imagesLoaded])

  const handleClick = useCallback(
    (event: MapMouseEvent) => {
      const queryLayers = getQueryLayers()
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: queryLayers,
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
        } else if (feature.layer.id === "unclustered-point" || feature.layer.id === "unclustered-point-image") {
          // Always close current popup before opening a new one
          setPopupInfo(null)
          setSelectedSlug(null)
          setTimeout(() => {
            setSelectedSlug(feature.properties.slug)
            setPopupInfo({
              longitude: feature.geometry.coordinates[0],
              latitude: feature.geometry.coordinates[1],
              properties: feature.properties,
            })
          }, 0)
        }
      } else if (popupInfo) {
        setPopupInfo(null)
        setSelectedSlug(null)
      }
    },
    [popupInfo, getQueryLayers]
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
    // Only query the appropriate point layer based on current state
    const pointLayer = imagesLoaded ? "unclustered-point-image" : "unclustered-point"
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: [pointLayer]
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
  }, [hoveredPointId, imagesLoaded])

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
        {isMapError || isMapLoading || isPointsError || isPointsLoading || map === undefined || map.success === false ? (
          <MapSkeleton />
        ) : (
          <MapGL
            ref={mapRef}
            reuseMaps
            initialViewState={{
              longitude: 18.6435,
              latitude: 54.352,
              zoom: 12,
              bearing: 0,
            }}
            mapStyle={mapStyle as any}
            mapLib={maplibregl as any}
            onLoad={handleMapLoad}
            interactiveLayerIds={
              memoizedGeoJson.features && memoizedGeoJson.features.length > 0
                ? getInteractiveLayers()
                : []
            }
            onClick={memoizedGeoJson.features && memoizedGeoJson.features.length > 0 ? handleClick : undefined}
            onMouseEnter={memoizedGeoJson.features && memoizedGeoJson.features.length > 0 ? handleMouseEnter : undefined}
            onMouseLeave={memoizedGeoJson.features && memoizedGeoJson.features.length > 0 ? handleMouseLeave : undefined}
            onMouseMove={memoizedGeoJson.features && memoizedGeoJson.features.length > 0 ? handleMouseMove : undefined}
            cursor="pointer"
            maxPitch={0}
            maxBounds={[[13.0, 48.5], [24.2, 55.2]]}
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
              {/* Cluster layers remain the same */}
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
              
              {/* Image markers for individual points - only render when images are loaded */}
              {imagesLoaded && (
                <Layer
                  id="unclustered-point-image"
                  type="symbol"
                  filter={["all", ["!", ["has", "point_count"]], ["!", ["has", "cluster"]]]}
                  layout={{
                    "icon-image": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      "hover-marker",
                      "default-marker"
                    ],
                    "icon-size": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      1.2,
                      1.0
                    ],
                    "icon-allow-overlap": true,
                    "icon-ignore-placement": true
                  }}
                />
              )}
              
              {/* Fallback circle markers - only render when images aren't loaded */}
              {!imagesLoaded && (
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
              )}
            </Source>
            {popupInfo && (
              <Popup
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={() => { setPopupInfo(null); setSelectedSlug(null); }}
                closeOnClick={true}
                closeButton={false}
                className="custom-popup"
                anchor="bottom"
                offset={[-30, -10]}
              >
                <div className="flex min-h-[60px] items-center space-x-4 bg-white p-3">
                  {!isActivityLoading && !isActivityError && activityDetail?.data && (
                    <>
                      <Image
                        src={activityDetail.data.primaryImage?.file || popupInfo.properties.image}
                        alt={activityDetail.data.name || popupInfo.properties.title}
                        width={50}
                        height={50}
                        className="object-cover"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="text-gray-800 text-left">
                          {activityDetail.data.name}
                        </h3>
                        <p className="text-gray-600 provider-name mt-1 text-left text-xs">
                          <span>
                            {activityDetail.data.provider?.name || '—'}
                          </span>
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Popup>
            )}
          </MapGL>
        )}
      </div>
    </Suspense>
  )
}