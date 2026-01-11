"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import maplibregl from "maplibre-gl"
import {
  Layer,
  Map as MapGL,
  Popup,
  Source,
  type MapMouseEvent,
  type MapRef,
} from "react-map-gl/maplibre"

import "maplibre-gl/dist/maplibre-gl.css"
import "./style.css"

import { useRouter } from "next/navigation"
import { useFavorites } from "~/app/_hooks/useFavorites"
import { Icons } from "~/components/icons"
import type { GeoJSON } from "geojson"
import { ArrowRight, Heart } from "lucide-react"
import { Protocol } from "pmtiles"
import layersDefault from "protomaps-themes-base"

import { getCategoryIcon } from "./category-icons"
import { EnhancedMapControls } from "./enhanced-map-controls"
import { handleClusterClick, handlePointClick } from "./map-click-handlers"
import type { Place } from "./map-helpers"
import { extractImageUrl } from "./map-helpers"
import { registerMapIcons } from "./map-icon-utils"
import { calculatePopupPosition } from "./map-popup-utils"
import { createCategoryLayers, getMapStyle, type StyleKey } from "./map-styles"
import type { ViewportState } from "./types/viewport.types"

// Register PMTiles protocol
let protocolRegistered = false
if (typeof window !== "undefined" && !protocolRegistered) {
  const protocol = new Protocol()
  maplibregl.addProtocol("pmtiles", protocol.tile)
  protocolRegistered = true
}

interface InteractiveMapProps {
  places: Place[]
  selectedPlace?: Place | null
  onPlaceSelect?: (place: Place | null) => void
  viewport: ViewportState
  onViewportChange: (viewport: ViewportState) => void
  mapStyleConfig?: { data?: { file?: string } }
  styleKey?: StyleKey
  singlePoint?: {
    latitude: number
    longitude: number
    title?: string
    image?: string
    slug?: string
  }
}

export function InteractiveMap({
  places,
  onPlaceSelect,
  viewport,
  onViewportChange,
  mapStyleConfig,
  styleKey = "cartoVoyager",
  singlePoint,
}: InteractiveMapProps) {
  const mapRef = useRef<MapRef>(null)
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [popupPosition, setPopupPosition] = useState<{
    anchor: string
    offset: [number, number]
  }>({ anchor: "top", offset: [0, -10] })
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites()
  const router = useRouter()

  // Available themes in protomaps-themes-base: light, dark, white, grayscale, black, contrast
  const AVAILABLE_THEMES = [
    "light",
    "dark",
    "white",
    "grayscale",
    "black",
    "contrast",
  ] as const

  // Helper function to safely get layers with fallback
  const getLayersSafely = useCallback((themeName: string): any[] | null => {
    // Check if layersDefault is available and is a function
    if (typeof layersDefault !== "function") {
      console.error("layersDefault is not a function")
      return null
    }

    // Validate theme name exists
    if (!AVAILABLE_THEMES.includes(themeName as any)) {
      console.warn(
        `Theme "${themeName}" is not available. Available themes: ${AVAILABLE_THEMES.join(", ")}`
      )
      return null
    }

    try {
      const layers = layersDefault("protomaps", themeName, "en")
      // Validate that layers is an array and not empty
      if (Array.isArray(layers) && layers.length > 0) {
        return layers
      }
      return null
    } catch (error) {
      console.warn(`Theme "${themeName}" failed to load:`, error)
      return null
    }
  }, [])

  // Create dynamic map style based on incoming style key or PMTiles config
  // Prioritize styleKey (Carto styles) over PMTiles
  const mapStyle = useMemo(() => {
    // If styleKey is provided, use Carto style (Voyager, Dark, etc.)
    if (styleKey) {
      return getMapStyle(styleKey)
    }

    // Otherwise, fall back to PMTiles if available
    if (mapStyleConfig?.data?.file) {
      // Use PMTiles style from config
      // Try light first (closest to positron), then dark, then white as fallbacks
      let layers = getLayersSafely("light")

      if (!layers) {
        console.warn("Light theme not available, falling back to dark theme")
        layers = getLayersSafely("dark")
      }

      if (!layers) {
        console.warn("Dark theme not available, falling back to white theme")
        layers = getLayersSafely("white")
      }

      // If all themes fail, use empty layers array as last resort
      if (!layers) {
        console.error("All protomaps themes failed to load, using empty layers")
        layers = []
      }

      return {
        version: 8,
        glyphs:
          "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
        sources: {
          protomaps: {
            attribution:
              '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
            type: "vector",
            url: `pmtiles://${mapStyleConfig.data.file}`,
          },
        },
        layers: layers,
      }
    }

    // Final fallback to default style
    return getMapStyle("cartoVoyager")
  }, [styleKey, mapStyleConfig, getLayersSafely])

  // Extract unique icon keys from places - memoized to avoid recalculation
  const iconKeys = useMemo(() => {
    const keys = new Set<string>()
    places.forEach((place) => {
      const categorySlug = place.categories?.[0]?.slug || "other"
      keys.add(categorySlug)
    })
    if (singlePoint) {
      keys.add("other")
    }
    return keys
  }, [places, singlePoint])

  // Group places by category for category-based clustering
  const geojsonDataByCategory = useMemo(() => {
    const dataByCategory = new Map<string, GeoJSON.Feature[]>()

    // Process places
    places
      .filter((place) => {
        const lat = place.latitude
        const lon = place.longitude
        return (
          lat !== null && lat !== undefined && lon !== null && lon !== undefined
        )
      })
      .forEach((place) => {
        const categorySlug = place.categories?.[0]?.slug || "other"

        const feature: GeoJSON.Feature = {
          type: "Feature",
          properties: {
            id: place.id,
            slug: place.slug,
            name: place.name,
            icon: categorySlug, // For unclustered points
            clusterIcon: categorySlug, // For clusters - same as icon since all points in cluster have same category
            categorySlug: categorySlug,
            categories: place.categories || [],
            primaryImageFile: place.primaryImage?.file || null,
            provider: place.provider,
            description: place.description,
          },
          geometry: {
            type: "Point",
            coordinates: [place.longitude, place.latitude] as [number, number],
          },
        }

        if (!dataByCategory.has(categorySlug)) {
          dataByCategory.set(categorySlug, [])
        }
        dataByCategory.get(categorySlug)!.push(feature)
      })

    // Add single point if provided
    if (singlePoint) {
      const feature: GeoJSON.Feature = {
        type: "Feature",
        properties: {
          id: "single-point",
          slug: singlePoint.slug || "",
          name: singlePoint.title || "",
          icon: "other",
          clusterIcon: "other",
          categorySlug: "other",
          categories: [],
          primaryImageFile: singlePoint.image || null,
          provider: undefined,
          description: undefined,
        },
        geometry: {
          type: "Point",
          coordinates: [singlePoint.longitude, singlePoint.latitude] as [
            number,
            number,
          ],
        },
      }

      if (!dataByCategory.has("other")) {
        dataByCategory.set("other", [])
      }
      dataByCategory.get("other")!.push(feature)
    }

    // Convert to FeatureCollections
    const result = new Map<string, GeoJSON.FeatureCollection>()
    dataByCategory.forEach((features, category) => {
      result.set(category, {
        type: "FeatureCollection",
        features,
      })
    })

    return result
  }, [places, singlePoint])

  // Memoized popup position calculator
  const getPopupPosition = useCallback((place: Place) => {
    const map = mapRef.current?.getMap() ?? null
    return calculatePopupPosition(map, place)
  }, [])

  // Optimized map click handler
  const onMapClick = useCallback(
    (event: MapMouseEvent) => {
      const map = mapRef.current?.getMap()
      if (!map) return

      // Try cluster click first
      if (handleClusterClick(event, map, viewport, onViewportChange)) {
        return
      }

      // Try point click
      if (
        handlePointClick(
          event,
          map,
          onPlaceSelect,
          setSelectedPlace,
          setPopupPosition,
          getPopupPosition
        )
      ) {
        return
      }

      // Close popup when clicking on map
      setSelectedPlace(null)
      if (onPlaceSelect) {
        onPlaceSelect(null)
      }
    },
    [viewport, onViewportChange, onPlaceSelect, getPopupPosition]
  )

  // Recalculate popup position when viewport changes
  useEffect(() => {
    if (selectedPlace) {
      const position = getPopupPosition(selectedPlace)
      setPopupPosition(position)
    }
  }, [viewport, selectedPlace, getPopupPosition])

  // Handle mouse enter on unclustered points to show cursor pointer
  const onMouseEnter = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (map) {
      map.getCanvas().style.cursor = "pointer"
    }
  }, [])

  // Handle mouse leave to reset cursor
  const onMouseLeave = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (map) {
      map.getCanvas().style.cursor = ""
    }
  }, [])

  // Register icons when map style or data changes - single unified effect
  useEffect(() => {
    const map = mapRef.current?.getMap()
    if (!map) return

    // Register all icons (including badge)
    registerMapIcons(map, iconKeys).catch(console.error)

    // Handle style changes and missing images
    const handleStyleData = () => {
      registerMapIcons(map, iconKeys).catch(console.error)
    }

    const handleStyleImageMissing = (e: { id: string }) => {
      if (iconKeys.has(e.id)) {
        registerMapIcons(map, iconKeys).catch(console.error)
      }
    }

    map.on("styledata", handleStyleData)
    map.on("styleimagemissing", handleStyleImageMissing)

    return () => {
      map.off("styledata", handleStyleData)
      map.off("styleimagemissing", handleStyleImageMissing)
    }
  }, [iconKeys, mapStyle])

  // Register icons on map load
  const handleMapLoad = useCallback(() => {
    const map = mapRef.current?.getMap()
    if (map) {
      registerMapIcons(map, iconKeys).catch(console.error)
    }
  }, [iconKeys])

  return (
    <div className="h-full w-full">
      <MapGL
        ref={mapRef}
        {...viewport}
        onMove={(evt) => onViewportChange(evt.viewState)}
        onClick={onMapClick}
        mapLib={maplibregl}
        mapStyle={mapStyle as any}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        dragPan={true}
        dragRotate={false}
        scrollZoom={true}
        touchZoomRotate={true}
        keyboard={true}
        doubleClickZoom={true}
        minZoom={8}
        maxZoom={18}
        interactiveLayerIds={Array.from(geojsonDataByCategory.keys()).flatMap(
          (category) => [
            `clusters-icon-${category}`,
            `unclustered-point-symbol-${category}`,
          ]
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onLoad={handleMapLoad}
      >
        {/* Places data sources with category-based clustering */}
        {Array.from(geojsonDataByCategory.entries()).map(([category, data]) => {
          const sourceId = `source-${category}`
          const layers = createCategoryLayers(sourceId, category)

          return (
            <Source
              key={sourceId}
              id={sourceId}
              type="geojson"
              data={data}
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              {/* Cluster icon - category icon */}
              <Layer {...layers.clusterIconLayer} />

              {/* Cluster count badge - small circle in top right */}
              <Layer {...layers.clusterCountBadgeLayer} />

              {/* Cluster count text - number in badge */}
              <Layer {...layers.clusterCountLayer} />

              {/* Image symbols for unclustered points */}
              <Layer {...layers.unclusteredPointSymbolLayer} />
            </Source>
          )
        })}

        {/* Popup for selected place */}
        {selectedPlace && (
          <Popup
            longitude={selectedPlace.longitude}
            latitude={selectedPlace.latitude}
            anchor={popupPosition.anchor as any}
            onClose={() => {
              setSelectedPlace(null)
              if (onPlaceSelect) {
                onPlaceSelect(null)
              }
            }}
            closeButton={false}
            closeOnClick={false}
            maxWidth="350px"
            offset={popupPosition.offset}
          >
            <div className="relative flex gap-2 p-2">
              {/* Like button at top right */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (isFavorite(selectedPlace.slug)) {
                    removeFromFavorites(selectedPlace.slug)
                  } else {
                    addToFavorites({
                      slug: selectedPlace.slug,
                      name: selectedPlace.name,
                      location: "",
                      primaryImage: selectedPlace.primaryImage,
                      description: selectedPlace.description,
                    })
                  }
                }}
                className={`absolute top-2 right-2 z-10 rounded-full p-1.5 transition-all hover:scale-110 ${
                  isFavorite(selectedPlace.slug)
                    ? "bg-red-50 text-red-600 shadow-sm hover:bg-red-100"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                }`}
                aria-label={
                  isFavorite(selectedPlace.slug)
                    ? "Usuń z ulubionych"
                    : "Dodaj do ulubionych"
                }
              >
                <Heart
                  className={`h-4 w-4 ${isFavorite(selectedPlace.slug) ? "fill-current" : ""}`}
                />
              </button>

              {/* Column 1: Image */}
              <div className="relative size-24 flex-shrink-0 overflow-hidden rounded-lg">
                {(() => {
                  // Get image URL - handle nested JSON strings and object format
                  const rawImageValue =
                    selectedPlace.primaryImage?.file ||
                    selectedPlace.primaryImage
                  const imageUrl = extractImageUrl(rawImageValue)

                  return imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={selectedPlace.name}
                      fill
                      className=""
                      unoptimized
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gray-50">
                      <Icons.placeholder className="size-12 text-gray-400" />
                    </div>
                  )
                })()}
              </div>

              {/* Column 2: Text content */}
              <div className="flex min-w-0 flex-1 flex-col pr-8">
                {/* Name */}
                <h3 className="mb-2 line-clamp-2 text-base leading-tight font-bold text-gray-900">
                  {selectedPlace.name}
                </h3>

                {/* Category icons */}
                {(() => {
                  const categories = selectedPlace.categories
                  if (
                    !categories ||
                    !Array.isArray(categories) ||
                    categories.length === 0
                  ) {
                    return null
                  }

                  return (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {categories
                        .filter(
                          (cat) => cat && typeof cat === "object" && cat.slug
                        )
                        .map((category, index) => {
                          const categoryIcon = getCategoryIcon(category.slug)
                          const IconComponent = categoryIcon.icon
                          return (
                            <div
                              key={`${category.slug}-${index}`}
                              className="flex size-6 items-center justify-center rounded-full [&>svg]:stroke-white [&>svg]:text-white"
                              style={{ backgroundColor: categoryIcon.color }}
                              title={category.name || category.slug}
                            >
                              <IconComponent size={12} stroke={2} />
                            </div>
                          )
                        })}
                    </div>
                  )
                })()}

                {/* Description - max 2 lines */}
                {selectedPlace.description && (
                  <p className="line-clamp-3 text-xs leading-relaxed text-gray-600">
                    {selectedPlace.description}
                  </p>
                )}
              </div>

              {/* Column 3: Action button */}
              <div className="flex flex-shrink-0 flex-col items-center justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    if (selectedPlace.slug) {
                      router.push(`/activity/${selectedPlace.slug}`)
                      setSelectedPlace(null)
                    }
                  }}
                  className="bg-primary hover:bg-primary/90 flex items-center justify-center rounded-full p-1 text-white shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
                  aria-label="Zobacz szczegóły"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          </Popup>
        )}

        <EnhancedMapControls
          viewport={viewport}
          onViewportChange={onViewportChange}
        />
      </MapGL>
    </div>
  )
}
