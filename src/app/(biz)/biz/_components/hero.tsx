"use client";

import Image from "next/image";
import React from "react";
import Balancer from "react-wrap-balancer";

export default function Hero() {
  return (
    <>
      <div className="flex w-full flex-col items-start justify-center gap-6 py-0 text-start sm:py-12 md:w-3/4">
        <h2 className="hidden sm:block">
          <Balancer>Zarządzaj z łatwością swoimi zajęciami</Balancer>
        </h2>
        <p className="text-muted-foreground hidden sm:block md:text-xl">
          <Balancer>
            Usprawnij planowanie, zwiększ zapisy i rozwijaj swoją firmę dzięki
            naszej kompleksowej platformie.
          </Balancer>
        </p>
      </div>
      <div className="flex justify-center lg:ml-4">
        <Image
          src="/business.png"
          alt="cat"
          objectFit="contain"
          height={200}
          width={200}
          className="hidden size-full md:block"
        />
      </div>
    </>
  );
}
