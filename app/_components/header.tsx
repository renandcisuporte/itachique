import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Container } from './common/container'
import Link from 'next/link'
import Image from 'next/image'
import { Input } from './ui/input'

interface CommonProps {
  info: any
}

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
      className="relative h-[85px] w-full max-w-[300px] md:h-[105px]"
      href="/"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        className="object-contain"
        width={300}
        height={105}
      />
    </Link>
  )
}

function Seach() {
  return (
    <form className="flex flex-1 items-center justify-end" action="/search">
      <Input name="q" placeholder="Buscar" />
      <button type="submit">asdf</button>
    </form>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <Container className="flex flex-nowrap items-center py-4 text-white md:flex-row md:justify-between">
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
