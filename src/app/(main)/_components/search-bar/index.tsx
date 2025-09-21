/* eslint-disable tailwindcss/enforces-negative-arbitrary-values */
"use client"

import Image from "next/image"
import { SearchForm } from "./search-form"
import { SearchHeader } from "./search-header"
import { PawsBackground } from "./paws-background"

export const SearchBar = () => {
  return (
    <div className="relative overflow-hidden pb-2 md:min-h-[400px] md:px-6 md:py-10 lg:px-8">
      <PawsBackground />
      <div className="relative mx-auto max-w-7xl text-center md:space-y-6 md:pb-48">
        <SearchHeader />
        <SearchForm />
      </div>
      <div className="absolute -bottom-[80px] left-1/2 z-20 hidden w-80 -translate-x-1/2 md:block">
        <Image
          src="/home_cat.png?height=200&width=200"
          alt="Cute cat face peeking from the bottom"
          priority
          width={300}
          height={300}
          className="object-cover"
        />
      </div>
    </div>
  )
}
