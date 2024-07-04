"use client"

import { useSearchParams } from "next/navigation"
import { Container } from "~/components/ui/container"
import Map from "../_components/map/map"
import { Pill } from "~/components/pill"
import { Icons } from "~/components/icons"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { SearchInput } from "./_components/searchInput"
import { SearchCombobox } from "./_components/searchComboBox"
import { useQueryClient } from "@tanstack/react-query"
import { SortSelect } from "./_components/sortSelect"
import { useGetLocations } from "~/actions/get-locations"
import { useUpdateQueryParams } from "~/hooks/useUpdateQueryParams"
import { useGetActivities } from "~/actions/get-activities"

export default function SearchBar() {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const name = searchParams.get("name")
  const location = searchParams.get("location")
  const sort = searchParams.get("sort")

  const [nameValue, setNameValue] = useState(name ?? "")
  const [locationValue, setLocationValue] = useState(location ?? "")
  const [sortValue, setSortValue] = useState(sort ?? "name")

  const { data: locationData } = useGetLocations()
  const { data } = useGetActivities({
    nameValue,
    locationValue,
    sortValue,
  })

  const updateQueryParams = useUpdateQueryParams()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    queryClient.invalidateQueries({ queryKey: ["activities-data"] })
    updateQueryParams({
      name: nameValue,
      location: locationValue,
      sort: sortValue,
    })
  }, [nameValue, locationValue, sortValue])

  return (
    <Container className="flex h-[calc(100vh-80px)] flex-col justify-center pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
            <p className="text-2xl font-bold">{`Wyniki wyszukiwania dla: ${nameValue} (${data?.length || 0})`}</p>
            <div className="my-2 flex gap-2">
              <SearchInput value={nameValue} setValue={setNameValue} />
              <div className="flex w-full items-center">
                <SearchCombobox
                  data={locationData}
                  value={locationValue}
                  setValue={setLocationValue}
                />
              </div>
              <div className="flex w-full items-center">
                <Button
                  variant="ghost"
                  className="flex w-full justify-between rounded-lg border-2 border-secondary shadow-none hover:bg-secondary"
                >
                  <Icons.filter className="hidden h-5 w-5 md:block" />
                  Więcej opcji
                  <div></div>
                </Button>
              </div>
            </div>
            <div>
              <SortSelect value={sortValue} setValue={setSortValue} />
            </div>
            <div className="sidebar max-h-[calc(100vh-300px)] overflow-y-auto pr-3">
              {data?.map((item, index) => (
                <div key={index} className="py-2">
                  <Pill item={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="h-full">
            <Map />
          </div>
        </div>
      </section>
      <div className="h-16" />
    </Container>
  )
}
