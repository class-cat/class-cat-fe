import { DEFAULT_IMAGE } from "./constants"

export const createGeoJSON = (data: any) => {
  return {
    type: "FeatureCollection",
    features: data
      .map((item: any, index: number) => {
        // Try to get coordinates from all possible locations
        const lat = item.latitude ?? item.lat ?? item.cordinates?.lat ?? item.coordinates?.lat ?? item.location?.address?.coordinates?.lat;
        const lon = item.longitude ?? item.lon ?? item.cordinates?.lon ?? item.coordinates?.lon ?? item.location?.address?.coordinates?.lon;
        if (lat === null || lat === undefined || lon === null || lon === undefined) return null;
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
        };
      })
      .filter(Boolean),
  };
}
