import { z } from 'zod'

export const LocaleSchema = z.object({
  id: z.optional(z.string().uuid()),
  name: z
    .string()
    .min(3, { message: 'Você dever informar um local de evento' }),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})

export type LocaleProps = z.infer<typeof LocaleSchema>
