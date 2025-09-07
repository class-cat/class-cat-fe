import { useLayoutEffect, useRef } from "react"

export const useResizeObserver = (callback: (dimensions: { width: number; height: number }) => void) => {
  const containerRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        callback({ width, height })
      }
    }

    updateDimensions()

    const resizeObserver = new ResizeObserver(updateDimensions)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current)
      }
    }
  }, [callback])

  return containerRef
} 