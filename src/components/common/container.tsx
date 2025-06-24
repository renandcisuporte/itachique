import { cn } from '@/libs/utils'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Container({ ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn('mx-auto w-full max-w-screen-lg px-2', rest.className)}
    />
  )
}
