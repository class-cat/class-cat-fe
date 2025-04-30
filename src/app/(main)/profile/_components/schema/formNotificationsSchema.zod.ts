import { z } from "zod"

export type FormNotificationsSchemaType = z.infer<typeof FormNotificationsSchema>

export const FormNotificationsSchema = z.object({
  email: z.boolean().optional(),
  sms: z.boolean().optional(),
})
