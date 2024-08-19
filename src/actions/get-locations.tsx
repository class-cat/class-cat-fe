import { useQuery } from "@tanstack/react-query"
import { type EntireLocation } from "~/types/search.type"

const locations: EntireLocation[] = [
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

const getLocations = async (): Promise<EntireLocation[]> => {
  return locations
}

export const useGetLocations = () => {
  return useQuery({
    queryKey: ["locations-data"],
    queryFn: () => getLocations(),
  })
}
