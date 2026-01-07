"use client"

import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@class-cat/ui"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@class-cat/ui"
import { Button, Input } from "@class-cat/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type { LocationFormSchemaType } from "../_schema/location-form-schema.zod"
import { LocationFormSchema } from "../_schema/location-form-schema.zod"
import type { Location } from "~/types/location.type"

interface LocationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  location?: Location | null
  onSave: (data: LocationFormSchemaType) => Promise<void>
}

export const LocationDialog = ({
  open,
  onOpenChange,
  location,
  onSave,
}: LocationDialogProps) => {
  const form = useForm<LocationFormSchemaType>({
    resolver: zodResolver(LocationFormSchema),
    defaultValues: {
      name: "",
      addressLine: "",
      city: "",
      postalCode: "",
    },
  })

  useEffect(() => {
    if (location) {
      form.reset({
        name: location.name,
        addressLine: location.addressLine,
        city: location.city,
        postalCode: location.postalCode,
      })
    } else {
      form.reset({
        name: "",
        addressLine: "",
        city: "",
        postalCode: "",
      })
    }
  }, [location, open, form])

  const handleSubmit = async (data: LocationFormSchemaType) => {
    try {
      await onSave(data)
      toast.success(
        location
          ? "Lokalizacja została zaktualizowana pomyślnie!"
          : "Lokalizacja została dodana pomyślnie!"
      )
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error(
        location
          ? "Nie udało się zaktualizować lokalizacji"
          : "Nie udało się dodać lokalizacji"
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {location ? "Edytuj lokalizację" : "Dodaj nową lokalizację"}
          </DialogTitle>
          <DialogDescription>
            {location
              ? "Zaktualizuj informacje o lokalizacji"
              : "Wypełnij formularz, aby dodać nową lokalizację"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa lokalizacji</FormLabel>
                  <FormControl>
                    <Input placeholder="np. Hala sportowa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ulica i numer</FormLabel>
                  <FormControl>
                    <Input placeholder="np. ul. Sportowa 15" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miasto</FormLabel>
                    <FormControl>
                      <Input placeholder="np. Warszawa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kod pocztowy</FormLabel>
                    <FormControl>
                      <Input placeholder="00-000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex-row gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Anuluj
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Zapisywanie..."
                  : location
                    ? "Zaktualizuj"
                    : "Dodaj"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

