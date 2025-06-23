import { Session } from '@/lib/session'
import { redirect, RedirectType } from 'next/navigation'
import React from 'react'
import { Nav } from './_components/nav-left'

async function logOutSession() {
  'use server'
  await Session.destroySession()
  redirect('/dashboard')
}

export default async function DashboardRoot({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await Session.getSession()
  if (!session?.token) {
    redirect('/adm', RedirectType.replace)
  }

  const user = await Session.getUser()

  return (
    <main className="relative flex h-full min-h-screen flex-row">
      <nav className="w-full max-w-[220px]">
        <div className="bg-neutral-900 p-6">Olá, {user?.sub?.name}</div>
        <Nav.content>
          <Nav.item>
            <Nav.link href="/dashboard">Dashboard</Nav.link>
            <Nav.link href="/dashboard/categories">Categorias</Nav.link>
            <Nav.link href="/dashboard/subcategories">SubCategorias</Nav.link>
            <Nav.link href="/dashboard/locales">Locais</Nav.link>
            <Nav.link href="/dashboard/cities">Cidades</Nav.link>
            <Nav.link href="/dashboard/posts">Eventos/Fotos</Nav.link>
            <Nav.link href="/dashboard/upcoming-events">
              Próximos Eventos
            </Nav.link>
          </Nav.item>
          <Nav.item>
            <Nav.link href="/dashboard/advertisements">Propagandas</Nav.link>
          </Nav.item>
          <Nav.item>
            <form>
              <button formAction={logOutSession}>Sair</button>
            </form>
          </Nav.item>
        </Nav.content>
      </nav>
      <section className="flex-1 bg-[#4b4949] p-8">{children}</section>
    </main>
  )
}
