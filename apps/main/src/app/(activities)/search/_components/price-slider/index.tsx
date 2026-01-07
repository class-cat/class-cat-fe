"use client"

import { cn } from "@class-cat/ui"
import { Slider } from "@class-cat/ui"
import { Input } from "@class-cat/ui"

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
        className="mb-3 flex w-[210px] items-center rounded-lg border-2 border-secondary focus-visible:outline-none"
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
