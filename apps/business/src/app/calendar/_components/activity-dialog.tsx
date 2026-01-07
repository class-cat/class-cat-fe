"use client"

import { useState, useEffect } from "react"
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
  FormDescription,
} from "@class-cat/ui"
import { Button, Input, Textarea, Checkbox, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@class-cat/ui"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { Icons } from "~/components/icons"
import { useFetch } from "@class-cat/hooks"
import { ENDPOINTS } from "~/lib/const"
import type { ActivityFormSchemaType } from "../../activities/new/_schema/activity-form-schema.zod"
import { ActivityFormSchema } from "../../activities/new/_schema/activity-form-schema.zod"
import type { CalendarActivity } from "./calendar-view"
import type { LocationListResponse } from "~/types/location.type"
import type { EmployeeListResponse } from "~/types/employee.type"

// Mock categories - in real app, this would come from an API
const mockCategories = [
  { slug: "football", name: "Piłka nożna" },
  { slug: "basketball", name: "Koszykówka" },
  { slug: "tennis", name: "Tenis" },
  { slug: "swimming", name: "Pływanie" },
  { slug: "dance", name: "Taniec" },
  { slug: "music", name: "Muzyka" },
  { slug: "art", name: "Sztuka" },
  { slug: "martial-arts", name: "Sztuki walki" },
]

interface ActivityDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedDate?: Date
  activity?: CalendarActivity | null
  onSave: (activityData: ActivityFormSchemaType, startTime: string, endTime: string) => void
  onDelete: (activityId: string) => void
}

export const ActivityDialog = ({
  open,
  onOpenChange,
  selectedDate,
  activity,
  onSave,
  onDelete,
}: ActivityDialogProps) => {
  const [startTime, setStartTime] = useState("10:00")
  const [endTime, setEndTime] = useState("11:00")

  const { data: locationsData } = useFetch<LocationListResponse>({
    url: ENDPOINTS.LOCATIONS.ROOT,
  })

  const { data: employeesData } = useFetch<EmployeeListResponse>({
    url: ENDPOINTS.EMPLOYEES.ROOT,
  })

  const locations = locationsData?.results || []
  const employees = employeesData?.results || []

  const form = useForm<ActivityFormSchemaType>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      name: "",
      description: "",
      locationId: "",
      employeeId: "",
      categories: [],
      images: [],
    },
  })

  const selectedCategories = form.watch("categories") || []

  useEffect(() => {
    if (activity) {
      form.reset({
        name: activity.name,
        description: activity.description,
        locationId: activity.locationId || "",
        employeeId: activity.employeeId || "",
        categories: activity.categories,
        images: [],
      })
      setStartTime(format(activity.start, "HH:mm"))
      setEndTime(format(activity.end, "HH:mm"))
    } else if (selectedDate) {
      form.reset({
        name: "",
        description: "",
        locationId: "",
        employeeId: "",
        categories: [],
        images: [],
      })
      setStartTime("10:00")
      setEndTime("11:00")
    }
  }, [activity, selectedDate, open, form])

  const handleCategoryToggle = (categorySlug: string) => {
    const currentCategories = form.getValues("categories") || []
    const newCategories = currentCategories.includes(categorySlug)
      ? currentCategories.filter((slug) => slug !== categorySlug)
      : [...currentCategories, categorySlug]
    
    form.setValue("categories", newCategories, { shouldValidate: true })
  }

  const handleSave = () => {
    form.handleSubmit((data) => {
      onSave(data, startTime, endTime)
    })()
  }

  const handleDelete = () => {
    if (activity) {
      onDelete(activity.id)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {activity ? "Edytuj zajęcia" : "Nowe zajęcia"}
          </DialogTitle>
          <DialogDescription>
            {selectedDate && (
              <span className="capitalize">
                {format(selectedDate, "EEEE, d MMMM yyyy")}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa zajęć *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="np. Piłka nożna dla dzieci"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opis *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Opisz szczegółowo swoje zajęcia..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="startTime" className="text-sm font-medium">
                  Godzina rozpoczęcia
                </label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="endTime" className="text-sm font-medium">
                  Godzina zakończenia
                </label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Lokalizacja</h3>
              
              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lokalizacja *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz lokalizację" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {locations.map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name} - {location.addressLine}, {location.city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Pracownik</h3>
              
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pracownik (opcjonalnie)</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value === "__none__" ? undefined : value)} 
                      value={field.value || "__none__"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wybierz pracownika" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="__none__">Brak</SelectItem>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.firstName} {employee.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <FormLabel>Kategorie *</FormLabel>
              <FormDescription>
                Wybierz co najmniej jedną kategorię dla swoich zajęć
              </FormDescription>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {mockCategories.map((category) => (
                  <div
                    key={category.slug}
                    className="flex items-center space-x-2 rounded-lg border-2 border-secondary p-2 hover:bg-secondary transition-colors"
                  >
                    <Checkbox
                      id={category.slug}
                      checked={selectedCategories.includes(category.slug)}
                      onCheckedChange={() => handleCategoryToggle(category.slug)}
                    />
                    <label
                      htmlFor={category.slug}
                      className="text-sm font-medium leading-none cursor-pointer flex-1"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
              {form.formState.errors.categories && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.categories.message}
                </p>
              )}
            </div>
          </form>
        </Form>

        <DialogFooter className="flex-row gap-2">
          {activity && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
            >
              <Icons.trash className="mr-2 h-4 w-4" />
              Usuń
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Anuluj
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={!form.formState.isValid || selectedCategories.length === 0}
          >
            {activity ? "Zapisz" : "Utwórz"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

