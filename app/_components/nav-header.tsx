import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Container } from './common/container'

import { categoryAction } from '@/core/main/config/dependencies'
import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug } from '@/lib/utils'
import Link from 'next/link'
import { Nav } from './nav-client'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function Root({ ...rest }: Props) {
  return (
    <div className="border-t-[1px] border-[#e4e439] bg-[#1b1a1a]" {...rest} />
  )
}

async function Links() {
  const categories = await categoryAction.list()

  return categories?.data?.map((item) => (
    <Link
      href={`/${slug(item.name)}`}
      key={item.id}
      className={cn(
        'flex h-12 items-center px-4 italic text-white',
        mrEavesXLModOTBold.className
      )}
    >
      <span>{item.name}</span>
    </Link>
  ))
}

function NavRoot() {
  return (
    <Container>
      <Nav>
        <Links />
      </Nav>
    </Container>
  )
}

function Loading() {
  return (
    <>
      {[0, 1, 2, 3, 4, 5].map((item) => (
        <span key={item} className="h-12 min-w-44 px-4" />
      ))}
    </>
  )
}

export const NavHeader = {
  root: Root,
  loading: Loading,
  nav: NavRoot
}
