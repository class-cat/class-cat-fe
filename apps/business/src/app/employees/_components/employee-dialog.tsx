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
import type { EmployeeFormSchemaType } from "../_schema/employee-form-schema.zod"
import { EmployeeFormSchema } from "../_schema/employee-form-schema.zod"
import type { Employee } from "~/types/employee.type"

interface EmployeeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee?: Employee | null
  onSave: (data: EmployeeFormSchemaType) => Promise<void>
}

export const EmployeeDialog = ({
  open,
  onOpenChange,
  employee,
  onSave,
}: EmployeeDialogProps) => {
  const form = useForm<EmployeeFormSchemaType>({
    resolver: zodResolver(EmployeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
    },
  })

  useEffect(() => {
    if (employee) {
      form.reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone || "",
        position: employee.position || "",
      })
    } else {
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        position: "",
      })
    }
  }, [employee, open, form])

  const handleSubmit = async (data: EmployeeFormSchemaType) => {
    try {
      await onSave(data)
      toast.success(
        employee
          ? "Pracownik został zaktualizowany pomyślnie!"
          : "Pracownik został dodany pomyślnie!"
      )
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error(
        employee
          ? "Nie udało się zaktualizować pracownika"
          : "Nie udało się dodać pracownika"
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Edytuj pracownika" : "Dodaj nowego pracownika"}
          </DialogTitle>
          <DialogDescription>
            {employee
              ? "Zaktualizuj informacje o pracowniku"
              : "Wypełnij formularz, aby dodać nowego pracownika"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imię</FormLabel>
                  <FormControl>
                    <Input placeholder="Jan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwisko</FormLabel>
                  <FormControl>
                    <Input placeholder="Kowalski" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jan.kowalski@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon (opcjonalnie)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+48 123 456 789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stanowisko (opcjonalnie)</FormLabel>
                  <FormControl>
                    <Input placeholder="Trener" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  : employee
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

