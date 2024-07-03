import { useQuery } from "@tanstack/react-query";
import { Lesson } from "~/types/lesson.type";

const createItems = (count: number) =>
    Array.from({ length: count }, () => ({
      name: "Sp. nr 8 im. Przyjaciół Ziemii w Gdańsku",
      title: "Siatkówka dla klas 1-3",
      address: "Gdańsk, Dragana 2",
      avatar: "/stock.jpeg",
    }))

type Props = {
    searchValue: string | null
    locationValue: string | null
}

const getLessons = async ({searchValue, locationValue}: Props): Promise<Lesson[]> => {
    console.log(searchValue, locationValue)
    return createItems(20)
};

export const useGetLessons = ({searchValue, locationValue}: Props) => {
  return useQuery({
    queryKey: ["lessons-data"],
    queryFn: () => getLessons({searchValue, locationValue}),
  });
};