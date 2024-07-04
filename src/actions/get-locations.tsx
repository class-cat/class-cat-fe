import { useQuery } from "@tanstack/react-query"
import { type Location } from "~/types/search.type"

const locations: Location[] = [
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

const getLocations = async (): Promise<Location[]> => {
  return locations
}

export const useGetLocations = () => {
  return useQuery({
    queryKey: ["locations-data"],
    queryFn: () => getLocations(),
  })
}
