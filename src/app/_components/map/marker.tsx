import Image from "next/image"
import React from 'react';
import "@maptiler/sdk/dist/maptiler-sdk.css";

type MarkerProps = {
    marker: { 
        lng: number;
        lat: number;
        title: string;
        street: string;
        src: string
    }
  }

export default function Marker({marker}: MarkerProps) {
    return (
        <div className='flex justify-center rounded-xl' >
            <div className='mr-2'>
                <Image
                    src={marker.src}
                    alt="img"
                    height={45}
                    width={45}
                />
            </div>
            <div>
                <div className='font-semibold'>{marker.title}</div>
                <div>{marker.street}</div>
            </div>
        </div>
    );
}
