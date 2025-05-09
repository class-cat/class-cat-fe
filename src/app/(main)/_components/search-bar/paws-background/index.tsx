import React, { useState, useMemo } from "react"
import { useResizeObserver } from "~/app/_hooks/useResizeObserver"
import { calculatePaws } from "./utils"
import { PawItem } from "./paw-item"

export const PawsBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useResizeObserver(setDimensions)

  const paws = useMemo(
    () => calculatePaws(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  )

  return (
    <div
      ref={containerRef as any}
      className="z-1 pointer-events-none absolute inset-0 hidden overflow-hidden md:block"
    >
      {paws.map((paw) => (
        <PawItem key={paw.id} {...paw} />
      ))}
    </div>
  )
} 