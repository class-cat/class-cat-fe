"use client"

import { useState } from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { PriceSlider } from "./priceSlider"
import { useUpdateQueryParams } from "~/app/_hooks/useUpdateQueryParams"
import { CategoryComboBox } from "./categoryComboBox"
import { useMediaQuery } from "~/app/_hooks/useMediaQuery"
import { MOBILE_BREAKPOINT } from "~/lib/const"

const distanceData = [
    { value: '0', label: "+0 km" },
    { value: '5', label: "+5 km" },
    { value: '10', label: "+10 km" },
    { value: '15', label: "+15 km" },
    { value: '20', label: "+20 km" },
    { value: '30', label: "+30 km" },
    { value: '50', label: "+50 km" },
]

const classRangeData = [
    { value: '1', label: "1-3" },
    { value: '2', label: "4-6" },
    { value: '3', label: "7-8" },
    { value: '4', label: "ponad podstawowa" },
]

const categoryData = [
    { value: 'koszykowka', label: "Koszykówka" },
    { value: 'pilkanozna', label: "Piłka nozna" },
    { value: 'silownia', label: "Siłownia" },
    { value: 'gimnastyka', label: "Gimnastyka" },
    { value: 'boks', label: "Boks" },
    { value: 'judo', label: "Judo" },
    { value: 'wspinaczkosportowa', label: "Wspinaczkosportowa" },
    { value: 'kolarstwo', label: "Kolarstwo" },
]

type Props = {
    categoryValue: string | null
    distanceValue: string | null
    ageValue: string | null
    priceValue: string | null
}

export const MoreOptionDialog = ({categoryValue, distanceValue, ageValue, priceValue }: Props) => {
    const updateQueryParams = useUpdateQueryParams()
    const isMobile = useMediaQuery(MOBILE_BREAKPOINT)

    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState(categoryValue)
    const [distance, setDistance] = useState(distanceValue)
    const [age, setAge] = useState(ageValue)
    const [price, setPrice] = useState<number[] | undefined>(priceValue ? [parseInt(priceValue, 10)] : [200])

    const handleSaveOptions = () => {
        updateQueryParams({ category, distance, age, price: price ? price.toString() : null });
        setOpen(false)
    };

    const handleResetOptions = () => {
        setCategory(null)
        setDistance(null)
        setAge(null)
        setPrice(undefined)
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen) {
            setCategory(categoryValue)
            setDistance(distanceValue)
            setAge(ageValue)
            setPrice(priceValue ? [parseInt(priceValue, 10)] : [200])
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger className="md:flex md:w-full md:justify-center lg:justify-between" asChild>
                {
                    isMobile ?
                        <Button variant="outline" size="icon">
                            <Icons.filter className="h-5 w-5" />
                        </Button>
                    :
                        <Button
                            variant="ghost"
                            className="rounded-lg border-2 border-secondary py-5 shadow-none hover:bg-secondary"
                            onClick={() => setOpen(true)}
                        >
                        <Icons.filter className="hidden h-5 w-5 md:block" />
                        Więcej opcji
                        <div></div>
                    </Button>
                }
                
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Więcej opcji</DialogTitle>
                    <DialogDescription>
                        <div className="flex flex-col gap-1">
                            <div className="text-lg">
                                Kategoria
                            </div>
                            <CategoryComboBox value={category} data={categoryData} setValue={setCategory}/>
                            <div className="text-lg mt-2">
                                Odległość
                            </div>
                            <div>
                                <Select value={distance || undefined} onValueChange={setDistance}>
                                    <SelectTrigger className="w-[210px]">
                                        <SelectValue placeholder="Odległość" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {distanceData.map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-lg mt-2">
                                Klasa
                            </div>
                            <div>
                                <Select value={age || undefined} onValueChange={setAge}>
                                    <SelectTrigger className="w-[210px]">
                                        <SelectValue placeholder="Klasa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {classRangeData.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-lg mt-2">
                                Kwota do
                            </div>
                            <div>
                                <PriceSlider value={price} onValueChange={setPrice} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <Button variant="outline" onClick={() => handleResetOptions()}>Wyczyść</Button>
                    <Button onClick={() => handleSaveOptions()}>Zapisz</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
