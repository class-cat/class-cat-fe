"use client"

import Image from "next/image"
import React, { type RefObject } from "react"
import { motion } from "framer-motion"
import { useInView } from "~/app/_hooks/useInView"
import { PawsBackground } from "~/app/(main)/_components/search-bar/paws-background"


export const Hero = () => {
  const [ref, isInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    freezeOnceVisible: true,
  })

  return (
    (<motion.div
      ref={ref as RefObject<HTMLDivElement | null>}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden pb-2 sm:rounded-3xl sm:bg-secondary md:min-h-[420px]  md:px-6 md:py-10 lg:px-8"
    >
      <PawsBackground />
      <div className="relative text-center md:space-y-6 md:pt-64">
        <div className="hidden md:block">
          <h3>Zarządzaj z łatwością zajęciami swojej firmy</h3>
          <span className="text-base md:text-lg">
            Usprawnij planowanie, zwiększ zapisy i rozwijaj swoją firmę dzięki
            naszej kompleksowej platformie.
          </span>
        </div>
      </div>
      <div className="absolute left-1/2 top-6 z-20 w-auto -translate-x-1/2 md:block">
        <Image
          src="/business.png"
          alt="Cute cat face peeking from the bottom"
          width={220}
          height={220}
          className="h-auto w-full object-cover"
        />
      </div>
    </motion.div>)
  );
}
