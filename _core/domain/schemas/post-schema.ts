import { z } from 'zod'

export const PostSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(3, { message: 'Você deve informar um título para o evento' }),
  date: z.date({ invalid_type_error: 'Informe uma data válida' }),
  dateISO: z.optional(z.string()),
  localeText: z.string().optional().nullable(),
  localeId: z.string().optional().nullable(),
  cityText: z.string().optional().nullable(),
  cityId: z.string().optional().nullable(),
  categoryName: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  subCategoryId: z.string().optional().nullable(),
  subCategoryName: z.string().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  galleryImage: z.optional(
    z.array(
      z.object({
        id: z.optional(z.string()),
        postId: z.optional(z.string()),
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
