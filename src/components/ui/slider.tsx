"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "~/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div className="w-FIR relative flex">
    <div className="mr-2">0</div>
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="bg-secondary relative h-2 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="isabled:pointer-events-none border-primary ring-offset-primary block size-5 rounded-full border-2 bg-white transition-colors focus-visible:outline-none disabled:opacity-50" />
    </SliderPrimitive.Root>
    <div className="ml-2 w-12">{`${props.max} zł`}</div>
  </div>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
