import Image from 'next/image'
import Link from 'next/link'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Container } from './common/container'
import { Input } from './ui/input'

interface RootProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {}

function Root({ ...rest }: RootProps) {
  return <header {...rest} />
}

function Info() {
  return (
    <div className="py-1 text-[7px] md:text-xs">
      <Container className="text-center font-semibold uppercase">
        {/* contato equipe itachique {phones[0].phone} | email: {emails[0]} */}
      </Container>
    </div>
  )
}

function Logo() {
  return (
    <Link
      className="relative mx-auto block h-[75px] w-[175px] md:h-[175px] md:w-[300px]"
      href="/"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Link>
  )
}

function Seach() {
  return (
    <form
      className="relative flex flex-1 items-center justify-end text-neutral-900"
      action="/search"
    >
      <Input name="q" placeholder="Buscar" />
      <button type="submit" className="absolute right-0 top-0 h-full w-8">
        <Image src="/search.png" width={20} height={20} alt="Search" />
      </button>
    </form>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <Container className="flex flex-col items-center space-y-2 py-4 text-white md:flex-row md:justify-between md:space-y-0">
      {children}
    </Container>
  )
}

const Header = {
  root: Root,
  info: Info,
  logo: Logo,
  search: Seach,
  content: Content
}

export default Header
