"use client"

import { useState } from "react"
import { Button } from "@class-cat/ui"
import { Icons } from "~/components/icons"
import type { Employee } from "~/types/employee.type"

interface EmployeesTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (employeeId: string) => void
  isLoading?: boolean
}

export const EmployeesTable = ({
  employees,
  onEdit,
  onDelete,
  isLoading,
}: EmployeesTableProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (employeeId: string) => {
    if (
      !confirm("Czy na pewno chcesz usunąć tego pracownika? Ta operacja jest nieodwracalna.")
    ) {
      return
    }

    setDeletingId(employeeId)
    try {
      await onDelete(employeeId)
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

  if (employees.length === 0) {
    return (
      <div className="cardSmall">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icons.users className="size-12 text-foregroundMuted mb-4" />
          <p className="text-foregroundMuted text-lg">
            Brak pracowników
          </p>
          <p className="text-foregroundMuted text-sm mt-2">
            Dodaj pierwszego pracownika, klikając przycisk poniżej
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
                Imię i nazwisko
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Email
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Telefon
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-foreground">
                Stanowisko
              </th>
              <th className="text-right py-3 px-4 font-semibold text-sm text-foreground">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-secondary/50 hover:bg-secondary/30 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-medium">
                    {employee.firstName} {employee.lastName}
                  </div>
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {employee.email}
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {employee.phone || "-"}
                </td>
                <td className="py-3 px-4 text-foregroundMuted">
                  {employee.position || "-"}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(employee)}
                      className="h-8 w-8"
                    >
                      <Icons.pencil className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(employee.id)}
                      disabled={deletingId === employee.id}
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      {deletingId === employee.id ? (
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

