import { z } from 'zod'

export const CitySchema = z.object({
  id: z.optional(z.string().uuid()),
  city: z
    .string()
    .min(3, { message: 'Você dever informar a cidade do evento' }),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})

export type CityProps = z.infer<typeof CitySchema>
