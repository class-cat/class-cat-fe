import Image from "next/image"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Container } from "~/components/ui/container"
import { Input } from "~/components/ui/input"

export default function HomePage() {
  return (
    <Container className="h-full flex-1 justify-center">
      <div className="paddingX flex justify-between gap-12 rounded-3xl bg-secondary py-4">
        <div className="flex w-3/4 flex-col justify-between gap-9 py-12">
          <h1>
            Wszystkie Twoje Pasje w <br />
            jednym miejscu.
          </h1>
          <div className="flex items-center gap-2 rounded-3xl bg-white shadow-lg">
            <div className="flex w-2/5 items-center px-4">
              <Icons.search className="hidden h-8 w-8 md:block" />
              <Input
                className="h-16 flex-grow rounded-l-3xl rounded-r-none px-2 py-2 focus-visible:outline-none md:text-xl"
                placeholder="Zdjęcia, słowo kluczowe..."
                type="text"
              />
            </div>
            <div className="h-[60%] w-1 bg-[#F4ECDF]" />
            <div className="flex w-2/5 items-center px-4">
              <Icons.map className="hidden h-8 w-8 md:block" />
              <Input
                className="h-16 flex-grow rounded-none px-2 py-2 focus-visible:outline-none md:text-xl"
                placeholder="Lokalizacja"
                type="text"
              />
            </div>
            <Button className="h-16 flex-grow rounded-l-none rounded-r-3xl shadow-md md:text-xl">
              Wyszukaj
            </Button>
          </div>
        </div>
        <Image
          src="./cat.svg"
          alt="cat"
          width={300}
          height={300}
          className="hidden md:block"
        />
      </div>
    </Container>
  )
}
