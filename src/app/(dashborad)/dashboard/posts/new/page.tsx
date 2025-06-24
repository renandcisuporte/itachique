import { Metadata } from 'next'
import { PageClient } from '../_components/page-client'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

export default function Page() {
  return <PageClient />
}
