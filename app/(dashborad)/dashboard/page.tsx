import { Metadata } from 'next'
import { Nav } from './_components/nav-left'

export const metadata: Metadata = {
  title: 'Dashboard - Itachique'
}

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-center">
      <Nav.content>
        <Nav.item>
          <Nav.link href="/dashboard">Dashboard</Nav.link>
        </Nav.item>
      </Nav.content>
    </div>
  )
}
