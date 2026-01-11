"use client"

import { Input } from "~/components/ui/input"
import { Slider } from "~/components/ui/slider"
import { cn } from "~/lib/utils"

type SliderProps = React.ComponentProps<typeof Slider>

export const PriceSlider = ({ className, ...props }: SliderProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const parsedValue = parseInt(value, 10)
    if (props.onValueChange) {
      props.onValueChange([parsedValue])
    }
  }

  return (
    <>
      <Input
        className="border-secondary mb-3 flex w-[210px] items-center rounded-lg border-2 focus-visible:outline-none"
        placeholder="Słowo kluczowe..."
        type="text"
        value={props.value?.toString() || [0].toString()}
        onChange={handleInputChange}
      />
      <Slider
        max={200}
        step={1}
        className={cn("w-[100%]", className)}
        {...props}
      />
    </>
  )
}
