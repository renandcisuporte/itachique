'use client'

import LinkNext from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/libs/utils'
import React from 'react'

export const Link = ({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) => {
  const path = usePathname()
  const url = href.toString()
  const active = url.includes(path) && path !== '/dashboard'

  const className = cn('text-white', active && '!underline')

  return (
    <LinkNext href={href} className={className}>
      {children}
    </LinkNext>
  )
}
