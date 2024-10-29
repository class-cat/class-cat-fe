import React from 'react'
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
    <Link href={href}>
      <Card className="aspect-square rounded-2xl border-2 border-secondary bg-secondary p-4 shadow-none md:rounded-3xl">
        <CardContent className="flex h-full flex-col items-center justify-center space-y-2 p-0">
          <div className="relative size-20">
            <Image
              src={avatar}
              alt={title}
              layout="fill"
              className="rounded-lg"
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

const createCardItems = (count: number) =>
  Array.from({ length: count }, () => ({
    title: "piłka nożna",
    desc: "34",
    avatar: "ball.svg",
    href: "search?category=pilkanozna",
  }))

const mostSearchedItems = createCardItems(16)

const RecommendedCategories: React.FC = () => {
  return (
    <section className="max-md:hidden">
      <h4 className="text-center">Polecane kategorie</h4>
      <div className="h-8" />
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