import { z } from "zod"

export const LocationFormSchema = z.object({
  name: z.string().min(2, "Nazwa musi mieć co najmniej 2 znaki").max(100, "Nazwa może mieć maksymalnie 100 znaków"),
  addressLine: z.string().min(5, "Adres musi mieć co najmniej 5 znaków").max(200),
  city: z.string().min(2, "Miasto musi mieć co najmniej 2 znaki").max(100),
  postalCode: z.string().regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie XX-XXX"),
})

export type LocationFormSchemaType = z.infer<typeof LocationFormSchema>

