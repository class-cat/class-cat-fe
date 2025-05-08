import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { mostSearchedItems } from "./constants"
import { MostSearchItem } from "./most-search-item"

export const RecommendedCategories = () => {
  return (
    <section className="max-md:hidden">
      <h4 className="text-center">Polecane kategorie</h4>
      <div className="h-3" />
      <div className="flex justify-center">
        <Carousel
          className="max-w-2xl lg:max-w-3xl xl:max-w-5xl"
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent className="-ml-2">
            {mostSearchedItems.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 lg:basis-1/6">
                <div className="p-1">
                  <MostSearchItem {...item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-2" />
          <CarouselNext className="mr-2" />
        </Carousel>
      </div>
    </section>
  )
}
