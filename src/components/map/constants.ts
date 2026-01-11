import type { GeoJSON } from "geojson"
import { type CircleLayerSpecification } from "mapbox-gl"
import layersDefault from "protomaps-themes-base"

export const DEFAULT_IMAGE = "/business.png"

export const layerStyle: CircleLayerSpecification = {
  source: "my-data",
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff",
  },
}

export const geoJson: GeoJSON.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [18.6435, 54.352] },
      properties: { id: 1, title: "Point 1", image: DEFAULT_IMAGE },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [18.8435, 54.52] },
      properties: { id: 2, title: "Point 2", image: DEFAULT_IMAGE },
    },
  ],
}

// Enhance layers for better visibility, especially buildings
function enhanceLayersForVisibility(layers: any[]): any[] {
  return layers.map((layer) => {
    if (!layer || typeof layer !== "object") return layer

    const layerId = layer.id?.toLowerCase() || ""
    const layerType = layer.type || ""

    // Buildings - make them more visible with better contrast
    if (layerId.includes("building")) {
      const newLayer = { ...layer }
      if (newLayer.paint && layerType === "fill") {
        newLayer.paint = { ...newLayer.paint }
        // Make buildings more visible with better color and outline
        newLayer.paint["fill-color"] = "#e5e7eb" // Light gray for good visibility
        newLayer.paint["fill-opacity"] = 0.7 // Slight transparency for depth
        if (newLayer.paint["fill-outline-color"]) {
          newLayer.paint["fill-outline-color"] = "#d1d5db" // Visible outline
          newLayer.paint["fill-outline-width"] = 0.5
        }
      }
      return newLayer
    }

    return layer
  })
}

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
function getLayersSafely(themeName: string): any[] | null {
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
}

// Get default layers - try light first (closest to positron), then dark, then white as fallbacks
function getMapLayers() {
  // Try light theme (closest to positron style)
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

  return enhanceLayersForVisibility(layers)
}

export const MAP_STYLE = {
  version: 8,
  glyphs:
    "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",
  sources: {
    protomaps: {
      attribution:
        '<a href="https://github.com/protomaps/basemaps">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>',
      type: "vector",
      url: null,
    },
  },
  layers: getMapLayers(),
}
