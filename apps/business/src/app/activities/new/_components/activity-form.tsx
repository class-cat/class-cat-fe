"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { type z } from "zod"
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
import { ActivityFormSchema, type ActivityFormSchemaType } from "../_schema/activity-form-schema.zod"
import { useState } from "react"
import { Icons } from "~/components/icons"
import { useFetch } from "@class-cat/hooks"
import { ENDPOINTS } from "~/lib/const"
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

export const ActivityForm = () => {
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number | null>(null)

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

  const handleCategoryToggle = (categorySlug: string) => {
    const currentCategories = form.getValues("categories") || []
    const newCategories = currentCategories.includes(categorySlug)
      ? currentCategories.filter((slug) => slug !== categorySlug)
      : [...currentCategories, categorySlug]
    
    form.setValue("categories", newCategories, { shouldValidate: true })
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedImages(files)
    form.setValue("images", files)
    if (files.length > 0 && primaryImageIndex === null) {
      setPrimaryImageIndex(0)
      form.setValue("primaryImageIndex", 0)
    }
  }

  const handleSetPrimaryImage = (index: number) => {
    setPrimaryImageIndex(index)
    form.setValue("primaryImageIndex", index)
  }

  function onSubmit(data: z.infer<typeof ActivityFormSchema>) {
    const formData = {
      ...data,
      images: selectedImages,
      primaryImageIndex: primaryImageIndex ?? undefined,
    }

    toast.success("Zajęcia zostały utworzone pomyślnie!")
    console.log("Form data:", formData)
    // TODO: Submit to API
  }

  return (
    <div className="cardSmall">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    rows={6}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Opisz zajęcia, dla kogo są przeznaczone, czego uczestnicy się nauczą
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lokalizacja</h3>
            
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
            <h3 className="text-lg font-semibold">Pracownik</h3>
            
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
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {mockCategories.map((category) => (
                <div
                  key={category.slug}
                  className="flex items-center space-x-2 rounded-lg border-2 border-secondary p-3 hover:bg-secondary transition-colors"
                >
                  <Checkbox
                    id={category.slug}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={() => handleCategoryToggle(category.slug)}
                  />
                  <label
                    htmlFor={category.slug}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
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

          <div className="space-y-4">
            <FormLabel>Zdjęcia</FormLabel>
            <FormDescription>
              Dodaj zdjęcia swoich zajęć. Pierwsze zdjęcie będzie zdjęciem głównym.
            </FormDescription>
            
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="cursor-pointer"
                      />
                      {selectedImages.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-3">
                          {selectedImages.map((file, index) => (
                            <div
                              key={index}
                              className="relative group"
                            >
                              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-secondary">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {primaryImageIndex === index && (
                                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
                                    Główne
                                  </div>
                                )}
                              </div>
                              <div className="mt-2 flex gap-2">
                                <Button
                                  type="button"
                                  variant={primaryImageIndex === index ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleSetPrimaryImage(index)}
                                  className="w-full"
                                >
                                  {primaryImageIndex === index ? "Główne" : "Ustaw jako główne"}
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset()
                setSelectedImages([])
                setPrimaryImageIndex(null)
              }}
            >
              Anuluj
            </Button>
            <Button type="submit">
              <Icons.add className="mr-2 h-4 w-4" />
              Utwórz
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

