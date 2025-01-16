import { z } from 'zod'

export const PostSchema = z.object({
  id: z.optional(z.string().uuid()),
  title: z
    .string()
    .min(3, { message: 'Você deve informar um título para o evento' }),
  date: z.union([
    z.date({ invalid_type_error: 'Informe uma data válida' }),
    z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Informe uma data válida')
  ]),
  localeText: z.optional(z.string()).nullable(),
  localeId: z.optional(z.string()).nullable(),
  cityId: z.optional(z.string()).nullable(),
  coverImage: z.optional(z.string()).nullable(),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})

export type PostProps = z.infer<typeof PostSchema>
