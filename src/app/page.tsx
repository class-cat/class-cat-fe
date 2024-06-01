import Image from "next/image"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Container } from "~/components/ui/container"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import React from "react"
import { TabPill } from "./_components/tabs/pill"

const tabsTriggers = [
  {
    id: 1,
    title: "Najnowsze oferty",
    value: "newest",
  },
  {
    id: 2,
    title: "Oferty dnia",
    value: "today",
  },
  {
    id: 3,
    title: "Polecane",
    value: "recommended",
  },
  {
    id: 4,
    title: "Ostatnio oglądane",
    value: "viewed",
  },
]

const createItems = (count: number) =>
  Array.from({ length: count }, () => ({
    title: "Siatkówka dla klas 1-3",
    address: "Gdańsk, Dragana 2",
    avatar: "./stock.png",
  }))
const tabsContent = [
  { value: "newest", items: createItems(8) },
  { value: "today", items: createItems(8) },
  { value: "recommended", items: createItems(8) },
  { value: "viewed", items: createItems(8) },
]
export default function HomePage() {
  return (
    <Container className="h-full flex-1 justify-center">
      <section className="paddingX flex justify-between gap-12 rounded-3xl bg-secondary py-4">
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
      </section>
      <div className="h-16" />
      <section className="flex flex-wrap justify-between">
        <Tabs defaultValue="newest" className="w-full">
          <TabsList className="flex justify-between">
            {tabsTriggers.map((tab, index) => (
              <TabsTrigger
                key={tab.id}
                value={tab.value}
                className={`${
                  index === 1
                    ? "border-x-2"
                    : index !== tabsTriggers.length - 1
                      ? "border-r-2"
                      : "border-0"
                }`}
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="h-4" />
          {tabsContent.map((tab, index) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="grid grid-cols-1 gap-4 md:grid-cols-2"
            >
              {tab.items.map((item, index) => (
                <TabPill key={index} item={item} />
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </Container>
  )
}
