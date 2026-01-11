"use client"

import { Button } from "~/components/ui/button"
import { Locate, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"

import type { ViewportState } from "./types/viewport.types"

interface EnhancedMapControlsProps {
  viewport: ViewportState
  onViewportChange: (viewport: ViewportState) => void
  onResetView?: () => void
  onLocateUser?: () => void
}

export function EnhancedMapControls({
  viewport,
  onViewportChange,
  onResetView,
  onLocateUser,
}: EnhancedMapControlsProps) {
  const handleZoomIn = () => {
    onViewportChange({
      ...viewport,
      zoom: Math.min(18, viewport.zoom + 1),
    })
  }

  const handleZoomOut = () => {
    onViewportChange({
      ...viewport,
      zoom: Math.max(8, viewport.zoom - 1),
    })
  }

  const handleResetView = () => {
    if (onResetView) {
      onResetView()
    } else {
      onViewportChange({
        latitude: 54.352,
        longitude: 18.6435,
        zoom: 12,
      })
    }
  }

  const handleLocateUser = () => {
    if (onLocateUser) {
      onLocateUser()
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onViewportChange({
            ...viewport,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 14,
          })
        },
        (error) => {
          // Silent fail for geolocation errors - user can manually navigate
          if (process.env.NODE_ENV === "development") {
            console.error("Geolocation error:", error.message)
          }
        }
      )
    }
  }

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col space-y-3">
      <Button
        size="sm"
        variant="secondary"
        onClick={handleZoomIn}
        className="h-12 w-12 border border-white/30 bg-white/80 p-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/90"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-5 w-5" />
      </Button>

      <Button
        size="sm"
        variant="secondary"
        onClick={handleZoomOut}
        className="h-12 w-12 border border-white/30 bg-white/80 p-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/90"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-5 w-5" />
      </Button>

      <Button
        size="sm"
        variant="secondary"
        onClick={handleResetView}
        className="h-12 w-12 border border-white/30 bg-white/80 p-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/90"
        aria-label="Reset view"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>

      <Button
        size="sm"
        variant="secondary"
        onClick={handleLocateUser}
        className="h-12 w-12 border border-white/30 bg-white/80 p-0 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/90"
        aria-label="Locate me"
      >
        <Locate className="h-5 w-5" />
      </Button>
    </div>
  )
}
