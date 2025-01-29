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
      <Link href="/contact">Anuncie Aqui</Link>
      <Link href="/contact">Contato</Link>
    </div>
  )
}

function Logo() {
  return (
    <Link
      className="relative -order-1 h-[85px] w-full basis-1/3 md:order-none md:h-[105px]"
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
        <a
          href="https://www.facebook.com/itachique/?locale=pt_BR"
          target="_blank"
          rel="noreferrer"
        >
          <Icons.facebook className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=5516997166880"
          target="_blank"
          rel="noreferrer"
        >
          <Icons.whatsapp className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </a>
        <a
          href="https://www.instagram.com/itachique/"
          target="_blank"
          rel="noreferrer"
        >
          <Icons.instagram className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </a>
        <a
          href="https://www.youtube.com/channel/UC0jlc29wIlEYwfS0_Pwg3vg"
          target="_blank"
          rel="noreferrer"
        >
          <Icons.youtube className="h-10 w-10 rounded-full bg-[#e4e439] p-2" />
        </a>
      </div>
    </div>
  )
}

function Copyright() {
  return (
    <div className="flex flex-1 basis-full items-center justify-between border-t-[1px] border-t-neutral-800 py-2 text-center text-[7px] font-semibold uppercase text-neutral-800 md:text-xs">
      <span>
        itachique - todos os direitos reservados - 2011-
        {new Date().getFullYear()}
      </span>
      <span>
        <a
          href="https://www.datacontrolinformatica.com.br/"
          target="_blank"
          rel="noreferrer"
          className="opacity-50"
        >
          <Image src="/rubrica.png" width={35} height={18} alt="" />
        </a>
      </span>
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
