"use client"

import { useState } from "react"
import { Container, Button } from "@class-cat/ui"
import { useFetch } from "@class-cat/hooks"
import { usePost } from "@class-cat/hooks"
import { useDelete } from "@class-cat/hooks"
import { toast } from "sonner"
import { ActivitiesTable } from "./_components/activities-table"
import { ActivityDialog } from "./_components/activity-dialog"
import { Icons } from "~/components/icons"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import type { BusinessActivity, BusinessActivityListResponse } from "~/types/business-activity.type"
import type { ActivityFormSchemaType } from "./new/_schema/activity-form-schema.zod"

export default function ActivitiesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<BusinessActivity | null>(null)

  const { data, isLoading, refetch } = useFetch<BusinessActivityListResponse>({
    url: ENDPOINTS.ACTIVITIES.ROOT,
  })

  const activities = data?.results || []

  const createMutation = usePost<BusinessActivityListResponse, ActivityFormSchemaType>({
    url: ENDPOINTS.ACTIVITIES.ROOT,
    updater: (oldData, newData) => {
      if (!oldData) return oldData
      const newActivity: BusinessActivity = {
        id: Date.now().toString(),
        name: newData.name,
        description: newData.description,
        locationId: newData.locationId,
        employeeId: newData.employeeId,
        categories: newData.categories,
        createdAt: new Date().toISOString(),
      }
      return {
        ...oldData,
        results: [...oldData.results, newActivity],
        count: oldData.count + 1,
      }
    },
    invalidateQuery: { queryKey: [ENDPOINTS.ACTIVITIES.ROOT] },
  })

  const deleteMutation = useDelete<BusinessActivityListResponse>({
    url: ENDPOINTS.ACTIVITIES.ROOT,
    updater: (oldData, id) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        results: oldData.results.filter((act) => {
          const activityId = typeof act.id === 'string' ? parseInt(act.id, 10) : act.id
          return activityId !== id
        }),
        count: oldData.count - 1,
      }
    },
    invalidateQuery: { queryKey: [ENDPOINTS.ACTIVITIES.ROOT] },
  })

  const handleAdd = () => {
    setSelectedActivity(null)
    setDialogOpen(true)
  }

  const handleEdit = (activity: BusinessActivity) => {
    setSelectedActivity(activity)
    setDialogOpen(true)
  }

  const handleSave = async (data: ActivityFormSchemaType) => {
    if (selectedActivity) {
      try {
        await httpClient.patch(ENDPOINTS.ACTIVITIES.ROOT + selectedActivity.id + "/", data)
        toast.success("Zajęcia zostały zaktualizowane pomyślnie!")
        await refetch()
      } catch (error) {
        toast.error("Nie udało się zaktualizować zajęć")
        throw error
      }
    } else {
      await createMutation.mutateAsync(data)
      await refetch()
    }
  }

  const handleDelete = async (activityId: string) => {
    try {
      const numericId = parseInt(activityId, 10)
      if (!isNaN(numericId)) {
        await deleteMutation.mutateAsync(numericId)
        toast.success("Zajęcia zostały usunięte pomyślnie!")
        await refetch()
      } else {
        toast.error("Nieprawidłowy identyfikator zajęć")
      }
    } catch (error) {
      toast.error("Nie udało się usunąć zajęć")
    }
  }

  return (
    <Container className="h-full flex-1 py-6 relative">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Zajęcia</h1>
          <p className="text-foregroundMuted mt-2">
            Zarządzaj zajęciami swojej firmy
          </p>
        </div>

        <ActivitiesTable
          activities={activities}
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
        aria-label="Dodaj zajęcia"
      >
        <Icons.add className="size-6" />
      </Button>

      <ActivityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activity={selectedActivity}
        onSave={handleSave}
      />
    </Container>
  )
}

