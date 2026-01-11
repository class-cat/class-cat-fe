import type {
  CircleLayerSpecification,
  ExpressionSpecification,
  SymbolLayerSpecification,
} from "maplibre-gl"

import { getCategoryIcon } from "./category-icons"

// Base cluster icon layer - will be customized per category
export const createClusterIconLayer = (
  category: string
): SymbolLayerSpecification => ({
  id: `clusters-icon-${category}`,
  type: "symbol",
  source: `source-${category}`,
  filter: ["has", "point_count"] as ExpressionSpecification,
  layout: {
    "icon-image": category as unknown as string, // Use category slug as icon name
    "icon-size": 0.9,
    "icon-allow-overlap": true,
    "icon-ignore-placement": true,
  },
})

// Cluster count badge - using symbol layer with circle icon, positioned in top right
export const createClusterCountBadgeLayer = (
  category: string
): SymbolLayerSpecification => ({
  id: `cluster-count-badge-${category}`,
  type: "symbol",
  source: `source-${category}`,
  filter: ["has", "point_count"] as ExpressionSpecification,
  layout: {
    "icon-image": "badge-circle",
    "icon-size": 0.6, // Larger badge to fully cover the text
    "icon-allow-overlap": true,
    "icon-ignore-placement": true,
    "icon-anchor": "center", // Center anchor for proper alignment
    "icon-offset": [0.95, -1.1] as [number, number], // Exact same offset as text
  },
  paint: {},
})

// Cluster count text - number inside the badge, positioned in top right
export const createClusterCountLayer = (
  category: string
): SymbolLayerSpecification => ({
  id: `cluster-count-${category}`,
  type: "symbol",
  source: `source-${category}`,
  filter: ["has", "point_count"] as ExpressionSpecification,
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["Noto Sans Bold"],
    "text-size": 14, // Larger text for better visibility
    "text-allow-overlap": true,
    "text-ignore-placement": true,
    "text-anchor": "center", // Center anchor to align with badge
    "text-offset": [0.95, -1.1] as [number, number], // Exact same offset as badge - must match exactly
  },
  paint: {
    "text-color": "#1a1a1a", // Dark gray for better contrast on white circle
    // No halo - text is on white circle background
  },
})

export const unclusteredPointSymbolLayer: SymbolLayerSpecification = {
  id: "unclustered-point-symbol",
  type: "symbol",
  source: "my-data",
  filter: ["!", ["has", "point_count"]] as ExpressionSpecification,
  layout: {
    "icon-image": ["get", "icon"] as unknown as string,
    "icon-size": 0.9,
    "icon-allow-overlap": true,
    "icon-ignore-placement": true,
  },
}

/**
 * Creates layer specifications for a specific category source
 */
export function createCategoryLayers(sourceId: string, category: string) {
  // Cluster icon layer - shows category icon
  const clusterIconLayerForCategory = createClusterIconLayer(category)

  // Cluster count badge - small circle with number in top right
  const clusterCountBadgeLayerForCategory =
    createClusterCountBadgeLayer(category)

  // Cluster count text - number inside the badge
  const clusterCountLayerForCategory = createClusterCountLayer(category)

  const unclusteredPointSymbolLayerForCategory: SymbolLayerSpecification = {
    ...unclusteredPointSymbolLayer,
    id: `unclustered-point-symbol-${category}`,
    source: sourceId,
  }

  return {
    clusterIconLayer: clusterIconLayerForCategory,
    clusterCountBadgeLayer: clusterCountBadgeLayerForCategory,
    clusterCountLayer: clusterCountLayerForCategory,
    unclusteredPointSymbolLayer: unclusteredPointSymbolLayerForCategory,
  }
}

// Vector tile styles
export const VECTOR_STYLES = {
  cartoVoyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
  cartoPositron: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json", // Alias for Voyager (backward compatibility)
  cartoDark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
} as const

export type StyleKey = keyof typeof VECTOR_STYLES

export const getMapStyle = (key: StyleKey): string => {
  return VECTOR_STYLES[key]
}
