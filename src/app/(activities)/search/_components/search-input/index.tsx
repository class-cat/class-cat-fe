"use client"

import { useEffect, useState } from "react"
import { useDebounce } from "~/app/_hooks/useDebounce"
import { useUpdateQueryParams } from "~/app/_hooks/useUpdateQueryParams"
import { Icons } from "~/components/icons"
import { Input } from "~/components/ui/input"

interface Props {
  value: string | null
}

export const SearchInput = ({ value }: Props) => {
  const updateQueryParams = useUpdateQueryParams()

  const [inputValue, setInputValue] = useState(value)
  const debouncedValue = useDebounce(inputValue, 500)

  useEffect(() => {
    updateQueryParams({ search: debouncedValue })
  }, [debouncedValue, updateQueryParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="border-secondary flex w-full items-center rounded-lg border-2">
      <div className="inline-flex w-full items-center justify-between px-4">
        <Icons.search className="hidden size-6 md:block" />
        <Input
          className="focus-visible:outline-none"
          placeholder="Słowo kluczowe..."
          type="text"
          value={inputValue || ""}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
