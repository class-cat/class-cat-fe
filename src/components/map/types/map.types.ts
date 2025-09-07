export interface MapFeature {
  type: "Feature"
  geometry: {
    type: "Point"
    coordinates: [number, number]
  }
  properties: {
    id: string
    title: string
    image: string
    description?: string
    category?: string
  }
}

export interface MapGeoJSON {
  type: "FeatureCollection"
  features: MapFeature[]
}

export interface MapPopupInfo {
  longitude: number
  latitude: number
  properties: MapFeature["properties"]
}

export interface MapViewState {
  longitude: number
  latitude: number
  zoom: number
  bearing: number
  pitch: number
}

export interface MapControls {
  showZoom?: boolean
  showCompass?: boolean
  showFullscreen?: boolean
}

export interface MapProps {
  data?: MapGeoJSON
  initialViewState?: Partial<MapViewState>
  controls?: MapControls
  onFeatureClick?: (feature: MapFeature) => void
  className?: string
} 