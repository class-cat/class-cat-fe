import { type CircleLayerSpecification } from "mapbox-gl"
import { default as layers } from "protomaps-themes-base"

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

export const geoJson = {
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
  layers: layers("protomaps", "light"),
}
