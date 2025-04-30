"use client"

import { useState } from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { Map } from "."

export const MapMobile = () => {
  const [open, setOpen] = useState(false)

  const openMapDialog = () => {
    setOpen(true)
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="h-[80px] w-full rounded-2xl bg-[url('/map-button-light.png')]">
          <div className="flex size-full items-center justify-center rounded-2xl">
            <Button
              variant="outline"
              className="w-[180px] border-0"
              onClick={openMapDialog}
            >
              <Icons.globe className="size-5" />
              <span className="ml-2">Wyświetl mapę</span>
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-full p-0 sm:h-[80vh] md:max-w-[90vw]">
        <div className="relative size-full">
          <div className="size-full">
            <Map />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
