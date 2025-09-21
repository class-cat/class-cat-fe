"use client"

import {
  Suspense,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react"
import {
  Layer,
  Map as MapGL,
  Source,
  Popup,
  type MapMouseEvent,
} from "react-map-gl"
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
import { useRouter } from "next/navigation"
import { Icons } from "~/components/icons"

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
  const [popupInfo, setPopupInfo] = useState<any>(null)
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null)
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const mapRef = useRef<any>(null)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const router = useRouter()

  // popup placement state
  const [popupAnchor, setPopupAnchor] = useState<
    | "center"
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
  >("bottom")
  const [popupOffset, setPopupOffset] = useState<[number, number]>([-30, -10])

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
      return (
        lat !== null && lat !== undefined && lon !== null && lon !== undefined
      )
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
          id: "default-marker",
          url: "/defaultcat.png",
        },
        {
          id: "activity-marker",
          url: "/defaultcat.png",
        },
        {
          id: "hover-marker",
          url: "/defaultcat.png",
        },
      ]

      // Load each image
      const imagePromises = markerImages.map(({ id, url }) => {
        return new Promise((resolve) => {
          mapInstance.loadImage(url, (error: any, image: any) => {
            if (error) {
              console.warn(`Failed to load image ${id}:`, error)
              // Fallback: create a simple colored circle as image
              const canvas = document.createElement("canvas")
              canvas.width = 32
              canvas.height = 32
              const ctx = canvas.getContext("2d")!
              ctx.fillStyle = id === "hover-marker" ? "#ff4d4d" : "#11b4da"
              ctx.beginPath()
              ctx.arc(16, 16, 14, 0, 2 * Math.PI)
              ctx.fill()
              ctx.strokeStyle = "#fff"
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
      console.error("Error loading marker images:", error)
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

          if (source && "getClusterExpansionZoom" in source) {
            const geojsonSource = source as unknown as maplibregl.GeoJSONSource
            geojsonSource
              .getClusterExpansionZoom(clusterId)
              .then((zoom: number) => {
                map.easeTo({
                  center: feature.geometry.coordinates,
                  zoom: zoom,
                  duration: 500,
                })
              })
              .catch(() => {})
          }
        } else if (
          feature.layer.id === "unclustered-point" ||
          feature.layer.id === "unclustered-point-image"
        ) {
          const slug = feature.properties.slug
          if (slug) {
            router.push(`/activity/${slug}`)
            return
          }
          // Fallback: show popup if slug missing
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
    [popupInfo, getQueryLayers, router]
  )

  const handleMouseEnter = useCallback((event: MapMouseEvent) => {
    const map = event.target
    map.getCanvas().style.cursor = "pointer"
  }, [])

  const handleMouseLeave = useCallback(
    (event: MapMouseEvent) => {
      const map = event.target
      map.getCanvas().style.cursor = ""
      if (hoveredPointId) {
        map.setFeatureState(
          { source: "my-data", id: hoveredPointId },
          { hover: false }
        )
      }
      setHoveredPointId(null)
      setPopupInfo(null)
      setSelectedSlug(null)
    },
    [hoveredPointId]
  )

  const handleMouseMove = useCallback(
    (event: MapMouseEvent) => {
      // Only query the appropriate point layer based on current state
      const pointLayer = imagesLoaded
        ? "unclustered-point-image"
        : "unclustered-point"
      const features = event.target.queryRenderedFeatures(event.point, {
        layers: [pointLayer],
      })

      if (features.length > 0) {
        const feature = features[0] as any
        if (!feature?.properties?.id) return

        // Reset previous hovered feature state when switching points
        if (hoveredPointId && feature.properties.id !== hoveredPointId) {
          event.target.setFeatureState(
            { source: "my-data", id: hoveredPointId },
            { hover: false }
          )
        }

        if (feature.properties.id !== hoveredPointId) {
          setHoveredPointId(feature.properties.id)
          event.target.setFeatureState(
            { source: "my-data", id: feature.properties.id },
            { hover: true }
          )
        }

        // Show popup on hover for single points
        const coordinates = feature.geometry?.coordinates
        const properties = feature.properties
        if (properties?.slug && coordinates) {
          if (properties.slug !== selectedSlug) {
            setSelectedSlug(properties.slug)
          }
          setPopupInfo({
            longitude: coordinates[0],
            latitude: coordinates[1],
            properties,
          })
        }
      } else if (hoveredPointId) {
        event.target.setFeatureState(
          { source: "my-data", id: hoveredPointId },
          { hover: false }
        )
        setHoveredPointId(null)
        setPopupInfo(null)
        setSelectedSlug(null)
      }
    },
    [hoveredPointId, imagesLoaded, selectedSlug]
  )

  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  // Compute popup anchor/offset so it stays visible without panning the map
  const computePopupPlacement = useCallback(() => {
    if (!popupInfo || !mapRef.current) return
    const map = mapRef.current.getMap()
    if (!map) return

    const container = map.getContainer()
    const width = container.clientWidth
    const height = container.clientHeight

    const POPUP_WIDTH = 260
    const POPUP_HEIGHT = 60
    const MARGIN = 16

    const pt = map.project([popupInfo.longitude, popupInfo.latitude])

    const nearLeft = pt.x < POPUP_WIDTH / 2 + MARGIN
    const nearRight = width - pt.x < POPUP_WIDTH / 2 + MARGIN
    const nearTop = pt.y < POPUP_HEIGHT + MARGIN
    const nearBottom = height - pt.y < POPUP_HEIGHT + MARGIN

    let anchor:
      | "center"
      | "top"
      | "bottom"
      | "left"
      | "right"
      | "top-left"
      | "top-right"
      | "bottom-left"
      | "bottom-right" = "bottom"

    // Prefer vertical correction first (popup normally sits above the point)
    if (nearTop && nearLeft) anchor = "top-left"
    else if (nearTop && nearRight) anchor = "top-right"
    else if (nearBottom && nearLeft) anchor = "bottom-left"
    else if (nearBottom && nearRight) anchor = "bottom-right"
    else if (nearTop) anchor = "top"
    else if (nearBottom) anchor = "bottom"
    else if (nearLeft) anchor = "left"
    else if (nearRight) anchor = "right"

    // Offsets to visually align with marker icon (default was [-30, -10])
    const baseX = -30
    const tip = 10

    let offset: [number, number] = [-30, -10]
    switch (anchor) {
      case "top":
        offset = [baseX, tip]
        break
      case "bottom":
        offset = [baseX, -tip]
        break
      case "left":
        offset = [tip, -10]
        break
      case "right":
        offset = [-tip, -10]
        break
      case "top-left":
        offset = [tip, tip]
        break
      case "top-right":
        offset = [-tip, tip]
        break
      case "bottom-left":
        offset = [tip, -tip]
        break
      case "bottom-right":
        offset = [-tip, -tip]
        break
      default:
        offset = [baseX, -10]
    }

    setPopupAnchor(anchor)
    setPopupOffset(offset)
  }, [popupInfo])

  useEffect(() => {
    computePopupPlacement()
    if (!mapRef.current) return
    const map = mapRef.current.getMap()
    if (!map) return
    const handler = () => computePopupPlacement()
    map.on("move", handler)
    map.on("resize", handler)
    return () => {
      map.off("move", handler)
      map.off("resize", handler)
    }
  }, [computePopupPlacement])

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
          <MapGL
            ref={mapRef}
            reuseMaps
            initialViewState={{
              longitude: singlePoint?.longitude ?? 18.6435,
              latitude: singlePoint?.latitude ?? 54.352,
              zoom: singlePoint ? 14 : 12,
              bearing: 0,
            }}
            mapStyle={mapStyle as any}
            mapLib={maplibregl as any}
            onLoad={handleMapLoad}
            attributionControl={false}
            interactiveLayerIds={
              memoizedGeoJson.features && memoizedGeoJson.features.length > 0
                ? getInteractiveLayers()
                : []
            }
            onClick={
              memoizedGeoJson.features && memoizedGeoJson.features.length > 0
                ? handleClick
                : undefined
            }
            onMouseEnter={
              memoizedGeoJson.features && memoizedGeoJson.features.length > 0
                ? handleMouseEnter
                : undefined
            }
            onMouseLeave={
              memoizedGeoJson.features && memoizedGeoJson.features.length > 0
                ? handleMouseLeave
                : undefined
            }
            onMouseMove={
              memoizedGeoJson.features && memoizedGeoJson.features.length > 0
                ? handleMouseMove
                : undefined
            }
            cursor="pointer"
            maxPitch={0}
            maxBounds={[
              [13.0, 48.5],
              [24.2, 55.2],
            ]}
          >
            <Source
              id="my-data"
              type="geojson"
              data={memoizedGeoJson}
              cluster={true}
              clusterMaxZoom={19}
              clusterRadius={100}
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
                    "#e74c3c80",
                    100,
                    "#e74c3c80",
                    750,
                    "#e74c3c80",
                  ],
                  "circle-radius": [
                    "step",
                    ["get", "point_count"],
                    20,
                    100,
                    30,
                    750,
                    40,
                  ],
                  "circle-stroke-width": 1,
                  "circle-stroke-color": "#fff",
                }}
              />
              <Layer
                id="cluster-count"
                type="symbol"
                filter={["has", "point_count"]}
                layout={{
                  "text-field": ["get", "point_count_abbreviated"],
                  "text-font": ["Noto Sans Regular"],
                  "text-size": 12,
                  "text-allow-overlap": true,
                }}
                paint={{
                  "text-color": "#ffffff",
                  "text-halo-color": "#000000",
                  "text-halo-width": 1,
                }}
              />

              {/* Image markers for individual points - only render when images are loaded */}
              {imagesLoaded && (
                <Layer
                  id="unclustered-point-image"
                  type="symbol"
                  filter={["!", ["has", "point_count"]]}
                  layout={{
                    "icon-image": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      "hover-marker",
                      "default-marker",
                    ],
                    "icon-size": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      1.2,
                      1.0,
                    ],
                    "icon-allow-overlap": true,
                    "icon-ignore-placement": true,
                  }}
                />
              )}

              {/* Fallback circle markers - only render when images aren't loaded */}
              {!imagesLoaded && (
                <Layer
                  id="unclustered-point"
                  type="circle"
                  filter={["!", ["has", "point_count"]]}
                  paint={{
                    "circle-color": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      "#ff4d4d",
                      "#e74c3c",
                    ],
                    "circle-radius": [
                      "case",
                      ["boolean", ["feature-state", "hover"], false],
                      10,
                      8,
                    ],
                    "circle-stroke-width": 1,
                    "circle-stroke-color": "#fff",
                  }}
                />
              )}
            </Source>

            {singlePoint && (
              <Source
                id="activity-point"
                type="geojson"
                data={{
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      geometry: {
                        type: "Point",
                        coordinates: [singlePoint.longitude, singlePoint.latitude],
                      },
                      properties: {
                        title: singlePoint.title ?? "",
                        image: singlePoint.image ?? "",
                        slug: singlePoint.slug ?? "",
                      },
                    },
                  ],
                }}
              >
                {imagesLoaded ? (
                  <Layer
                    id="activity-point-image"
                    type="symbol"
                    layout={{
                      "icon-image": "activity-marker",
                      "icon-size": 1.0,
                      "icon-allow-overlap": true,
                      "icon-ignore-placement": true,
                    }}
                  />
                ) : (
                  <Layer
                    id="activity-point-circle"
                    type="circle"
                    paint={{
                      "circle-color": [
                        "case",
                        ["boolean", ["feature-state", "hover"], false],
                        "#ff4d4d",
                        "#e74c3c",
                      ],
                      "circle-radius": [
                        "case",
                        ["boolean", ["feature-state", "hover"], false],
                        10,
                        8,
                      ],
                      "circle-stroke-width": 1,
                      "circle-stroke-color": "#fff",
                    }}
                  />
                )}
              </Source>
            )}

            {popupInfo && (
              <Popup
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={() => {
                  setPopupInfo(null)
                  setSelectedSlug(null)
                }}
                closeOnClick={true}
                closeButton={false}
                className="custom-popup"
                anchor={popupAnchor}
                offset={popupOffset}
                maxWidth="260px"
              >
                <div className="flex h-[60px] w-[260px] items-center space-x-2 bg-white">
                  {!isActivityLoading &&
                    !isActivityError &&
                    activityDetail?.data && (
                      <>
                        <div className="relative size-[60px] min-h-[60px] min-w-[60px] flex-none basis-[60px] overflow-hidden">
                          {activityDetail.data.primaryImage?.file ? (
                            <Image
                              src={activityDetail.data.primaryImage.file}
                              alt={
                                activityDetail.data.name ||
                                popupInfo.properties.title
                              }
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex size-full items-center justify-center rounded-lg">
                              <Icons.placeholder className="size-7" />
                            </div>
                          )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <h3 className="text-gray-800 line-clamp-2 text-left text-sm">
                            {activityDetail.data.name}
                          </h3>
                          <p className="text-gray-600 provider-name mt-1 line-clamp-1 text-left text-xs">
                            <span>
                              {activityDetail.data.provider?.name || "—"}
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
