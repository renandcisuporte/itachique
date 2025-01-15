import Link from 'next/link'

export default function DashboardRoot({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="relative flex h-screen flex-row">
      <nav className="sticky top-0 w-full max-w-[220px]">
        <ul className="flex flex-col gap-4 p-4">
          <li className="flex flex-col gap-4 p-4">
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/categories">Categorias</Link>
            <Link href="/admin/locales">Locais</Link>
            <Link href="/admin/cities">Cidades</Link>
            <Link href="/admin/posts">Postagens</Link>
          </li>
          <li className="flex flex-col gap-4 p-4">
            <Link href="/admin/advertisements">Propagandas</Link>
          </li>
        </ul>
      </nav>
      <section className="flex-1 bg-[#1b1a1a] p-8">{children}</section>
    </main>
  )
}
