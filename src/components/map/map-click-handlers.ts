import type { GeoJSON } from "geojson"
import maplibregl from "maplibre-gl"
import type { MapMouseEvent } from "react-map-gl/maplibre"

import type { Place } from "./map-helpers"
import { extractImageUrl } from "./map-helpers"
import type { ViewportState } from "./types/viewport.types"

/**
 * Handles cluster click - zooms into the cluster
 */
export function handleClusterClick(
  event: MapMouseEvent,
  map: maplibregl.Map,
  viewport: ViewportState,
  onViewportChange: (viewport: ViewportState) => void
): boolean {
  // Get all cluster layers (for all categories) - now using icon layers
  const allLayers = map.getStyle().layers || []
  const clusterLayerIds = allLayers
    .filter(
      (layer) =>
        layer.id.startsWith("clusters-icon-") && layer.type === "symbol"
    )
    .map((layer) => layer.id)

  if (clusterLayerIds.length === 0) return false

  const features = map.queryRenderedFeatures(event.point, {
    layers: clusterLayerIds,
  })

  if (features.length === 0) return false

  const feature = features[0]
  if (!feature?.properties || !feature.geometry || !feature.source) return false

  const clusterId = feature.properties.cluster_id
  const clusterSource = map.getSource(
    feature.source
  ) as maplibregl.GeoJSONSource

  if (
    !clusterSource ||
    typeof clusterSource.getClusterExpansionZoom !== "function" ||
    clusterId === undefined
  ) {
    return false
  }

  clusterSource.getClusterExpansionZoom(clusterId).then((zoom) => {
    const geometry = feature.geometry as GeoJSON.Point
    if (geometry?.coordinates && geometry.coordinates.length >= 2) {
      const lon = geometry.coordinates[0]
      const lat = geometry.coordinates[1]
      if (lon !== undefined && lat !== undefined) {
        onViewportChange({
          ...viewport,
          longitude: lon,
          latitude: lat,
          zoom: zoom,
        })
      }
    }
  })

  return true
}

/**
 * Normalizes categories from feature properties
 */
function normalizeCategories(
  categories: any
): Array<{ slug: string; name: string }> {
  if (!categories || !Array.isArray(categories)) return []

  return categories
    .filter(
      (cat: any) => cat && typeof cat === "object" && cat.slug && cat.name
    )
    .map((cat: any) => ({
      slug: String(cat.slug),
      name: String(cat.name),
    }))
}

/**
 * Creates a Place object from feature properties
 */
function createPlaceFromFeature(
  properties: any,
  lat: number,
  lon: number
): Place {
  const categories = normalizeCategories(properties.categories)

  // Normalize primaryImage
  let primaryImage: { file: string } | undefined = undefined
  const rawImageValue =
    properties.primaryImageFile ||
    properties.primaryImage?.file ||
    properties.primaryImage
  const imageFile = extractImageUrl(rawImageValue)

  if (imageFile) {
    primaryImage = { file: imageFile }
  }

  return {
    id: properties.id ?? properties.slug ?? Math.random().toString(),
    slug: properties.slug || "",
    name: properties.name || "",
    latitude: lat,
    longitude: lon,
    description: properties.description || "",
    primaryImage: primaryImage,
    provider: properties.provider,
    categories: categories,
  }
}

/**
 * Handles unclustered point click - shows popup
 */
export function handlePointClick(
  event: MapMouseEvent,
  map: maplibregl.Map,
  onPlaceSelect: ((place: Place | null) => void) | undefined,
  setSelectedPlace: (place: Place | null) => void,
  setPopupPosition: (position: {
    anchor: string
    offset: [number, number]
  }) => void,
  calculatePopupPosition: (place: Place) => {
    anchor: string
    offset: [number, number]
  }
): boolean {
  // Get all unclustered point layers (for all categories)
  const allLayers = map.getStyle().layers || []
  const unclusteredLayerIds = allLayers
    .filter(
      (layer) =>
        layer.id.startsWith("unclustered-point-symbol-") &&
        layer.type === "symbol"
    )
    .map((layer) => layer.id)

  if (unclusteredLayerIds.length === 0) return false

  const unclusteredFeatures = map.queryRenderedFeatures(event.point, {
    layers: unclusteredLayerIds,
  })

  if (unclusteredFeatures.length === 0) return false

  const feature = unclusteredFeatures[0]
  if (!feature?.properties || !feature.geometry) return false

  const properties = feature.properties
  const geometry = feature.geometry as GeoJSON.Point

  if (!geometry.coordinates || geometry.coordinates.length < 2) return false

  const lat = geometry.coordinates[1]
  const lon = geometry.coordinates[0]

  if (lat === undefined || lon === undefined) return false

  const place = createPlaceFromFeature(properties, lat, lon)
  const position = calculatePopupPosition(place)

  setPopupPosition(position)
  setSelectedPlace(place)

  if (onPlaceSelect) {
    onPlaceSelect(place)
  }

  return true
}
