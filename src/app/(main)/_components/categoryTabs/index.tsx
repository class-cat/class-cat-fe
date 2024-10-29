import React from 'react'
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs"

const tabsTriggers = [
  { id: 1, title: "Oferty dnia", value: "today" },
  { id: 2, title: "Polecane", value: "recommended" },
  { id: 3, title: "Najnowsze oferty", value: "newest" },
  { id: 4, title: "Polubione", value: "viewed" },
]

type Props = {
  onTabChange: (value: string) => () => void
  children: React.ReactNode
}

export const CategoryTabs = ({ onTabChange, children }: Props) => {
  return (
    <Tabs defaultValue="newest" className="w-full">
      <TabsList className="flex justify-between max-md:hidden">
        {tabsTriggers.map((tab, index) => (
          <TabsTrigger
            onClick={onTabChange(tab.value)}
            key={tab.id}
            value={tab.value}
            className={`${
              index === 1
                ? "border-x-2"
                : index !== tabsTriggers.length - 1
                  ? "border-r-2"
                  : "hidden border-0 md:block"
            }`}
          >
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}