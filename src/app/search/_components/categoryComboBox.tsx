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
import type { Category } from "~/types/search.type"

type Props = {
  data?: Category[]
  value: string | null
  setValue: (value: string | null) => void
}

export function CategoryComboBox({ data, value, setValue }: Props) {
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
          className="flex justify-between flex w-[210px] items-center rounded-lg border-2 border-secondary shadow-none px-3"
        >
          {value
            ? data?.find((item) => item.value === value)?.label
            : "Kategoria"}
          <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex h-[250px] w-full p-0 border-2 border-secondary overflow-y-auto">
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
                  className="data-[selected=true]:bg-secondary data-[selected=true]:text-foregorund"
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
