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