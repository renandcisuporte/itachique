import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { AllAdvertisementUseCase } from '@/core/application/use-cases/advertisement/all-advertisement-use-case'
import { CountGalleryUseCase } from '@/core/application/use-cases/gallery/count-gallery-use-case'
import { AllValidatedUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/all-validated-upcoming-event-use-case'
import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - Itachique'
}

export default async function Page() {
  const webSiteUseCase = container.get<AllWebSiteUseCase>(
    Registry.AllWebSiteUseCase
  )
  const advertisementTotalUseCase = container.get<AllAdvertisementUseCase>(
    Registry.AllAdvertisementUseCase
  )
  const upcomingEventUseCase = container.get<AllValidatedUpcomingEventUseCase>(
    Registry.AllValidatedUpcomingEventUseCase
  )
  const galleryUseCase = container.get<CountGalleryUseCase>(
    Registry.CountGalleryUseCase
  )

  const [
    { total: totalEventsSite },
    { data: advertisementTotal },
    { data: upcomingEventTotal },
    { data: totalGallery }
  ] = await Promise.all([
    webSiteUseCase.execute({}),
    advertisementTotalUseCase.execute(),
    upcomingEventUseCase.execute(),
    galleryUseCase.execute()
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
