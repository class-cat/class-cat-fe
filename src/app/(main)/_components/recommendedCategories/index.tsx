import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "~/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"

type Props = {
  title: string
  desc: string
  avatar: string
  href: string
}

const MostSearchItem = ({ title, desc, avatar, href }: Props) => {
  return (
    <Link prefetch={true} href={href}>
      <Card className="aspect-square rounded-2xl border-2 border-secondary bg-secondary p-4 shadow-none md:rounded-3xl">
        <CardContent className="flex h-full flex-col items-center justify-center  p-2">
          <div className="relative size-16 object-fill">
            <Image
              src={avatar}
              alt={title}
              className="rounded-lg"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col items-center justify-center pt-2 text-center capitalize max-md:hidden">
            <p className="text-md text-foregroundMuted">{title}</p>
            <p className="text-md text-foregroundMuted">{desc}</p>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center pt-2 text-center capitalize md:hidden">
        <p className="text-sm text-foregroundMuted">{title}</p>
      </div>
    </Link>
  )
}

const mostSearchedItems = [
  {
    title: "piłka nożna",
    desc: "34",
    avatar: "football.svg",
    href: "search?category=pilkanozna",
  },
  {
    title: "łucznictwo",
    desc: "4",
    avatar: "archery.svg",
    href: "search?category=lucznictwo",
  },
  {
    title: "badminton",
    desc: "14",
    avatar: "badminton.svg",
    href: "search?category=badminton",
  },
  {
    title: "tenis",
    desc: "32",
    avatar: "tennis.svg",
    href: "search?category=tenis",
  },
  {
    title: "koszykówka",
    desc: "61",
    avatar: "basketball.svg",
    href: "search?category=koszykowka",
  },
  {
    title: "boks",
    desc: "12",
    avatar: "boxing.svg",
    href: "search?category=boks",
  },
  {
    title: "golf",
    desc: "9",
    avatar: "golf.svg",
    href: "search?category=golf",
  }
]

const RecommendedCategories: React.FC = () => {
  return (
    <section className="max-md:hidden">
      <h4 className="text-center">Polecane kategorie</h4>
      <div className="h-3"/>
      <div className="flex justify-center">
        <Carousel
          className="max-w-2xl lg:max-w-3xl xl:max-w-5xl"
          opts={{ align: "start", loop: false }}
        >
          <CarouselContent className="-ml-2">
            {mostSearchedItems.map((item, index) => (
              <CarouselItem key={index} className="basis-1/3 lg:basis-1/6">
                <div className="p-1">
                  <MostSearchItem {...item} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
          <CarouselPrevious className="ml-2" />
          <CarouselNext className="mr-2" />
        </Carousel>
      </div>
    </section>
  )
}

export default RecommendedCategories
