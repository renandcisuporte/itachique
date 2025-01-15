import { z } from 'zod'

export const PostSchema = z.object({
  id: z.optional(z.string().uuid()),
  title: z
    .string()
    .min(3, { message: 'Voce deve informar um titulo para o evento' }),
  date: z.date({ invalid_type_error: 'Informe uma data valida' }),
  localeText: z.optional(z.string()),
  localeId: z.optional(z.string()),
  cityId: z.optional(z.string()),
  coverImage: z.optional(z.string()),
  coverGallery: z.optional(z.string()),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})

export type PostProps = z.infer<typeof PostSchema>
