type Props = {
  name: string
  email: string
  city: string
  subject: string
  message: string
}

export const mail = ({ name, email, message, subject, city }: Props) => `
    <div style="background-color: #000; padding: 20px; font-family: 'Arial', sans-serif; color: #111827; line-height: 1.5;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #1b1a1a; padding: 20px; text-align: center; color: #ffffff;">
          <h1 style="font-size: 24px; margin: 0;">Contato <strong>www.itachique.com.br</strong></h1>
        </div>
        <div style="padding: 20px;">
          
          ${
            name &&
            `<p style="font-size: 16px; margin-bottom: 20px;">
            Nome: <strong>${name}</strong>
          </p>`
          }
          ${
            email &&
            `<p style="font-size: 16px; margin-bottom: 20px;">
            Email: <strong>${email}</strong>
          </p>`
          }
          ${
            subject &&
            `<p style="font-size: 16px; margin-bottom: 20px;">
            Assunto: <strong>${subject}</strong>
          </p>`
          }
          ${
            city &&
            `<p style="font-size: 16px; margin-bottom: 20px;">
            Cidade/UF: <strong>${city}</strong>
          </p>`
          }
          ${
            message &&
            `<p style="font-size: 16px; margin-bottom: 20px;">
            <strong>Mensagem</strong>
            <div>${message}</div>
          </p>`
          }
        </div>
        <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 14px; color: #6b7280;">
          <p style="margin: 0;">
            © 2025 Itachique.com.br. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
 `
