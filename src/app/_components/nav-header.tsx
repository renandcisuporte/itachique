import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Container } from './common/container'

import { mrEavesXLModOTBold } from '@/fonts'
import { cn, slug } from '@/lib/utils'

import { webSiteAction } from '../../@core/main/config/dependencies'
import Link from './common/link'
import { Nav } from './nav-client'

interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

function Root({ ...rest }: Props) {
  return (
    <nav className="border-t-[1px] border-[#e4e439] bg-[#1b1a1a]" {...rest} />
  )
}

async function Links() {
  const menus = await webSiteAction.findListMenus()

  return menus?.data?.map((item) => (
    <li
      key={item.category}
      className="relative hover:bg-[#e4e439] hover:text-[#1b1a1a] [&>a]:hover:text-[#1b1a1a] [&>div]:hover:block"
    >
      <Link
        href={`/${slug(item.category)}`}
        className={cn(mrEavesXLModOTBold.className)}
      >
        <span>{item.category}</span>
      </Link>
      {item.parent.length > 0 && (
        <div className="absolute left-0 top-full z-10 hidden w-full min-w-80 bg-white p-2 shadow-md [&>a]:h-auto">
          {item.parent.map((subitem) => (
            <Link
              key={slug(`${item.category} ${subitem.subcategory}`)}
              className={cn(mrEavesXLModOTBold.className, 'text-black')}
              href={`/${[slug(item.category), slug(subitem.subcategory)].join('/')}`}
            >
              {subitem.subcategory}
            </Link>
          ))}
        </div>
      )}
    </li>
  ))
}

function NavRoot() {
  return (
    <Container>
      <Nav>
        <Links />
        <li className="relative hover:bg-[#e4e439] hover:text-[#1b1a1a] [&>a]:hover:text-[#1b1a1a] [&>div]:hover:block">
          <Link href="/contato" className={cn(mrEavesXLModOTBold.className)}>
            <span>Contato</span>
          </Link>
        </li>
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
