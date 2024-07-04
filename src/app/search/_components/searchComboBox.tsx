'use client'

import { Icons } from "~/components/icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { Location } from "~/types/search.type";
import { useUpdateQueryParams } from "~/hooks/useUpdateQueryParams";

type Props = {
    data?: Location[],
    value: string | undefined
}

export function SearchCombobox({ data, value }: Props) {
    const updateQueryParams = useUpdateQueryParams()

    const [open, setOpen] = useState(false) 
    const handleOnSelect = (currentValue: string) => {
        updateQueryParams({ location: currentValue })
        setOpen(false)
    }

    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="default"
                    role="combobox"
                    aria-expanded={open}
                    className="flex w-full justify-between rounded-lg border-2 border-primary shadow-none"
                >
                    <Icons.globe className="hidden h-5 w-5 md:block" />
                    {value
                        ? data?.find((item) => item.value === value)?.label
                        : "Lokalizacja"}
                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-full p-0 h-[250px]">
                <Command>
                    <CommandInput placeholder='Wybierz lokalizację...' />
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