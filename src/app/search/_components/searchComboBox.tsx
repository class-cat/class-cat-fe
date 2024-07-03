import { Icons } from "~/components/icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    placeholder: string
    emptyText: string
    data: {
        value: string,
        label: string
    }[],
    value: string
    setValue: (value: string) => void
}

export function SearchCombobox({ open, setOpen, placeholder, emptyText, data, value, setValue }: Props) {
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
                        ? data.find((item) => item.value === value)?.label
                        : "Lokalizacja"}
                    <Icons.chevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-full p-0 h-[250px]">
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>{emptyText}</CommandEmpty>
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
