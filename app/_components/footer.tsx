import Image from 'next/image'
import Link from 'next/link'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { Container } from './common/container'
import { Icons } from './common/icons'

interface RootProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLBaseElement>, HTMLBaseElement> {}

function Root({ ...rest }: RootProps) {
  return <footer {...rest} />
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <Container className="flex flex-col items-center justify-between py-4 uppercase md:flex-row">
      {children}
    </Container>
  )
}

function Info() {
  return (
    <div className="flex basis-1/3 flex-col space-y-2 text-center text-[10px] md:text-xs">
      <h2 className="text-lg text-[#e4e439] md:text-2xl">Institucional</h2>
      <Link href="/">Quem Somos</Link>
      <Link href="/">Anuncie Aqui</Link>
      <Link href="/">Contato</Link>
    </div>
  )
}

function Logo() {
  return (
    <Link
      className="relative -order-1 h-[85px] w-full basis-1/3 md:h-[105px]"
      href="/"
    >
      <Image
        src="/logo.png"
        alt="Logo"
        className="mx-auto object-contain"
        width={200}
        height={105}
      />
    </Link>
  )
}

function Social() {
  return (
    <div className="basis-1/3 space-y-2 text-center text-[10px] md:text-xs">
      <h2 className="text-lg text-[#e4e439] md:text-2xl">
        siga nossas redes sociais
      </h2>
      <p>fique por dentro de novidades e eventos</p>
      <div className="flex items-center justify-center space-x-2">
        <Link href="/">
          <Icons.facebook className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </Link>
        <Link href="/">
          <Icons.whatsapp className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </Link>
        <Link href="/">
          <Icons.instagram className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </Link>
        <Link href="/">
          <Icons.youtube className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </Link>
      </div>
    </div>
  )
}

function Copyright() {
  return (
    <div className="flex-1 basis-full border-t-[1px] border-t-neutral-800 py-2 text-center text-[7px] font-semibold uppercase text-neutral-800 md:text-xs">
      itachique - todos os direitos reservados - 2011-{new Date().getFullYear()}
    </div>
  )
}

const Footer = {
  root: Root,
  content: Content,
  info: Info,
  logo: Logo,
  social: Social,
  copyright: Copyright
}
export default Footer
