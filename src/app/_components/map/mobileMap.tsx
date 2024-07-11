"use client"

import { useState } from "react"
import { Icons } from "~/components/icons"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog"
import { Map } from "./"

export function MobileMap() {
  const [open, setOpen] = useState(false);

  const openMapDialog = () => {
    setOpen(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
};
  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <div className="h-[80px] w-full rounded-2xl bg-[url('/map-button-light.png')]">
            <div className="h-full w-full rounded-2xl flex justify-center items-center">
              <Button variant="outline" className="w-[180px] border-0" onClick={openMapDialog}>
                <Icons.globe className="h-5 w-5" />
                <span className="ml-2">Wyświetl mapę</span>
              </Button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="h-screen w-screen top-[50%] py-10 px-2">
          <div className="p-1 ">
            <Map />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}