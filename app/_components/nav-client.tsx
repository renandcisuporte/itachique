'use client'

import { MenuIcon } from 'lucide-react'
import { Container } from './common/container'
import { DetailedHTMLProps, HTMLAttributes, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function Nav({ ...rest }: Props) {
  const [open, setOpen] = useState<boolean>(false)

  const resolveClick = useCallback(() => setOpen(!open), [open])

  return (
    <Container>
      <MenuIcon
        className="h-12 w-8 cursor-pointer text-white md:hidden"
        onClick={resolveClick}
      />
      <nav
        className={cn(
          'hidden text-xl md:flex md:justify-evenly md:space-x-2',
          open && 'absolute left-0 top-auto flex w-full flex-col bg-[#59298b]'
        )}
        {...rest}
      />
    </Container>
  )
}
