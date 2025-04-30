import { DEFAULT_IMAGE } from "./map-constants"

export const createGeoJSON = (data: any) => {
  return {
    type: "FeatureCollection",
    features: data.map((item: any, index: number) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.coordinates?.lat, item.coordinates?.lon],
      },
      properties: {
        id: index,
        title: item.title || `Point ${index + 1}`,
        image: item.image || DEFAULT_IMAGE
      }
    })),
  }
}