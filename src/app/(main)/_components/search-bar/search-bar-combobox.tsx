"use client"

import { useState } from "react"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { useUpdateQueryParams } from "~/app/_hooks/useUpdateQueryParams"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { MOBILE_BREAKPOINT } from "~/lib/const"
import { cn } from "~/lib/utils"
import type { EntireLocation } from "~/types/search.type"

interface Props {
  data?: EntireLocation[]
  value: string | null
}

export const SearchBarCombobox = ({ data, value }: Props) => {
  const [open, setOpen] = useState(false)
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

  const updateQueryParams = useUpdateQueryParams()

  const handleOnSelect = (currentValue: string) => {
    updateQueryParams({ location: currentValue })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="md:w-full">
        <Button
          className="text-foreground h-16 w-24 grow bg-white shadow-none hover:bg-white md:text-base"
          role="combobox"
          aria-expanded={open}
        >
          {value
            ? data?.find((item) => item.value === value)?.label
            : "Lokalizacja"}
          <Icons.chevronUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex h-[250px] w-full p-0"
        align={isMobile ? "end" : "center"}
      >
        <Command>
          <CommandInput placeholder="Wybierz lokalizację..." />
          <CommandList>
            <CommandEmpty>Nie znaleziono lokalizacji.</CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    handleOnSelect(currentValue)
                  }}
                >
                  <Icons.check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
