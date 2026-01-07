"use client"

import { useState } from "react"
import { Container, Button } from "@class-cat/ui"
import { useFetch } from "@class-cat/hooks"
import { usePost } from "@class-cat/hooks"
import { useDelete } from "@class-cat/hooks"
import { toast } from "sonner"
import { EmployeesTable } from "./_components/employees-table"
import { EmployeeDialog } from "./_components/employee-dialog"
import { Icons } from "~/components/icons"
import { ENDPOINTS } from "~/lib/const"
import { httpClient } from "~/lib/http-client"
import type { Employee, EmployeeListResponse } from "~/types/employee.type"
import type { EmployeeFormSchemaType } from "./_schema/employee-form-schema.zod"

export default function EmployeesPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const { data, isLoading, refetch } = useFetch<EmployeeListResponse>({
    url: ENDPOINTS.EMPLOYEES.ROOT,
  })

  const employees = data?.results || []

  const createMutation = usePost<EmployeeListResponse, EmployeeFormSchemaType>({
    url: ENDPOINTS.EMPLOYEES.ROOT,
    updater: (oldData, newData) => {
      if (!oldData) return oldData
      const newEmployee: Employee = {
        id: Date.now().toString(),
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email,
        phone: newData.phone,
        position: newData.position,
        createdAt: new Date().toISOString(),
      }
      return {
        ...oldData,
        results: [...oldData.results, newEmployee],
        count: oldData.count + 1,
      }
    },
    invalidateQuery: { queryKey: [ENDPOINTS.EMPLOYEES.ROOT] },
  })


  const deleteMutation = useDelete<EmployeeListResponse>({
    url: ENDPOINTS.EMPLOYEES.ROOT,
    updater: (oldData, id) => {
      if (!oldData) return oldData
      return {
        ...oldData,
        results: oldData.results.filter((emp) => {
          // Handle both string and number IDs
          const employeeId = typeof emp.id === 'string' ? parseInt(emp.id, 10) : emp.id
          return employeeId !== id
        }),
        count: oldData.count - 1,
      }
    },
    invalidateQuery: { queryKey: [ENDPOINTS.EMPLOYEES.ROOT] },
  })

  const handleAdd = () => {
    setSelectedEmployee(null)
    setDialogOpen(true)
  }

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setDialogOpen(true)
  }

  const handleSave = async (data: EmployeeFormSchemaType) => {
    if (selectedEmployee) {
      // Update existing employee
      try {
        await httpClient.patch(ENDPOINTS.EMPLOYEES.DETAIL(selectedEmployee.id), data)
        toast.success("Pracownik został zaktualizowany pomyślnie!")
        await refetch()
      } catch (error) {
        toast.error("Nie udało się zaktualizować pracownika")
        throw error
      }
    } else {
      // Create new employee
      await createMutation.mutateAsync(data)
      await refetch()
    }
  }

  const handleDelete = async (employeeId: string) => {
    try {
      // Try to parse as number for the delete endpoint
      const numericId = parseInt(employeeId, 10)
      if (!isNaN(numericId)) {
        await deleteMutation.mutateAsync(numericId)
        toast.success("Pracownik został usunięty pomyślnie!")
        await refetch()
      } else {
        // If ID is not numeric, handle as string ID
        // This might require a different approach depending on your API
        toast.error("Nieprawidłowy identyfikator pracownika")
      }
    } catch (error) {
      toast.error("Nie udało się usunąć pracownika")
    }
  }

  return (
    <Container className="h-full flex-1 py-6 relative">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-primary">Pracownicy</h1>
          <p className="text-foregroundMuted mt-2">
            Zarządzaj pracownikami swojej firmy
          </p>
        </div>

        <EmployeesTable
          employees={employees}
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
        aria-label="Dodaj pracownika"
      >
        <Icons.add className="size-6" />
      </Button>

      <EmployeeDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employee={selectedEmployee}
        onSave={handleSave}
      />
    </Container>
  )
}

