import { z } from 'zod'

export type CategoryProps = z.infer<typeof CategorySchema>
export const CategorySchema = z.object({
  id: z.optional(z.string().uuid()),
  name: z
    .string()
    .min(3, { message: 'Você dever informar a cidade do evento' }),
  position: z.optional(z.number()).default(0),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})
