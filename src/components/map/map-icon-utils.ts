import React from "react"
import maplibregl from "maplibre-gl"
import { renderToString } from "react-dom/server"

import { getCategoryIcon } from "./category-icons"

const ICON_SIZE = 96
const ICON_PIXEL_RATIO = 2
const ICON_STROKE_WIDTH = 1.5
const ICON_INNER_SIZE = 48 // Size of the icon itself inside the circle

/**
 * Creates icon image data for map markers
 * Memoized to avoid recreating the same icons
 */
const iconCache = new Map<string, ImageData>()

export function createIconImageData(key: string): Promise<ImageData> {
  // Check cache first
  if (iconCache.has(key)) {
    return Promise.resolve(iconCache.get(key)!)
  }

  return new Promise((resolve, reject) => {
    const categoryIcon = getCategoryIcon(key)
    const IconComponent = categoryIcon.icon
    const color = categoryIcon.color

    // Render React component to SVG string
    const iconElement = React.createElement(IconComponent, {
      size: 24, // Tabler icons use 24x24 viewBox, render at native size
      stroke: ICON_STROKE_WIDTH,
    })
    const iconSvg = renderToString(iconElement)

    // Extract viewBox and content from the rendered SVG
    const svgMatch = iconSvg.match(
      /<svg[^>]*viewBox="([^"]*)"[^>]*>(.*?)<\/svg>/s
    )
    if (!svgMatch || !svgMatch[2]) {
      reject(new Error(`Could not extract SVG from icon: ${key}`))
      return
    }

    const viewBox = svgMatch[1] || "0 0 24 24"
    let svgContent = svgMatch[2]

    // Clean up the SVG content - remove existing stroke/fill attributes to apply our own
    svgContent = svgContent
      .replace(/stroke="[^"]*"/g, "")
      .replace(/fill="[^"]*"/g, "")
      .replace(/stroke-width="[^"]*"/g, "")

    // Calculate icon position to center it (icon will be ICON_INNER_SIZE, centered in ICON_SIZE)
    const iconX = (ICON_SIZE - ICON_INNER_SIZE) / 2
    const iconY = (ICON_SIZE - ICON_INNER_SIZE) / 2

    // Create full SVG with white icon on colored circle background
    // Use proper scaling by setting width/height on the inner SVG
    const fullSvg = `
      <svg width="${ICON_SIZE}" height="${ICON_SIZE}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${ICON_SIZE / 2}" cy="${ICON_SIZE / 2}" r="${ICON_SIZE / 2 - 8}" fill="${color}"/>
        <g transform="translate(${iconX}, ${iconY})">
          <svg width="${ICON_INNER_SIZE}" height="${ICON_INNER_SIZE}" viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" fill="none" stroke-width="${ICON_STROKE_WIDTH}" stroke-linecap="round" stroke-linejoin="round">
            ${svgContent}
          </svg>
        </g>
      </svg>
    `.trim()

    // Convert SVG to data URL
    const svgBlob = new Blob([fullSvg], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    // Create image and draw on canvas
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = ICON_SIZE
      canvas.height = ICON_SIZE
      const ctx = canvas.getContext("2d")!

      if (!ctx) {
        URL.revokeObjectURL(url)
        reject(new Error("Could not get canvas context"))
        return
      }

      // Draw the image on canvas
      ctx.drawImage(img, 0, 0, ICON_SIZE, ICON_SIZE)

      const imageData = ctx.getImageData(0, 0, ICON_SIZE, ICON_SIZE)

      // Cache the result
      iconCache.set(key, imageData)

      URL.revokeObjectURL(url)
      resolve(imageData)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error(`Failed to load icon image: ${key}`))
    }

    img.src = url
  })
}

/**
 * Creates a badge circle icon for cluster count (round circle)
 */

/**
 * Registers icon images on the map if they don't already exist
 */
export async function registerMapIcons(
  map: maplibregl.Map,
  iconKeys: Set<string>
): Promise<void> {
  const promises = Array.from(iconKeys).map(async (key) => {
    const name = String(key)
    if (!map.hasImage(name)) {
      const imageData = await createIconImageData(name)
      map.addImage(name, imageData, { pixelRatio: ICON_PIXEL_RATIO })
    }
  })

  await Promise.all(promises)
}

/**
 * Clears the icon cache (useful for testing or memory management)
 */
export function clearIconCache(): void {
  iconCache.clear()
}
