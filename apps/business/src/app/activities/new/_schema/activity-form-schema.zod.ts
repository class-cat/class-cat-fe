import { z } from "zod"

export type ActivityFormSchemaType = z.infer<typeof ActivityFormSchema>

export const ActivityFormSchema = z.object({
  name: z.string().min(2, "Nazwa musi mieć co najmniej 2 znaki").max(100, "Nazwa może mieć maksymalnie 100 znaków"),
  description: z.string().min(10, "Opis musi mieć co najmniej 10 znaków").max(2000, "Opis może mieć maksymalnie 2000 znaków"),
  locationId: z.string().min(1, "Wybierz lokalizację"),
  employeeId: z.string().optional(),
  categories: z.array(z.string()).min(1, "Wybierz co najmniej jedną kategorię"),
  images: z.array(z.instanceof(File)).optional(),
  primaryImageIndex: z.number().optional(),
})

