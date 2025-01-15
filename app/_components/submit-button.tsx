'use client'

import { LoaderCircle } from 'lucide-react'
import React from 'react'
import {
  // @ts-ignore
  experimental_useFormStatus as useFormStatus
} from 'react-dom'
import { Button, ButtonProps } from './ui/button'

type SubmitButtonProps = ButtonProps

export function SubmitButton({ ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const { children, ...restOld } = rest
  return (
    <Button disabled={pending} {...restOld}>
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" /> Aguarde...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
