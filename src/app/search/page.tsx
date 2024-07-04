"use client"

import { useSearchParams } from "next/navigation"
import { Container } from "~/components/ui/container"
import Map from "../_components/map/map"
import { Pill } from "~/components/pill"
import { useEffect } from "react"
import { SearchInput } from "./_components/searchInput"
import { SearchCombobox } from "./_components/searchComboBox"
import { useQueryClient } from "@tanstack/react-query"
import { SortSelect } from "./_components/sortSelect"
import { useGetLocations } from "~/actions/get-locations"
import { useGetActivities } from "~/actions/get-activities"
import { MoreOptionDialog } from "./_components/moreOptionDialog"

export default function SearchPage() {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const name = searchParams.get("name") as string
  const location = searchParams.get("location") as string | undefined
  const sort = searchParams.get("sort") as string | undefined
  const distance = searchParams.get("distance") as string | undefined
  const age = searchParams.get("age") as string | undefined

  const { data: locationData} = useGetLocations()

  const { data } = useGetActivities({
      nameValue: name || "",
      locationValue: location || undefined,
      sortValue: sort || undefined,
      distanceValue: distance || undefined,
      ageValue: age || undefined,
    })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['activities-data'] });
  }, [name, location, sort, distance, age]);


  return (
    <Container className="h-[calc(100vh-80px)] flex flex-col justify-center pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 w-full">
          <div>
            <p className="text-2xl font-bold">{`Wyniki wyszukiwania dla: ${name || ""} (${data?.length || 0})`}</p>    
            <div className="flex gap-2 my-2">
              <SearchInput 
                value={name} 
              />
            <div className="flex w-full items-center">
              <SearchCombobox
                data={locationData}
                value={location}
              />
            </div>
            <div className="flex w-full">
            <MoreOptionDialog
              distanceValue={distance}
              ageValue={age}
            />  
            </div>
          </div>   
            <SortSelect
              value={sort}
            />
          <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-3 sidebar">
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
