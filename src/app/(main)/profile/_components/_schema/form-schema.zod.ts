import { z } from "zod"

export type FormSchemaType = z.infer<typeof FormSchema>

export const FormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  dob: z.date().optional(),
  address: z.string().min(2).max(50).optional(),
  sex: z.enum(["male", "female", "unknown"]).optional(),
  emailAddress: z.string().email("This is not a valid email."),
})
