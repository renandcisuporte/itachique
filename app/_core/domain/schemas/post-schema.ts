import { z } from 'zod'

export const PostSchema = z.object({
  id: z.optional(z.string().uuid()),
  title: z
    .string()
    .min(3, { message: 'Você deve informar um título para o evento' }),
  date: z.union([
    z.date({
      invalid_type_error: 'Informe uma data válida',
      message: 'Informe uma data válida'
    }),
    z
      .string({ invalid_type_error: 'Informe uma data válida' })
      .refine((val) => !isNaN(Date.parse(val)), 'Informe uma data válida')
  ]),
  dateISO: z.optional(z.date()),
  localeText: z.optional(z.string()).nullable(),
  localeId: z.optional(z.string()).nullable(),
  cityText: z.optional(z.string()).nullable(),
  cityId: z.optional(z.string()).nullable(),
  coverImage: z.optional(z.string()).nullable(),
  galleryImage: z.optional(
    z.array(
      z.object({
        id: z.optional(z.string().uuid()),
        postId: z.optional(z.string().uuid()),
        url: z.string(),
        image: z.string()
      })
    )
  ),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})

export type PostProps = z.infer<typeof PostSchema>
