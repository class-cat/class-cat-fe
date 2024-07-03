"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Container } from "~/components/ui/container"
import Map from "../_components/map/map"
import { Pill } from "~/components/pill"
import { Icons } from "~/components/icons"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { SearchInput } from "./_components/searchInput"
import { SearchCombobox } from "./_components/searchComboBox"
import { useGetLessons } from "~/actions/get-lessons"
import { useQueryClient } from "@tanstack/react-query"

const locations = [
  {
    value: "bydgoszcz",
    label: "Bydgoszcz",
  },
  {
    value: "gdansk",
    label: "Gdańsk",
  },
  {
    value: "poznan",
    label: "Poznań",
  },
  {
    value: "warszawa",
    label: "Warszawa",
  },
  {
    value: "krakow",
    label: "Kraków",
  },
  {
    value: "wroclaw",
    label: "Wrocław",
  },
  {
    value: "gdynia",
    label: "Gdynia",
  },
]

export default function SearchBar() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const search = searchParams.get("category")
  const location = searchParams.get("location")
  const [openSearchCombobox, setOpenSearchCombobox] = useState(false)
  const [searchValue, setSearchValue] = useState(search || "")
  const [locationValue, setLocationValue] = useState(location || "")

  const { data } = useGetLessons({
      searchValue,
      locationValue
    })

  useEffect(() => {
    queryClient.invalidateQueries({queryKey: ['lessons-data']})
    router.push(`?category=${searchValue}&location=${locationValue}`)
  }, [searchValue, locationValue])

  return (
    <Container className="h-[calc(100vh-80px)] flex flex-col justify-center pt-6">
      <section className="flex flex-1 overflow-hidden">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 w-full">
          <div>
            <p className="text-2xl font-bold">{`Wyniki wyszukiwania dla: ${searchValue} (${data?.length || 0})`}</p>    
            <div className="flex gap-2 my-2 ml-0.5">
              <SearchInput 
                value={searchValue} 
                setValue={setSearchValue} 
              />
            <div className="flex w-full items-center">
              <SearchCombobox
                open={openSearchCombobox}
                setOpen={setOpenSearchCombobox}
                emptyText="Nie znaleziono lokalizacji."
                placeholder="Wybierz lokalizację..."
                data={locations}
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
          <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-3 mt-8 sidebar">
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
