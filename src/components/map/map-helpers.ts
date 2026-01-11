import type { GeoJSON } from "geojson"

import { categoryNameToSlug } from "./category-icons"
import { DEFAULT_IMAGE } from "./constants"

/**
 * Extracts image URL from potentially nested/stringified JSON structure
 */
export function extractImageUrl(value: any): string | null {
  if (!value) return null

  // If it's already a string URL, return it
  if (typeof value === "string") {
    // Check if it's a JSON string that needs parsing
    if (value.trim().startsWith("{") || value.trim().startsWith("[")) {
      try {
        const parsed = JSON.parse(value)
        // If parsed object has a 'file' property, extract it
        if (parsed && typeof parsed === "object" && parsed.file) {
          return extractImageUrl(parsed.file) // Recursively extract
        }
        return null
      } catch {
        // Not valid JSON, treat as URL
        return value.trim()
      }
    }
    // Regular URL string
    return value.trim()
  }

  // If it's an object with 'file' property
  if (typeof value === "object" && value.file) {
    return extractImageUrl(value.file) // Recursively extract
  }

  return null
}

// API response types
export interface MapPointApiResponse {
  success: boolean
  data: MapPointData[]
}

export interface MapPointData {
  slug: string
  searchType: string
  coordinates: {
    lat: number
    lon: number
  }
  description?: string
  name: string
  categoriesNames: (string | null)[]
  image?: string
  id?: string | number
  provider?: {
    name: string
  }
}

// Place type for internal use
export interface Place {
  id: string | number
  slug: string
  name: string
  latitude: number
  longitude: number
  description?: string
  primaryImage?: {
    file: string
  }
  provider?: {
    name: string
  }
  categories?: Array<{
    slug: string
    name: string
  }>
}

/**
 * Transforms API response data to Place format
 */
export function transformMapPointsToPlaces(
  apiResponse: MapPointApiResponse | null | undefined
): Place[] {
  if (!apiResponse?.success || !Array.isArray(apiResponse.data)) {
    return []
  }

  return apiResponse.data
    .filter((item) => {
      const lat = item.coordinates?.lat
      const lon = item.coordinates?.lon
      return (
        lat !== null && lat !== undefined && lon !== null && lon !== undefined
      )
    })
    .map((item) => {
      const lat = item.coordinates.lat
      const lon = item.coordinates.lon

      // Transform image URL to primaryImage format
      // Check if image exists and is a non-empty string
      const primaryImage: { file: string } | undefined =
        item.image && typeof item.image === "string" && item.image.trim() !== ""
          ? { file: item.image.trim() }
          : undefined

      // Transform categoriesNames to categories format
      // Filter out null/undefined/empty values and map to category objects
      const categories: Array<{ slug: string; name: string }> =
        item.categoriesNames
          ?.filter(
            (name): name is string =>
              name !== null &&
              name !== undefined &&
              typeof name === "string" &&
              name.trim() !== ""
          )
          .map((name) => ({
            slug: categoryNameToSlug(name),
            name: name.trim(),
          })) ?? []

      // Ensure at least one category exists (default to "other" if empty)
      const finalCategories: Array<{ slug: string; name: string }> =
        categories.length > 0 ? categories : [{ slug: "other", name: "Inne" }]

      return {
        id: item.id ?? item.slug,
        slug: item.slug,
        name: item.name,
        latitude: lat,
        longitude: lon,
        description: item.description,
        primaryImage,
        provider: item.provider,
        categories: finalCategories,
      } satisfies Place
    })
}

export const createGeoJSON = (data: any): GeoJSON.FeatureCollection => {
  return {
    type: "FeatureCollection",
    features: data
      .map((item: any, index: number) => {
        // Try to get coordinates from all possible locations
        const lat =
          item.latitude ??
          item.lat ??
          item.cordinates?.lat ??
          item.coordinates?.lat ??
          item.location?.address?.coordinates?.lat
        const lon =
          item.longitude ??
          item.lon ??
          item.cordinates?.lon ??
          item.coordinates?.lon ??
          item.location?.address?.coordinates?.lon
        if (
          lat === null ||
          lat === undefined ||
          lon === null ||
          lon === undefined
        )
          return null
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lon, lat], // longitude, latitude
          },
          properties: {
            id: item.id ?? index,
            title: item.title || item.name || `Point ${index + 1}`,
            image: item.image || item.primaryImage?.file || DEFAULT_IMAGE,
            slug: item.slug,
          },
        }
      })
      .filter(
        (feature: GeoJSON.Feature | null): feature is GeoJSON.Feature =>
          feature !== null
      ),
  }
}
