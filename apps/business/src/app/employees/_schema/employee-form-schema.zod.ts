import { z } from "zod"

export const EmployeeFormSchema = z.object({
  firstName: z.string().min(2, "Imię musi mieć co najmniej 2 znaki").max(50, "Imię może mieć maksymalnie 50 znaków"),
  lastName: z.string().min(2, "Nazwisko musi mieć co najmniej 2 znaki").max(50, "Nazwisko może mieć maksymalnie 50 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
  phone: z.string().optional().or(z.literal("")),
  position: z.string().optional().or(z.literal("")),
})

export type EmployeeFormSchemaType = z.infer<typeof EmployeeFormSchema>

