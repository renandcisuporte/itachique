import { z } from 'zod'

const password_text = 'Senha requer 6-18 caracteres'

export const AuthenticationSchema = z.object({
  id: z.optional(z.string().uuid()),
  name: z.optional(z.string().min(3)),
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: password_text })
    .max(18, { message: password_text }),

  role: z.optional(z.string()).nullable(),
  createdAt: z.optional(z.date()),
  updatedAt: z.optional(z.date()),
  deletedAt: z.optional(z.date()).nullable()
})

export type AuthenticationProps = z.infer<typeof AuthenticationSchema>
