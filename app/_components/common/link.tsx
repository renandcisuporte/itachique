'use client'

import { cn } from '@/lib/utils'
import NEXTLink, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Link({
  ...rest
}: LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname()
  const active = pathname.startsWith(rest.href) && pathname !== '/'

  const className = cn(
    'flex h-12 items-center px-4 italic text-white uppercase hover:bg-[#e4e439] hover:text-black',
    rest.className,
    active && 'bg-[#e4e439] text-black'
  )
  return <NEXTLink {...rest} className={className} />
}
