"use client"

import { useSearchParams } from "next/navigation"

export default function SearchBar() {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const search = searchParams.get("test")

  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>Search: {search}</>
}
