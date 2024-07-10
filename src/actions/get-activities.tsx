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
    distanceValue: string | null
    ageValue: string | null
    priceValue: string | null
    categoryValue: string | null
}

const getActivities = async ({...props}: Props): Promise<Activity[]> => {
    const {nameValue, locationValue, sortValue, distanceValue, ageValue, priceValue, categoryValue} = props
    console.log(nameValue, locationValue, sortValue, distanceValue, ageValue, priceValue, categoryValue)
    return createItems(20)
};

export const useGetActivities = ({ ...props }: Props) => {
  return useQuery({
    queryKey: ["activities-data"],
    queryFn: () => getActivities({ ...props }),
  })
}
