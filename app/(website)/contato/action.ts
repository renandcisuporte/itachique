'use server'

import nodemailer from 'nodemailer'
import { z } from 'zod'
import { mail } from './_mail'

const ContactSchema = z.object({
  name: z.string().min(3, { message: 'Campo obrigatório' }),
  subject: z.string().min(3, { message: 'Campo obrigatório' }),
  email: z.string().email({ message: 'Campo obrigatório' }),
  city: z.string().optional(),
  message: z.string().min(10, { message: 'Campo obrigatório' })
})

export async function sendEmail(_: any, formData: FormData) {
  try {
    const form = Object.fromEntries(formData)
    const validated = ContactSchema.safeParse(form)
    if (!validated.success) {
      const error = validated.error.flatten()
      throw error.fieldErrors
    }
    const { message, name, subject, city, email } = validated.data

    // Configurar o transporte de e-mail (exemplo usando Gmail)
    const auth = process.env.NEXT_PUBLIC_SMTP_PASSWORD !== ''
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: process.env.NEXT_PUBLIC_SMTP_PORT,
      secure: process.env.NEXT_PUBLIC_SMTP_SECURE,
      ...(auth
        ? {
            auth: {
              user: process.env.NEXT_PUBLIC_SMTP_USER,
              pass: process.env.NEXT_PUBLIC_SMTP_PASSWORD
            }
          }
        : {})
    })

    const mailOptions = {
      from: 'contato@itachique.com.br',
      to: ['contato@itachique.com.br', 'flavio@dcisuporte.com.br'],
      subject: 'Contato via WebSite - ItaChique.com.br'
    }
    await transporter.sendMail({
      ...mailOptions,
      html: mail({
        name,
        email,
        message,
        city: `${city}`,
        subject
      })
    })

    return {
      message: ['Sua mensagem foi enviada com sucesso!']
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err)
      return {
        message: ['Não foi possivél envia sua mensagem']
      }
    }

    return {
      error: { ...(err as any) }
    }
  }
}
