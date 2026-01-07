"use client"

import { useState } from "react"
import { Button } from "@class-cat/ui"
import { Icons } from "~/components/icons"
import type { Location } from "~/types/location.type"

interface LocationsTableProps {
  locations: Location[]
  onEdit: (location: Location) => void
  onDelete: (locationId: string) => void
  isLoading?: boolean
}

export const LocationsTable = ({
  locations,
  onEdit,
  onDelete,
  isLoading,
}: LocationsTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (locationId: string) => {
    if (
      !confirm("Czy na pewno chcesz usunąć tę lokalizację? Ta operacja jest nieodwracalna.")
    ) {
      return
    }

    setDeletingId(locationId)
    try {
      await onDelete(locationId)
    } finally {
      setDeletingId(null)
    }
  }

  if (isLoading) {
    return (
      <div className="cardSmall">
        <div className="flex items-center justify-center py-12">
          <Icons.spinner className="size-6 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (locations.length === 0) {
    return (
      <div className="cardSmall">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.map className="size-12 text-foregroundMuted mb-4" />
          <p className="text-foregroundMuted text-lg">
            Brak lokalizacji
          </p>
          <p className="text-foregroundMuted text-sm mt-2">
            Dodaj pierwszą lokalizację, klikając przycisk poniżej
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="cardSmall overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-secondary">
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Nazwa
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Adres
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Miasto
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Kod pocztowy
              </th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-foreground">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr
                key={location.id}
                className="border-b border-secondary/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium">
                    {location.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {location.addressLine}
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {location.city}
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {location.postalCode}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(location)}
                      className="h-8 w-8"
                    >
                      <Icons.pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(location.id)}
                      disabled={deletingId === location.id}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      {deletingId === location.id ? (
                        <Icons.spinner className="size-4 animate-spin" />
                      ) : (
                        <Icons.trash className="size-4" />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

