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
                        className="flex items-center gap-2 rounded-2xl sm:rounded-3xl bg-white border-secondary border-2 sm:border-0 sm:shadow-lg"
                    >
                        <div className="flex w-full items-center px-4 sm:w-2/5">
                            <Icons.search className="hidden h-8 w-8 md:block" />
                            <Input
                                className="h-16 flex-grow rounded-l-2xl  sm:rounded-l-3xl rounded-r-none px-2 py-2 focus-visible:outline-none md:text-xl"
                                placeholder="Znajdź coś dla siebie..."
                                type="text"
                                name="name"
                            />
                        </div>
                        <div className="hidden h-[60%] w-1 bg-[#F4ECDF] sm:block" />
                        <div className="hidden w-2/5 items-center px-4 sm:flex">
                            <Icons.map className="h-8 w-8" />
                            <Input
                                className="h-16 flex-grow rounded-none px-2 py-2 focus-visible:outline-none md:text-xl"
                                placeholder="Lokalizacja"
                                type="text"
                                name="location"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-16 flex-grow rounded-l-none  rounded-r-2xl sm:rounded-r-3xl w-20  sm:shadow-md md:text-xl"
                        >
                            <Icons.search className="h-6 w-6 sm:hidden" />
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
                        className="hidden h-full w-full md:block"
                    />
                </div>
         
        </>
    )
}
