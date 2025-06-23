'use client'

import { cn } from '@/libs/utils'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'

import { SubmitButton } from '@/components/submit-button'
import { sendEmail } from './action'

export function PageClient() {
  const [state, formAction] = useFormState(sendEmail, {})

  const errClass = cn(
    'text-red-600',
    '[&+input]:!mb-0',
    '[&+input]:border-red-600',
    '[&+input]:!text-red-600',
    '[&+input+small]:!text-red-600',
    '[&+input+small]:mb-4',
    '[&+textarea]:!mb-0',
    '[&+textarea]:border-red-600',
    '[&+textarea]:!text-red-600',
    '[&+textarea+small]:!text-red-600',
    '[&+textarea+small]:mb-4'
  )

  return (
    <form
      action={formAction}
      className="md:w-1/2 [&>p+input]:mb-4 [&>p+input]:text-neutral-700 [&>p+textarea]:mb-4 [&>p+textarea]:text-neutral-700 [&>p]:pl-1 [&>p]:font-bold"
    >
      {state?.message && <p>{state.message[0]}</p>}
      <p className={cn('pl-1 font-bold', state?.error?.name && errClass)}>
        Nome: *
      </p>
      <input
        type="text"
        name="name"
        className="w-full rounded-md border border-gray-300 p-2"
      />
      {state?.error?.name && <small>{state?.error?.name?.[0]}</small>}

      <p className={cn('pl-1 font-bold', state?.error?.subject && errClass)}>
        Assunto: *
      </p>
      <input
        type="text"
        name="subject"
        className="w-full rounded-md border border-gray-300 p-2"
      />
      {state?.error?.subject && <small>{state?.error?.subject?.[0]}</small>}

      <p className={cn('pl-1 font-bold', state?.error?.email && errClass)}>
        E-Mail: *
      </p>
      <input
        type="email"
        name="email"
        className="w-full rounded-md border border-gray-300 p-2"
      />
      {state?.error?.email && <small>{state?.error?.email?.[0]}</small>}

      <p className="pl-1 font-bold">Cidade:</p>
      <input
        type="text"
        name="city"
        className="w-full rounded-md border border-gray-300 p-2"
      />

      <p className={cn('pl-1 font-bold', state?.error?.message && errClass)}>
        Mensagem: *
      </p>
      <textarea
        name="message"
        rows={10}
        className="w-full rounded-md border border-gray-300 p-2"
      ></textarea>
      {state?.error?.message && <small>{state?.error?.message?.[0]}</small>}

      <p className="pl-32 pt-5">
        <SubmitButton>Enviar</SubmitButton>
      </p>
    </form>
  )
}
