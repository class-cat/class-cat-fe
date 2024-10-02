"use client"

import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useGetLocations } from "~/actions/get-locations"

import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { SearchCombobox } from "../searchComboBox"

export default function SearchBar() {
  const searchParams = useSearchParams()
  const { data: locationData } = useGetLocations()
  const location = searchParams.get("location") as string
  return (
    <>
      <div className="flex w-full flex-col justify-between gap-9 py-0 sm:py-12 md:w-3/4">
        <h2 className="hidden sm:block">
          Wszystkie Twoje pasje w <br />
          jednym miejscu.
        </h2>
        <form
          method="GET"
          action="/search"
          className="flex  items-center gap-2 rounded-2xl border-2 border-secondary bg-white sm:rounded-3xl sm:border-0 sm:shadow-md lg:mr-4"
        >
          <div className="sm:w-4/8 flex w-full items-center px-4 ">
            <Icons.search className="hidden size-8 md:block" />
            <Input
              className="h-16 grow rounded-l-2xl  rounded-r-none p-2 focus-visible:outline-none sm:rounded-l-3xl md:text-xl"
              placeholder="Znajdź coś dla siebie..."
              type="text"
              name="search"
            />
          </div>
          <div className="hidden h-3/5 w-1 bg-secondary sm:block" />
          <div className="w-4/8 hidden sm:flex">
            <SearchCombobox data={locationData || []} value={location || ""} />
          </div>
          <Button
            type="submit"
            className="h-16 w-24 grow rounded-l-none rounded-r-2xl sm:rounded-r-3xl  sm:shadow-md md:text-xl "
          >
            <Icons.search className="size-6" />
            {/* <p className="hidden sm:block">Wyszukaj</p> */}
          </Button>
        </form>
      </div>
      <div className="h-84 lg:ml-4">
        <Image
          src="./cat.svg"
          alt="cat"
          objectFit="contain"
          height={200}
          width={200}
          className="hidden size-full md:block"
        />
      </div>
    </>
  )
}
