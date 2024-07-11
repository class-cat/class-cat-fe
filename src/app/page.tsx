import Image from "next/image"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Container } from "~/components/ui/container"
import { Input } from "~/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { Card, CardContent } from "~/components/ui/card"
import { Pill } from "~/components/pill/pill"
import { Map } from "./_components/map"
import Link from "next/link"
import { MobileMap } from "./_components/map/mobileMap"

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
    avatar: "/stock.jpeg",
   
  }))

const tabsContent = [
  { value: "newest", items: createItems(8) },
  { value: "today", items: createItems(8) },
  { value: "recommended", items: createItems(8) },
  { value: "viewed", items: createItems(8) },
]

const createCardItems = (count: number) =>
  Array.from({ length: count }, () => ({
    title: "piłka nożna",
    desc: "34",
    avatar: "ball.svg",
    href: "search?category=pilkanozna",
  }))

type MostSearchItemProps = {
  title: string
  desc: string
  avatar: string
}
const MostSearchItem = ({ title, desc, avatar }: MostSearchItemProps) => {
  return (
    <Card className="aspect-square rounded-3xl border-secondary border-2 bg-secondary p-4 shadow-none">
      <CardContent className="flex flex-col items-center justify-center space-y-2 h-full p-0">
        <div className="relative h-20 w-20">
          <Image
            src={avatar}
            alt={title}
            layout="fill"
            
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center capitalize pt-2">
          <p className="text-foregroundMuted text-md">{title}</p>
          <p className="text-foregroundMuted text-md">{desc}</p>
        </div>
      </CardContent>
    </Card>


  )
}
const mostSearchedItems = createCardItems(16)

export default function HomePage() {
  return (
    <Container className="h-full flex-1 justify-center pt-6">
      <section className="paddingX flex justify-between gap-0 rounded-3xl bg-secondary py-4 sm:gap-4">
        <div className="flex w-full flex-col justify-between gap-9 py-12 md:w-3/4">
          <h2>
            Wszystkie Twoje Pasje w <br />
            jednym miejscu.
          </h2>
          <form
            method="GET"
            action="/search"
            className="flex items-center gap-2 rounded-3xl bg-white shadow-lg"
          >
            <div className="flex w-full items-center px-4 sm:w-2/5">
              <Icons.search className="hidden h-8 w-8 md:block" />
              <Input
                className="h-16 flex-grow rounded-l-3xl rounded-r-none px-2 py-2 focus-visible:outline-none md:text-xl"
                placeholder="Słowo kluczowe..."
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
              className="h-16 flex-grow rounded-l-none rounded-r-3xl shadow-md md:text-xl"
            >
              Wyszukaj
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
      </section>
      <div className="h-10" />
      <section>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div>
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
                          : "hidden border-0 sm:block"
                    }`}
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="xl:hidden mt-6">
              <MobileMap />
            </div>
              <div className="h-6" />
              {tabsContent.map((tab) => (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="grid grid-cols-1 gap-4 xl:grid-cols-2"
                >
                  {tab.items.map((item, index) => (
                    <Pill key={index} item={item} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="hidden xl:block h-full">
            <Map />
          </div>
        </div>
      </section>
      <div className="h-16" />
      <section>
        <div className="text-center">
          <h3>Najczęściej wyszukiwane zajęcia</h3>
        </div>
        <div className="h-8" />
        <div className="flex justify-center">
          <Carousel
            className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl xl:max-w-7xl"
            opts={{ align: "start", loop: false }}
          >
            <CarouselContent className="-ml-2">
              {mostSearchedItems.map((item, index) => (             
                <CarouselItem
                  key={index}
                  className="basis-1/2 md:basis-1/3 lg:basis-1/6" 
                >
                  <div className="p-1">
                  <Link  href={item.href}>
                    <MostSearchItem {...item} />
                    </Link>
                  </div>    
                </CarouselItem>      
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-2" />
            <CarouselNext className="mr-2" />
          </Carousel>
        </div>
      </section>
      <div className="h-16" />
      <div className="flex w-full flex-col items-center justify-center gap-8 border-t-2 border-secondary text-center sm:flex-row">
        <div className="h-16" />
        <h4>Zapoznaj się z ofertą dla firm</h4>
        <Button variant={"outline"} size={"lg"} className="w-full sm:w-40">
          Sprawdź szczegóły
        </Button>
      </div>
      <div className="h-16" />
    </Container>
  )
}
