'use client'

import { Icons } from "~/components/icons";
import { Command, CommandGroup, CommandItem, CommandList } from "~/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useState } from "react";

type Props = {
    value: string
    setValue: (value: string) => void
}

const data = [
    {
      value: "distance",
      label: "Odległość",
    },
    {
      value: "rating",
      label: "Ocena",
    },
    {
      value: "price",
      label: "Cena",
    },
    {
      value: "name",
      label: "Nazwa",
    },
    {
      value: "date",
      label: "Data",
    },
  ]
  

export function SortSelect({ value, setValue }: Props) {
    const [open, setOpen] = useState(false)
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button
                variant="ghost"
                className="flex rounded-lg border-2 border-white shadow-none hover:bg-secondary"
              >
               {value
                    ? `Sortuj: ${data.find((item) => item.value === value)?.label}`
                    : "Sortuj: Domyślnie"
                }
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
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
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
