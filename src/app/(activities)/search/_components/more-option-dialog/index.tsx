"use client"

import { useState } from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { PriceSlider } from "../price-slider"
import { useUpdateQueryParams } from "~/app/_hooks/useUpdateQueryParams"
import { CategoryComboBox } from "../category-combo-box"
import React from "react"
import { categoryData, classRangeData, distanceData } from "./constants"

interface Props {
  categoryValue: string | null
  distanceValue: string | null
  ageValue: string | null
  priceValue: string | null
}

export const MoreOptionDialog = ({
  categoryValue,
  distanceValue,
  ageValue,
  priceValue,
}: Props) => {
  const updateQueryParams = useUpdateQueryParams()

  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState(categoryValue)
  const [distance, setDistance] = useState(distanceValue)
  const [age, setAge] = useState(ageValue)
  const [price, setPrice] = useState<number[] | undefined>(
    priceValue ? [parseInt(priceValue, 10)] : [200]
  )

  const handleSaveOptions = () => {
    updateQueryParams({
      category,
      distance,
      age,
      price: price ? price.toString() : null,
    })
    setOpen(false)
  }

  const handleResetOptions = () => {
    setCategory(null)
    setDistance(null)
    setAge(null)
    setPrice(undefined)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      setCategory(categoryValue)
      setDistance(distanceValue)
      setAge(ageValue)
      setPrice(priceValue ? [parseInt(priceValue, 10)] : [200])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        className="md:flex md:w-full md:justify-center lg:justify-between"
        asChild
      >
        {
          <div>
            <Button
              variant="outline"
              size="icon"
              className="sm:hidden"
              onClick={() => setOpen(true)}
            >
              <Icons.filter className="size-5" />
            </Button>
            <Button
              variant="ghost"
              className="w-full rounded-lg border-2 border-secondary py-5 shadow-none hover:bg-secondary max-sm:hidden"
              onClick={() => setOpen(true)}
            >
              <Icons.filter className="hidden size-5 md:block" />
              Więcej opcji
              <div></div>
            </Button>
          </div>
        }
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Więcej opcji</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-1">
              <div className="text-lg">Kategoria</div>
              <CategoryComboBox
                value={category}
                data={categoryData}
                setValue={setCategory}
              />
              <div className="mt-2 text-lg">Odległość</div>
              <div>
                <Select
                  value={distance || undefined}
                  onValueChange={setDistance}
                >
                  <SelectTrigger className="w-[210px]">
                    <SelectValue placeholder="Odległość" />
                  </SelectTrigger>
                  <SelectContent>
                    {distanceData.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-2 text-lg">Klasa</div>
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
              <div className="mt-2 text-lg">Kwota do</div>
              <div>
                <PriceSlider value={price} onValueChange={setPrice} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2 flex w-full flex-row items-end justify-end">
          <Button
            variant="outline"
            onClick={() => handleResetOptions()}
            className="mr-2"
          >
            Wyczyść
          </Button>
          <Button onClick={() => handleSaveOptions()}>Zapisz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
