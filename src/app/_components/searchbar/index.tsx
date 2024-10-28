"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useGetLocations } from "~/actions/get-locations"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { SearchCombobox } from "../searchComboBox"
import React from "react"
import PawsBackground from "./cat-paws"

export default function SearchBar() {
  const searchParams = useSearchParams()
  const { data: locationData } = useGetLocations()
  const location = searchParams.get("location") as string

  return (
    <div className="relative overflow-hidden pb-2 md:min-h-[400px]  md:px-6 md:py-10 lg:px-8">
      <PawsBackground />
      <div className="relative mx-auto max-w-7xl text-center md:space-y-6 md:pb-48">
        <div className="hidden md:block">
          <h3>Wszystkie Twoje pasje w jednym miejscu</h3>
          <span className="text-muted mx-auto max-w-lg text-base md:text-lg">
            Odkryj nowe możliwości oraz rozwijaj swoje zainteresowania.
          </span>
        </div>
        <form
          method="GET"
          action="/search"
          className="mx-auto flex  max-w-xl flex-row gap-4 rounded-2xl border-2 border-secondary bg-white"
        >
          <div className="flex w-full items-center px-4">
            <Icons.search className="mr-2 hidden size-6 md:block" />
            <Input
              className="h-12 grow rounded-l-2xl rounded-r-none focus-visible:outline-none md:h-16 md:text-base"
              placeholder="Znajdź coś dla siebie..."
              type="text"
              name="search"
            />
          </div>
          <div className="hidden w-full md:block md:w-auto">
            <SearchCombobox data={locationData || []} value={location || ""} />
          </div>
          <Button
            type="submit"
            className="h-12 w-auto  rounded-2xl rounded-l-none  md:h-16 md:text-lg"
          >
            <Icons.search className="size-5 md:size-6" />
          </Button>
        </form>
      </div>

      {/* Cat icon */}
      <div className="absolute -bottom-28 left-1/2 z-20 hidden w-72 -translate-x-1/2 md:block">
        <Image
          src="/defaultcat.png?height=200&width=200"
          alt="Cute cat face peeking from the bottom"
          width={300}
          height={300}
          className="object-cover"
        />
      </div>
    </div>
  )
}
