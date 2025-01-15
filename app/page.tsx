// export async function generateMetadata(): Promise<Metadata> {
//   // const data = await Api.fetchMetadata();

import { Suspense } from 'react'
import Header from './_components/header'
import { NavHeader } from './_components/nav-header'

//   // const meta: Metadata = {
//   //   title: data.title,
//   //   applicationName: data.title,
//   //   keywords: data.keywords,
//   //   description: data.description,
//   // };

//   return meta;
// }

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

      {/* 
      <div className="space-y-8 bg-[#dbdcdf] py-8">
        <Container>
          <Title text="Próximos Eventos" />
        </Container>
      </div> */}
    </>
  )
}
