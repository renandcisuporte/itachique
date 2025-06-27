import { Container } from '@/components/common/container'
import { applicationName, description, title } from '@/config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Quem Somos - ${title}`,
  description: `Quem Somos Itachique, ${description}`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  icons: {
    icon: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
    shortcut: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon-16x16.png`,
    apple: `${process.env.NEXT_PUBLIC_BASE_URL}/apple-touch-icon.png`
  },
  openGraph: {
    title: `Quem Somos - ${title}`,
    description: `Quem Somos Itachique, ${description}`,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: applicationName,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo.png`,
        width: 1200,
        height: 630,
        alt: title
      }
    ]
  }
}

export default async function Page() {
  return (
    <Container className="py-8">
      <h1 className="mb-4 text-center text-lg text-[#e4e439] md:text-2xl">
        Quem Somos
      </h1>
      <div className="mx-auto max-w-xl space-y-4 text-center">
        <p>
          O ITACHIQUE é o maior portal de baladas e eventos de Itápolis/SP e
          região, atuando desde 2011 como referência em cobertura fotográfica,
          divulgação de eventos e entretenimento local.
        </p>
        <p>
          Com mais de uma década de atuação, nos tornamos sinônimo de presença
          nas melhores festas, conectando marcas, produtores e o público jovem
          que movimenta a vida noturna da cidade. Se tem evento em Itápolis, o
          ITACHIQUE está presente — registrando, promovendo e amplificando a
          experiência.
        </p>
        <p>🎯 Alcance regional forte e engajado </p>
        <p>📸 Coberturas exclusivas com alto impacto visual </p>
        <p>📅 Divulgação de eventos e agendas culturais </p>
        <p>🤝 Parcerias estratégicas com casas noturnas, bares e promotores </p>
        <p>
          Nosso diferencial está na credibilidade construída ao longo dos anos,
          na qualidade do nosso conteúdo e no relacionamento direto com o
          público que busca informação, entretenimento e os melhores rolês da
          cidade.
        </p>
        <p>
          Se você quer visibilidade, engajamento real e estar presente onde o
          público está, o ITACHIQUE é a plataforma ideal para destacar sua marca
          no cenário regional.
        </p>
        <address>
          ITACHIQUE — desde 2011, valorizando o entretenimento e quem faz a
          noite acontecer.
        </address>
      </div>
    </Container>
  )
}
