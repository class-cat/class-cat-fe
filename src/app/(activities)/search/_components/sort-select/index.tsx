"use client"

import { Icons } from "~/components/icons"
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { useState } from "react"
import { useUpdateQueryParams } from "~/app/_hooks/useUpdateQueryParams"
import { data } from "./constants"

interface Props {
  value: string | null
}

export function SortSelect({ value }: Props) {
  const [open, setOpen] = useState(false)

  const updateQueryParams = useUpdateQueryParams()

  const handleOnSelect = (currentValue: string) => {
    updateQueryParams({ sort: currentValue })
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex rounded-lg border-2 border-white shadow-none hover:bg-secondary"
        >
          {value
            ? `Sortuj: ${data.find((item) => item.value === value)?.label}`
            : "Sortuj: Domyślnie"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-full p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {data.map((item) => (
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
