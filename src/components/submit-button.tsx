'use client'

import { LoaderCircle, Save, Trash } from 'lucide-react'
import {
  // @ts-ignore
  experimental_useFormStatus as useFormStatus
} from 'react-dom'
import { Button, ButtonProps } from './ui/button'

type SubmitButtonProps = ButtonProps & { isConfirm?: boolean }

export function SubmitButton({ ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const { children, isConfirm, ...restOld } = rest
  return (
    <Button disabled={pending} {...restOld}>
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />{' '}
          <span>Aguarde...</span>
        </>
      ) : (
        <>
          {isConfirm ? (
            <Trash className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{children}</span>
        </>
      )}
    </Button>
  )
}
