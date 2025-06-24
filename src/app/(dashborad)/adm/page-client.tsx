'use client'

import { SubmitButton } from '@/components/submit-button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/libs/utils'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { authAction } from './actions'

export function PageClient() {
  const router = useRouter()

  const [state, formAction] = useFormState(authAction, {})

  useEffect(() => {
    if (state?.success) router.push('/dashboard', { scroll: false })
  }, [state?.success, router])

  const errorClass = cn(
    'flex flex-col space-y-1',
    (state?.errors?.email ||
      state?.errors?.password ||
      state?.errors?.message) &&
      'border-red-300 text-red-500 [&>input:focus-visible]:ring-red-300 [&>input]:border-red-500 [&>label]:text-red-500 [&>small]:text-xs [&>small]:text-red-500'
  )

  return (
    <form
      className="mx-auto flex w-full max-w-md flex-col space-y-4 rounded-lg bg-white p-4 text-[#292929] shadow-md"
      action={formAction}
    >
      <h2 className="text-center text-2xl font-bold">
        Login <small>Itachique</small>
      </h2>
      <div className={errorClass}>
        <Label htmlFor="email">Usuário/E-mail</Label>
        <Input type="text" id="email" name="email" />
        {state?.errors?.email && <small>{state?.errors?.email?.pop()}</small>}
      </div>
      <div className={errorClass}>
        <Label htmlFor="password">Senha de Acesso</Label>
        <Input type="password" id="password" name="password" />
        {state?.errors?.password && (
          <small>{state?.errors?.password?.pop()}</small>
        )}
      </div>

      {state?.errors?.message && (
        <Alert variant="destructive">
          <AlertDescription>{state?.errors?.message?.pop()}</AlertDescription>
        </Alert>
      )}

      <SubmitButton type="submit">Entrar</SubmitButton>
    </form>
  )
}
