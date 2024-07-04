"use client"

import { useSearchParams } from "next/navigation"
import { Container } from "~/components/ui/container"
import Map from "../../components/map/map"
import { useEffect } from "react"
import { SearchInput } from "./_components/searchInput"
import { SearchCombobox } from "./_components/searchComboBox"
import { useQueryClient } from "@tanstack/react-query"
import { SortSelect } from "./_components/sortSelect"
import { useGetLocations } from "~/actions/get-locations"
import { useGetActivities } from "~/actions/get-activities"
import { MoreOptionDialog } from "./_components/moreOptionDialog"
import PlaceholderPill from "~/components/pill/placeholerPill"
import { Pill } from "~/components/pill/pill"
import PlaceholderMap from "../../components/map/placeholderMap"


export default function SearchPage() {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()

  const name = searchParams.get("name")
  const location = searchParams.get("location")
  const sort = searchParams.get("sort")
  const distance = searchParams.get("distance")
  const age = searchParams.get("age")

  const { data: locationData} = useGetLocations()

  const { data, isLoading } = useGetActivities({
      nameValue: name || "",
      locationValue: location,
      sortValue: sort,
      distanceValue: distance,
      ageValue: age,
    })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['activities-data'] });
  }, [name, location, sort, distance, age]);


  return (
    <Container className="h-[calc(100vh-80px)] flex flex-col justify-center pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 w-full">
          <div>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold truncate">{`Wyniki wyszukiwania dla: ${name || ""}`}</p>
              <p className="text-2xl font-bold">{`(${data?.length || 0})`}</p>
            </div> 
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
            <div className="xl:hidden">
              <Map/>
            </div>
           <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-3 sidebar mt-2">
              {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <div key={index} className="py-2">
                    <PlaceholderPill />
                  </div>
                ))
              ) : (
                data?.map((item, index) => (
                  <div key={index} className="py-2">
                    <Pill item={item} />
                  </div>
                ))
              )}
            </div>
        </div>
        <div className="h-full">
        {isLoading ? 
          ( 
            <PlaceholderMap />
          ) : 
            <Map />
        }
        </div>
      </div>
    </section>
    <div className="h-16" />
  </Container>
  )
}
