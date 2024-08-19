"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "~/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="w-FIR relative flex ">
    <div className="mr-2">0</div>
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="isabled:pointer-events-none block size-5 rounded-full border-2 border-primary bg-white ring-offset-primary transition-colors focus-visible:outline-none disabled:opacity-50" />
    </SliderPrimitive.Root>
    <div className="ml-2 w-12">{`${props.max} zł`}</div>
  </div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
