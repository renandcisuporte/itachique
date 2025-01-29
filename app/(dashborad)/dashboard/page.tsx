import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  advertisementAction,
  galleryAction,
  upcomingEventAction,
  webSiteAction
} from '@/core/main/config/dependencies'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Itachique'
}

export default async function Page() {
  const [
    { total: totalEventsSite },
    { data: advertisementTotal },
    { data: upcomingEventTotal },
    { data: totalGallery }
  ] = await Promise.all([
    webSiteAction.list({}),
    advertisementAction.list(),
    upcomingEventAction.listValidated(),
    galleryAction.count()
  ])

  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="border-none bg-neutral-700 text-neutral-300">
        <CardHeader>
          <CardTitle className="text-lg tracking-wider">
            Total de Eventos
          </CardTitle>
          <CardDescription>
            Quantidade resumida de eventos cadastrados no site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total: {totalEventsSite}</p>
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-700 text-neutral-300">
        <CardHeader>
          <CardTitle className="text-lg tracking-wider">
            Total de Galerias/Fotos
          </CardTitle>
          <CardDescription>
            Quantidade resumida de eventos/fotos cadastrados no site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total: {totalGallery}</p>
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-700 text-neutral-300">
        <CardHeader>
          <CardTitle className="text-lg tracking-wider">
            Total de Propagandas
          </CardTitle>
          <CardDescription>
            Quantidade resumida de propagandas cadastrados no site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total: {advertisementTotal.length}</p>
        </CardContent>
      </Card>

      <Card className="border-none bg-neutral-700 text-neutral-300">
        <CardHeader>
          <CardTitle className="text-lg tracking-wider">
            Total de Próximos Eventos
          </CardTitle>
          <CardDescription>
            Quantidade resumida de eventos que irão acontecer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total: {upcomingEventTotal.length}</p>
        </CardContent>
      </Card>
    </div>
  )
}
