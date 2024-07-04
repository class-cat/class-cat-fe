import { useQuery } from "@tanstack/react-query";
import { Activity } from "~/types/search.type";

const createItems = (count: number) =>
    Array.from({ length: count }, () => ({
      name: "Sp. nr 8 im. Przyjaciół Ziemii w Gdańsku",
      title: "Siatkówka dla klas 1-3",
      address: "Gdańsk, Dragana 2",
      avatar: "/stock.jpeg",
    }))

type Props = {
    nameValue: string | undefined
    locationValue: string | undefined
    sortValue: string | undefined
    distanceValue: string | undefined
    ageValue: string | undefined
}

const getActivities = async ({...props}: Props): Promise<Activity[]> => {
    const {nameValue, locationValue, sortValue, distanceValue, ageValue} = props
    console.log(nameValue, locationValue, sortValue, distanceValue, ageValue)
    return createItems(20)
};

export const useGetActivities = ({...props}: Props) => {
  return useQuery({
    queryKey: ["activities-data"],
    queryFn: () => getActivities({...props}),
  });
};