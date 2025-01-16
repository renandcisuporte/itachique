import { z } from 'zod'

const password_text = 'Senha requer 6-18 caracteres'

export const UserSchema = z
  .object({
    id: z.optional(z.string().uuid()),
    name: z.optional(z.string().min(3)),
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: password_text })
      .max(18, { message: password_text }),
    confirmPassword: z.optional(
      z
        .string()
        .min(6, { message: password_text })
        .max(18, { message: password_text })
    ),
    role: z.optional(z.string()).nullable(),
    createdAt: z.optional(z.date()),
    updatedAt: z.optional(z.date()),
    deletedAt: z.optional(z.date()).nullable()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword']
  })

export type UserProps = z.infer<typeof UserSchema>
