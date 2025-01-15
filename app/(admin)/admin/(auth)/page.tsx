import { Metadata } from 'next'
import { PageClient } from './page-client'

export const metadata: Metadata = {
  title: 'Login - Itachique'
}

export default async function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[image:url(/bg-dashborad.jpg)] bg-cover bg-center">
      <PageClient />
    </div>
  )
}
