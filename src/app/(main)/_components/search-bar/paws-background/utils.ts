import { PAWS_CONSTANTS } from "./constants"

interface Paw {
  id: string
  x: number
  y: number
  opacity: number
}

export const calculatePaws = (width: number, height: number): Paw[] => {
  const { SPACING, MIN_OPACITY, OPACITY_MULTIPLIER, DISTANCE_MULTIPLIER } = PAWS_CONSTANTS
  const columns = Math.ceil(width / SPACING)
  const rows = Math.ceil(height / SPACING)
  const paws: Paw[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const x = col * SPACING + 10
      const y = row * SPACING + 10

      const centerX = width / 2
      const bottomY = height
      const dx = x - centerX
      const dy = y - bottomY
      const distance = Math.sqrt(Math.pow(dx * DISTANCE_MULTIPLIER, 2) + Math.pow(dy, 2))

      const maxDistance = Math.sqrt(
        Math.pow(
          Math.max(width / 2, width - centerX) * DISTANCE_MULTIPLIER,
          2
        ) + Math.pow(height, 2)
      )

      const normalizedDistance = distance / maxDistance
      const opacity = Math.max(
        MIN_OPACITY,
        OPACITY_MULTIPLIER * Math.pow(1 - normalizedDistance, 2)
      )

      paws.push({ id: `${row}-${col}`, x, y, opacity })
    }
  }

  return paws
}

// Generate a percent-based grid so we can render on the server without measuring
// Options allow controlling where the opacity concentrates and where it fades out completely.
export const generatePercentPaws = (
  columns: number,
  rows: number,
  options?: {
    focusXPct?: number // 0-100
    focusYPct?: number // 0-100
    innerRadiusPct?: number // distance where opacity starts at max
    outerRadiusPct?: number // distance where opacity drops to zero
    exponent?: number // falloff curve strength
    minOpacity?: number // minimum opacity inside falloff
    maxOpacity?: number // cap the max opacity
  }
): Paw[] => {
  const {
    focusXPct = 50,
    focusYPct = 90,
    innerRadiusPct = 18,
    outerRadiusPct = 100,
    exponent = 2,
    minOpacity = PAWS_CONSTANTS.MIN_OPACITY,
    maxOpacity = 1,
  } = options || {}

  const paws: Paw[] = []

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v))

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const xPct = (col / Math.max(columns - 1, 1)) * 100
      const yPct = (row / Math.max(rows - 1, 1)) * 100

      const dx = (xPct - focusXPct) * PAWS_CONSTANTS.DISTANCE_MULTIPLIER
      const dy = yPct - focusYPct
      const distance = Math.sqrt(dx * dx + dy * dy)

      // Normalize distance between inner and outer radius
      const t = clamp((distance - innerRadiusPct) / Math.max(outerRadiusPct - innerRadiusPct, 1e-6), 0, 1)

      // Smooth falloff: 1 at innerRadius, 0 at outerRadius
      const fade = Math.pow(1 - t, exponent)

      // Apply multiplier, cap to maxOpacity; drop to 0 beyond outer radius
      const rawOpacity = PAWS_CONSTANTS.OPACITY_MULTIPLIER * fade
      const opacity = t >= 1 ? 0 : clamp(Math.max(minOpacity, rawOpacity), 0, maxOpacity)

      paws.push({ id: `${row}-${col}`, x: xPct, y: yPct, opacity })
    }
  }

  return paws
} 