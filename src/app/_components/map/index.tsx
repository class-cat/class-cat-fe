"use client"

import { Suspense, useEffect, useState, useCallback, useMemo } from "react"
import { 
  Layer, 
  Map as MapGL,
  Source,
  Popup
} from "react-map-gl"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { default as layers } from "protomaps-themes-base"
import { Protocol } from "pmtiles"
import { type CircleLayerSpecification } from "mapbox-gl"
import Image from "next/image" // Import Next.js Image component

import "./style.css"
import { useFetch } from "~/app/_hooks/useFetch"
import { ENDPOINTS } from "~/lib/const"

// Default image URL
const DEFAULT_IMAGE = "/business.png"

const layerStyle: CircleLayerSpecification = {
  source: "my-data",
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 10,
    "circle-color": "#007cbf",
    "circle-stroke-width": 2,
    "circle-stroke-color": "#fff"
  }
}

type MapType = {
  success: boolean
  data: {
    file: string
  }
}

const geoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [18.6435, 54.352] },
      properties: { id: 1, title: "Point 1", image: DEFAULT_IMAGE }
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [18.8435, 54.52] },
      properties: { id: 2, title: "Point 2", image: DEFAULT_IMAGE }
    },
  ],
}

const createGeoJSON = (data: any) => {
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

const MAP_STYLE = {
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
};

export function Map({ data }: any) {
  const {
    data: map,
    isLoading,
    isError,
  } = useFetch<MapType>({
    url: `${ENDPOINTS.MAP}`,
  })

  const mapStyle = useMemo(() => {
    if (!map?.data?.file) return MAP_STYLE;
    return {
      ...MAP_STYLE,
      sources: {
        ...MAP_STYLE.sources,
        protomaps: {
          ...MAP_STYLE.sources.protomaps,
          url: `pmtiles://${map.data.file}`,
        },
      },
    };
  }, [map]);

  const [popupInfo, setPopupInfo] = useState<any>(null)

  useEffect(() => {
    const protocol = new Protocol()
    maplibregl.addProtocol("pmtiles", protocol.tile)
    return () => {
      maplibregl.removeProtocol("pmtiles")
    }
  }, [])

  const memoizedGeoJson = useMemo(() => {
    return data ? createGeoJSON(data) : geoJson
  }, [data])

  const handleClick = useCallback((event: { target: { queryRenderedFeatures: (arg0: any, arg1: { layers: string[] }) => any }; point: any }) => {
    const features = event.target.queryRenderedFeatures(event.point, {
      layers: ["point"],
    });
  
    if (features.length > 0) {
      const feature = features[0];
      setPopupInfo((prev: { longitude: any; latitude: any }) => {
        // Only update if the new data differs
        if (
          prev?.longitude === feature.geometry.coordinates[0] &&
          prev?.latitude === feature.geometry.coordinates[1]
        ) {
          return prev;
        }
        return {
          longitude: feature.geometry.coordinates[0],
          latitude: feature.geometry.coordinates[1],
          properties: feature.properties,
        };
      });
    } else if (popupInfo) {
      setPopupInfo(null); // Only clear if there was a popup
    }
  }, [popupInfo]);

  return (
    <Suspense fallback={<PlaceholderMap />}>
      <div className="mb-6 size-full rounded-2xl">
        {isError || isLoading || map === undefined || map.success === false ? (
          <PlaceholderMap />
        ) : (
          <MapGL
            reuseMaps
            initialViewState={{
              longitude: 18.6435,
              latitude: 54.352,
              zoom: 12,
              bearing: 0,
            }}
            mapStyle={mapStyle as any}
            mapLib={maplibregl as any}
            onClick={handleClick}
            interactiveLayerIds={["point"]}
            cursor="pointer"
            maxPitch={0}
          >
            {/* <NavigationControl /> */}
            <Source
              id="my-data"
              type="geojson"
              data={memoizedGeoJson}
            >
              <Layer {...layerStyle} />
            </Source>
            {popupInfo && (
              <Popup
                longitude={popupInfo.longitude}
                latitude={popupInfo.latitude}
                onClose={() => setPopupInfo(null)}
                closeOnClick={false}
                className="custom-popup"
              >
                <div className="flex items-center space-x-4 p-2">
                  <Image
                    src={popupInfo.properties.image}
                    alt={popupInfo.properties.title}
                    width={40}  // Set explicit width
                    height={40} // Set explicit height
                    className="rounded"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-left font-bold">{popupInfo.properties.title}</h3>
                    <p className="text-left">ID: {popupInfo.properties.id}</p>
                  </div>
                </div>
              </Popup>
            )}
          </MapGL>
        )}
      </div>
    </Suspense>
  )
}

export function PlaceholderMap() {
  return (
    <div className="h-[200px] w-full animate-pulse rounded-2xl bg-secondary xl:h-full">
      <div className="size-full rounded-2xl" />
    </div>
  )
}