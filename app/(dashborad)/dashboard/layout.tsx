import { Nav } from './_components/nav-left'

export default function DashboardRoot({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative flex h-full min-h-screen flex-row">
      <nav className="w-full max-w-[220px]">
        <Nav.content>
          <Nav.item>
            <Nav.link href="/dashboard">Dashboard</Nav.link>
            <Nav.link href="/dashboard/categories">Categorias</Nav.link>
            <Nav.link href="/dashboard/locales">Locais</Nav.link>
            <Nav.link href="/dashboard/cities">Cidades</Nav.link>
            <Nav.link href="/dashboard/posts">Postagens</Nav.link>
          </Nav.item>
          <Nav.item>
            <Nav.link href="/dashboard/advertisements">Propagandas</Nav.link>
          </Nav.item>
        </Nav.content>
      </nav>
      <section className="flex-1 bg-[#4b4949] p-8">{children}</section>
    </main>
  )
}
