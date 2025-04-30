"use client"

import { Icons } from "~/components/icons"
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
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { useState } from "react"

interface Props {
  data?: any[]
  value: string | null
  setValue: (value: string | null) => void
}

export const CategoryComboBox = ({ data, value, setValue }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOnSelect = (currentValue: string) => {
    setOpen(false)
    setValue(currentValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="combobox"
          role="combobox"
          aria-expanded={open}
          className="flex w-[210px] items-center justify-between rounded-lg border-2 border-secondary px-3 shadow-none"
        >
          {value
            ? data?.find((item) => item.value === value)?.label
            : "Kategoria"}
          <Icons.chevronUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex h-[250px] w-full overflow-y-auto border-2 border-secondary p-0">
        <Command>
          <CommandInput placeholder="Wybierz kategorię..." />
          <CommandList>
            <CommandEmpty>Nie znaleziono kategorii.</CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    handleOnSelect(currentValue)
                  }}
                  className="data-[selected=true]:text-foregorund data-[selected=true]:bg-secondary"
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
