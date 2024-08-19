import Image from "next/image"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export default function SearchBar() {
  return (
    <>
      <div className="flex w-full flex-col justify-between gap-9 py-0 sm:py-12 md:w-3/4">
        <h2 className="hidden sm:block">
          Wszystkie Twoje Pasje w <br />
          jednym miejscu.
        </h2>
        <form
          method="GET"
          action="/search"
          className="flex items-center gap-2 rounded-2xl border-2 border-secondary bg-white sm:rounded-3xl sm:border-0 sm:shadow-lg"
        >
          <div className="flex w-full items-center px-4 sm:w-2/5">
            <Icons.search className="hidden size-8 md:block" />
            <Input
              className="h-16 grow rounded-l-2xl  rounded-r-none p-2 focus-visible:outline-none sm:rounded-l-3xl md:text-xl"
              placeholder="Znajdź coś dla siebie..."
              type="text"
              name="name"
            />
          </div>
          <div className="hidden h-3/5 w-1 bg-secondary sm:block" />
          <div className="hidden w-2/5 items-center px-4 sm:flex">
            <Icons.map className="size-8" />
            <Input
              className="h-16 grow rounded-none p-2 focus-visible:outline-none md:text-xl"
              placeholder="Lokalizacja"
              type="text"
              name="location"
            />
          </div>
          <Button
            type="submit"
            className="h-16 w-20 grow  rounded-l-none rounded-r-2xl sm:rounded-r-3xl  sm:shadow-md md:text-xl"
          >
            <Icons.search className="size-6 sm:hidden" />
            <p className="hidden sm:block">Wyszukaj</p>
          </Button>
        </form>
      </div>
      <div className="h-84">
        <Image
          src="./cat.svg"
          alt="cat"
          objectFit="contain"
          height={200}
          width={200}
          className="hidden size-full md:block"
        />
      </div>
    </>
  )
}
