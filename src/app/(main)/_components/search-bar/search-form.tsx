"use client"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { SearchBarCombobox } from "./search-bar-combobox"
import { useSearchParams } from "next/navigation"
import { useGetLocations } from "~/actions/get-locations"

export const SearchForm = () => {
  const searchParams = useSearchParams()
  const { data: locationData } = useGetLocations()
  const location = searchParams.get("location") as string

  return (
    <form
      method="GET"
      action="/search"
      className="mx-auto flex max-w-2xl flex-row gap-4 rounded-2xl border-2 border-secondary bg-white"
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
      <div className="md:my-auto md:flex md:h-12 md:w-[6px] md:bg-secondary" />
      <div className="hidden w-full md:block md:w-auto">
        <SearchBarCombobox
          data={locationData || []}
          value={location || ""}
        />
      </div>
      <Button
        type="submit"
        className="h-12 w-auto rounded-2xl rounded-l-none md:h-16 md:text-lg"
      >
        <Icons.search className="size-5 md:size-6" />
      </Button>
    </form>
  )
} 