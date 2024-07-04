import { useQuery } from "@tanstack/react-query"
import { type Activity } from "~/types/search.type"

const createItems = (count: number) =>
  Array.from({ length: count }, () => ({
    name: "Sp. nr 8 im. Przyjaciół Ziemii w Gdańsku",
    title: "Siatkówka dla klas 1-3",
    address: "Gdańsk, Dragana 2",
    avatar: "/stock.jpeg",
  }))

type Props = {
  nameValue: string | null
  locationValue: string | null
  sortValue: string | null
}

const getActivities = async ({ ...props }: Props): Promise<Activity[]> => {
  const { nameValue, locationValue, sortValue } = props
  console.log(nameValue, locationValue, sortValue)
  return createItems(20)
}

export const useGetActivities = ({ ...props }: Props) => {
  return useQuery({
    queryKey: ["activities-data"],
    queryFn: () => getActivities({ ...props }),
  })
}
