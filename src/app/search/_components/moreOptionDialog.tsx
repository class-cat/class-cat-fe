'use client'

import { useState } from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useUpdateQueryParams } from "~/hooks/useUpdateQueryParams"

const distanceData = [
    {value: '0', label: "+0 km"},
    {value: '5', label: "+5 km"},
    {value: '10', label: "+10 km"},
    {value: '15', label: "+15 km"},
    {value: '20', label: "+20 km"},
    {value: '30', label: "+30 km"},
    {value: '50', label: "+50 km"},
]

const classRangeData = [
    {value: '1', label: "1-3"},
    {value: '2', label: "4-6"},
    {value: '3', label: "7-8"},
    {value: '4', label: "ponad podstawowa"},
]

type Props = {
    distanceValue: string | null
    ageValue: string | null
}

export const MoreOptionDialog = ({distanceValue, ageValue} : Props) => {
    const updateQueryParams = useUpdateQueryParams()

    const [open, setOpen] = useState(false)
    const [distance, setDistance] = useState(distanceValue)
    const [age, setAge] = useState(ageValue)

    const handleSaveOptions = () => {
        updateQueryParams({ distance: distance, age: age });
        setOpen(false)
    };

    const handleResetOptions = () => {
        setDistance(null)
        setAge(null)
    };

    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen)
        if (isOpen) {
            setDistance(distanceValue)
            setAge(ageValue)
        }
    };
    
    return( 
        <Dialog open={open} onOpenChange={handleOpenChange}>
              <DialogTrigger className="flex w-full justify-center md:justify-between" asChild> 
                <Button
                    variant="ghost"
                    className="rounded-lg border-2 border-secondary py-5 shadow-none hover:bg-secondary"
                    onClick={() => setOpen(true)}
                >
                    <Icons.filter className="hidden h-5 w-5 md:block" />
                    Więcej opcji
                    <div></div>
                </Button>
            </DialogTrigger>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Więcej opcji</DialogTitle>
                <DialogDescription>
                    <div className="flex flex-col gap-1">
                       <div className="text-lg">
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