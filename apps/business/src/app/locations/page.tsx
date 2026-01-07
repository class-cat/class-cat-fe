"use client"

import { useState } from "react"
import { Container, Button } from "@class-cat/ui"
import { useFetch } from "@class-cat/hooks"
import { usePost } from "@class-cat/hooks"
import { useDelete } from "@class-cat/hooks"
import { toast } from "sonner"
import { LocationsTable } from "./_components/locations-table"
import { LocationDialog } from "./_components/location-dialog"
import { Icons } from "~/components/icons"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import type { Location, LocationListResponse } from "~/types/location.type"
import type { LocationFormSchemaType } from "./_schema/location-form-schema.zod"

export default function LocationsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  const { data, isLoading, refetch } = useFetch<LocationListResponse>({
    url: ENDPOINTS.LOCATIONS.ROOT,
  })

  const locations = data?.results || []

  const createMutation = usePost<LocationListResponse, LocationFormSchemaType>({
    url: ENDPOINTS.LOCATIONS.ROOT,
    updater: (oldData, newData) => {
      if (!oldData) return oldData
      const newLocation: Location = {
        id: Date.now().toString(),
        name: newData.name,
        addressLine: newData.addressLine,
        city: newData.city,
        postalCode: newData.postalCode,
        createdAt: new Date().toISOString(),
      }
      return {
        ...oldData,
        results: [...oldData.results, newLocation],
        count: oldData.count + 1,
      }
    },
    invalidateQuery: { queryKey: [ENDPOINTS.LOCATIONS.ROOT] },
  })

  const deleteMutation = useDelete<LocationListResponse>({
    url: ENDPOINTS.LOCATIONS.ROOT,
    updater: (oldData, id) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        results: oldData.results.filter((loc) => {
          const locationId = typeof loc.id === 'string' ? parseInt(loc.id, 10) : loc.id
          return locationId !== id
        }),
        count: oldData.count - 1,
      }
    },
    invalidateQuery: { queryKey: [ENDPOINTS.LOCATIONS.ROOT] },
  })

  const handleAdd = () => {
    setSelectedLocation(null)
    setDialogOpen(true)
  }

  const handleEdit = (location: Location) => {
    setSelectedLocation(location)
    setDialogOpen(true)
  }

  const handleSave = async (data: LocationFormSchemaType) => {
    if (selectedLocation) {
      try {
        await httpClient.patch(ENDPOINTS.LOCATIONS.DETAIL(selectedLocation.id), data)
        toast.success("Lokalizacja została zaktualizowana pomyślnie!")
        await refetch()
      } catch (error) {
        toast.error("Nie udało się zaktualizować lokalizacji")
        throw error
      }
    } else {
      await createMutation.mutateAsync(data)
      await refetch()
    }
  }

  const handleDelete = async (locationId: string) => {
    try {
      const numericId = parseInt(locationId, 10)
      if (!isNaN(numericId)) {
        await deleteMutation.mutateAsync(numericId)
        toast.success("Lokalizacja została usunięta pomyślnie!")
        await refetch()
      } else {
        toast.error("Nieprawidłowy identyfikator lokalizacji")
      }
    } catch (error) {
      toast.error("Nie udało się usunąć lokalizacji")
    }
  }

  return (
    <Container className="h-full flex-1 py-6 relative">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Lokalizacje</h1>
          <p className="text-foregroundMuted mt-2">
            Zarządzaj lokalizacjami swoich zajęć
          </p>
        </div>

        <LocationsTable
          locations={locations}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />
      </div>

      {/* Add button in bottom right */}
      <Button
        onClick={handleAdd}
        size="icon"
        className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-lg z-10"
        aria-label="Dodaj lokalizację"
      >
        <Icons.add className="size-6" />
      </Button>

      <LocationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        location={selectedLocation}
        onSave={handleSave}
      />
    </Container>
  )
}

