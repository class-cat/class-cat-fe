"use client"

import { useState } from "react"
import { Button } from "@class-cat/ui"
import { Icons } from "~/components/icons"
import type { BusinessActivity } from "~/types/business-activity.type"
import { useFetch } from "@class-cat/hooks"
import { ENDPOINTS } from "~/lib/const"
import type { LocationListResponse } from "~/types/location.type"
import type { EmployeeListResponse } from "~/types/employee.type"

interface ActivitiesTableProps {
  activities: BusinessActivity[]
  onEdit: (activity: BusinessActivity) => void
  onDelete: (activityId: string) => void
  isLoading?: boolean
}

export const ActivitiesTable = ({
  activities,
  onEdit,
  onDelete,
  isLoading,
}: ActivitiesTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const { data: locationsData } = useFetch<LocationListResponse>({
    url: ENDPOINTS.LOCATIONS.ROOT,
  })

  const { data: employeesData } = useFetch<EmployeeListResponse>({
    url: ENDPOINTS.EMPLOYEES.ROOT,
  })

  const locations = locationsData?.results || []
  const employees = employeesData?.results || []

  const getLocationName = (locationId: string) => {
    const location = locations.find((loc) => loc.id === locationId)
    return location ? `${location.name}, ${location.city}` : "Nieznana lokalizacja"
  }

  const getEmployeeName = (employeeId?: string) => {
    if (!employeeId) return "-"
    const employee = employees.find((emp) => emp.id === employeeId)
    return employee ? `${employee.firstName} ${employee.lastName}` : "-"
  }

  const handleDelete = async (activityId: string) => {
    if (
      !confirm("Czy na pewno chcesz usunąć te zajęcia? Ta operacja jest nieodwracalna.")
    ) {
      return
    }

    setDeletingId(activityId)
    try {
      await onDelete(activityId)
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

  if (activities.length === 0) {
    return (
      <div className="cardSmall">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.calendar className="size-12 text-foregroundMuted mb-4" />
          <p className="text-foregroundMuted text-lg">
            Brak zajęć
          </p>
          <p className="text-foregroundMuted text-sm mt-2">
            Dodaj pierwsze zajęcia, klikając przycisk poniżej
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
                Opis
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Lokalizacja
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Pracownik
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Kategorie
              </th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-foreground">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-secondary/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium">
                    {activity.name}
                  </div>
                </td>
                <td className="py-3 px-4 text-foregroundMuted max-w-xs">
                  <div className="truncate" title={activity.description}>
                    {activity.description}
                  </div>
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {getLocationName(activity.locationId)}
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {getEmployeeName(activity.employeeId)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {activity.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="text-xs px-2 py-1 bg-secondary rounded"
                      >
                        {cat}
                      </span>
                    ))}
                    {activity.categories.length > 2 && (
                      <span className="text-xs text-foregroundMuted">
                        +{activity.categories.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(activity)}
                      className="h-8 w-8"
                    >
                      <Icons.pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(activity.id)}
                      disabled={deletingId === activity.id}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      {deletingId === activity.id ? (
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

