import Image from 'next/image'
import { Suspense } from 'react'
import { Container } from './_components/common/container'
import Header from './_components/header'
import { NavHeader } from './_components/nav-header'

// const meta: Metadata = {
//   title: data.title,
//   applicationName: data.title,
//   keywords: data.keywords,
//   description: data.description,
// };

export default async function Home() {
  return (
    <>
      <Header.root>
        <Header.content>
          <div className="basis-full md:basis-1/3" />
          <div className="basis-full md:basis-1/3">
            <Header.logo />
          </div>
          <div className="basis-full md:basis-1/3">
            <Header.search />
          </div>
        </Header.content>
      </Header.root>

      <NavHeader.root>
        <Suspense fallback={<NavHeader.loading />}>
          <NavHeader.nav />
        </Suspense>
      </NavHeader.root>

      <div className="bg-white py-12">
        <Container>
          <small className="uppercase">publicidade</small>
          <Image src="/merdinha.jpg" alt="banner" width={1200} height={200} />
        </Container>
      </div>

      <div className="space-y-8 py-8">
        <Container>
          <Image
            src="/last-events.png"
            alt="Próximos Eventos"
            width={300}
            height={100}
            className="mx-auto"
          />
        </Container>
      </div>
    </>
  )
}
