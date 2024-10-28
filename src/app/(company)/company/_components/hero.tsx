"use client"

import Image from "next/legacy/image"
import React from "react"
import Balancer from "react-wrap-balancer"
import { motion } from "framer-motion"
import { useInView } from "~/app/_hooks/useInView"

export default function Hero() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="sm:paddingX flex w-full flex-col items-center justify-between py-12 sm:gap-4 sm:rounded-3xl sm:bg-secondary sm:py-4 md:flex-row"
    >
      <div className="flex w-full flex-col items-start justify-center gap-6 text-start md:w-3/5">
        <h2>Zarządzaj z łatwością zajęciami swojej firmy</h2>
        <p className="text-muted-foreground md:text-xl">
          <Balancer>
            Usprawnij planowanie, zwiększ zapisy i rozwijaj swoją firmę dzięki
            naszej kompleksowej platformie.
          </Balancer>
        </p>
      </div>
      <div className="relative aspect-square w-full max-w-[300px] md:w-2/5">
        <Image
          src="/business.png"
          alt="Business illustration"
          width={768}
          height={768}
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </motion.div>
  )
}
