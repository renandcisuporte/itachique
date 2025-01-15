'use client'

import { SubmitButton } from '@/components/submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authAction } from './action'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function PageClient() {
  const [state, formAction] = useFormState(authAction, {})

  const commonClassName = cn(
    'flex flex-col space-y-1',
    (state?.errors?.email ||
      state?.errors?.password ||
      state?.errors?.message) &&
      'border-red-300 text-red-500 [&>input:focus-visible]:ring-red-300 [&>input]:border-red-500 [&>label]:text-red-500 [&>small]:text-xs [&>small]:text-red-500'
  )

  return (
    <form
      action={formAction}
      className="mx-auto flex w-full max-w-md flex-col space-y-4 rounded-lg bg-white p-4 text-[#292929] shadow-md"
    >
      <h2 className="text-center text-2xl font-bold">
        Login <small>Itachique</small>
      </h2>
      <div className={commonClassName}>
        <Label htmlFor="email">Usuário/E-mail</Label>
        <Input type="text" id="email" name="email" />
        {state?.errors?.email && <small>{state?.errors?.email?.pop()}</small>}
      </div>
      <div className={commonClassName}>
        <Label htmlFor="password">Senha de Acesso</Label>
        <Input type="password" id="password" name="password" />
        {state?.errors?.email && (
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
