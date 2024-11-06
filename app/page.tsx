import Api from "./_services";

import type { Metadata } from "next";
import Header from "./_components/header";
import { NavHeader } from "./_components/nav-header";
import { Suspense } from "react";
import { Title } from "./_components/common/title";
import { Container } from "./_components/common/container";

export async function generateMetadata(): Promise<Metadata> {
  const data = await Api.fetchMetadata();

  const meta: Metadata = {
    title: data.title,
    applicationName: data.title,
    keywords: data.keywords,
    description: data.description,
  };

  return meta;
}

export default async function Home() {
  const data = await Api.fetchMetadata();

  return (
    <main>
      <Header.root>
        <Header.info info={data} />
        <Header.content info={data} />
      </Header.root>
      <NavHeader.root>
        <Suspense fallback={<NavHeader.loading />}>
          <NavHeader.nav />
        </Suspense>
      </NavHeader.root>
      <div className="space-y-8 bg-[#dbdcdf] py-8">
        <Container>
          <Title text="Próximos Eventos" />
        </Container>
      </div>
    </main>
  );
}
