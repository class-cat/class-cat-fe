"use client"
import ReactDOM from "react-dom"
import React, { useRef, useEffect, useState } from "react"
import * as maptilersdk from "@maptiler/sdk"
import "@maptiler/sdk/dist/maptiler-sdk.css"
import "./style.css"
import Marker from "./marker"

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const gdansk = { lng: 18.6435, lat: 54.352 }
  const [zoom] = useState(14)
  maptilersdk.config.apiKey = "T6HMkvhbirvp9zNTqczZ"

  const markers = [
    {
      lng: 18.6435,
      lat: 54.352,
      title: "Siatkówka dla klas 1-3",
      street: "Gdańsk, Nowe Ogrody",
      src: "/stock.jpeg",
    },
  ]

  useEffect(() => {
    if (map.current ?? !mapContainer.current) return

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [gdansk.lng, gdansk.lat],
      zoom: zoom,
      maptilerLogo: false,
    })

    markers.forEach((marker) => {
      const el = document.createElement("div")
      const popupContent = <Marker marker={marker} />
      ReactDOM.createPortal(popupContent, el)
      new maptilersdk.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(
          new maptilersdk.Popup({
            offset: 25,
            closeButton: false,
            className: "popup",
          }).setDOMContent(el)
        )
        .addTo(map.current!)
    })
  }, [gdansk.lng, gdansk.lat, zoom, markers])

  return (
    <div className="h-[200px] w-full xl:h-full">
      <div ref={mapContainer} className="h-full w-full rounded-2xl" />
    </div>
  )
}
