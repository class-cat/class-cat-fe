import React from "react"
import {
  IconBallFootball,
  IconBallTennis,
  IconBow,
  IconBox,
  IconGolf,
  IconMapPin,
  IconPlayBasketball,
  IconPlayHandball,
  IconPlayVolleyball,
} from "@tabler/icons-react"

export interface CategoryIcon {
  icon: React.ComponentType<{ size?: number; stroke?: number }>
  color: string
  description: string
}

const categoryIconMap: Record<string, CategoryIcon> = {
  // Sports - bardziej różnorodne kolory
  siatkowka: {
    icon: IconPlayVolleyball,
    color: "#FF6B35",
    description: "Siatkówka",
  }, // Pomarańczowy
  boks: { icon: IconBox, color: "#DC143C", description: "Boks" }, // Czerwony
  pilkanozna: {
    icon: IconBallFootball,
    color: "#00A86B",
    description: "Piłka nożna",
  }, // Zielony
  lucznictwo: { icon: IconBow, color: "#6A5ACD", description: "Łucznictwo" }, // Fioletowy
  badminton: {
    icon: IconBallTennis,
    color: "#00CED1",
    description: "Badminton",
  }, // Turkusowy
  tenis: { icon: IconBallTennis, color: "#32CD32", description: "Tenis" }, // Limonkowy
  koszykowka: {
    icon: IconPlayBasketball,
    color: "#FF8C00",
    description: "Koszykówka",
  }, // Ciemny pomarańczowy
  golf: { icon: IconGolf, color: "#228B22", description: "Golf" }, // Ciemny zielony
  handball: {
    icon: IconPlayHandball,
    color: "#FF1493",
    description: "Piłka ręczna",
  }, // Różowy
  // Default
  other: { icon: IconMapPin, color: "#808080", description: "Inne" }, // Szary
}

export function getCategoryIcon(categorySlug?: string | null): CategoryIcon {
  if (!categorySlug) {
    return categoryIconMap.other as CategoryIcon
  }

  const normalizedSlug = categorySlug.toLowerCase().trim()
  return (
    categoryIconMap[normalizedSlug] || (categoryIconMap.other as CategoryIcon)
  )
}

// Map Polish category names to slugs
const categoryNameToSlugMap: Record<string, string> = {
  Siatkówka: "siatkowka",
  siatkówka: "siatkowka",
  Boks: "boks",
  boks: "boks",
  "Piłka nożna": "pilkanozna",
  "piłka nożna": "pilkanozna",
  Łucznictwo: "lucznictwo",
  łucznictwo: "lucznictwo",
  Badminton: "badminton",
  badminton: "badminton",
  Tenis: "tenis",
  tenis: "tenis",
  Koszykówka: "koszykowka",
  koszykówka: "koszykowka",
  Golf: "golf",
  golf: "golf",
  "Piłka ręczna": "handball",
  "piłka ręczna": "handball",
  Inne: "other",
  inne: "other",
}

export function categoryNameToSlug(
  categoryName: string | null | undefined
): string {
  if (!categoryName) {
    return "other"
  }

  const normalized = categoryName.trim()
  return (
    categoryNameToSlugMap[normalized] ||
    normalized.toLowerCase().replace(/\s+/g, "")
  )
}
