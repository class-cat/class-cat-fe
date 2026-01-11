import maplibregl from "maplibre-gl"
import type { MapRef } from "react-map-gl/maplibre"

import type { Place } from "./map-helpers"

const POPUP_WIDTH = 320
const POPUP_HEIGHT = 200
const MARGIN = 16

/**
 * Calculates optimal popup position based on marker location relative to map bounds
 */
export function calculatePopupPosition(
  map: maplibregl.Map | null,
  place: Place
): { anchor: string; offset: [number, number] } {
  if (!map) return { anchor: "top", offset: [0, -10] }

  const mapContainer = map.getContainer()
  const mapWidth = mapContainer.offsetWidth
  const mapHeight = mapContainer.offsetHeight

  const point = map.project([place.longitude, place.latitude])
  const x = point.x
  const y = point.y

  const spaceTop = y
  const spaceBottom = mapHeight - y
  const spaceLeft = x
  const spaceRight = mapWidth - x

  const nearTop = spaceTop < POPUP_HEIGHT + MARGIN
  const nearBottom = spaceBottom < POPUP_HEIGHT + MARGIN
  const nearLeft = spaceLeft < POPUP_WIDTH / 2 + MARGIN
  const nearRight = spaceRight < POPUP_WIDTH / 2 + MARGIN

  let anchor = "bottom"
  let offset: [number, number] = [0, -10]

  if (nearTop && nearLeft) {
    anchor = "top-left"
    offset = [10, 10]
  } else if (nearTop && nearRight) {
    anchor = "top-right"
    offset = [-10, 10]
  } else if (nearBottom && nearLeft) {
    anchor = "bottom-left"
    offset = [10, -10]
  } else if (nearBottom && nearRight) {
    anchor = "bottom-right"
    offset = [-10, -10]
  } else if (nearTop) {
    anchor = "top"
    offset = [0, 10]
  } else if (nearBottom) {
    anchor = "bottom"
    offset = [0, -10]
  } else if (nearLeft) {
    anchor = "left"
    offset = [10, 0]
  } else if (nearRight) {
    anchor = "right"
    offset = [-10, 0]
  }

  return { anchor, offset }
}
