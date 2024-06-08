'use client'

import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maptilersdk.Map | null>(null);
  const gdansk = { lng: 18.6435, lat: 54.3520 };
  const [zoom] = useState(14);
  maptilersdk.config.apiKey = 'T6HMkvhbirvp9zNTqczZ';

  const markers = [
    { lng: 18.6435, lat: 54.3520, title: "Gdańsk, Nowe Ogrody" }
  ];

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [gdansk.lng, gdansk.lat],
      zoom: zoom
    });

    markers.forEach(marker => {
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.backgroundImage = 'url(https://placekitten.com/40/40)';
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = '100%';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';
      el.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)';
      
      new maptilersdk.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new maptilersdk.Popup({ offset: 25 }).setText(marker.title))
        .addTo(map.current as maptilersdk.Map)
    });
  }, [gdansk.lng, gdansk.lat, zoom, markers]);

  return (
    <div className='w-full h-[200px] xl:h-full'>
      <div ref={mapContainer} className='w-full h-full rounded-2xl'/>
    </div>
  );
}
