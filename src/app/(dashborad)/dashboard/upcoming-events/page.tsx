import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { AllCategoryUseCase } from '@/core/application/use-cases/category/all-category-use-case'
import { AllCityUseCase } from '@/core/application/use-cases/city/all-city-use-case'
import { AllUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/all-upcoming-event-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { Edit, Newspaper, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageClientDelete, PageClientForm } from './page-client'

export const metadata: Metadata = {
  title: 'Próximos Eventos - Itachique'
}

type T = {
  [key: string]: string | string[] | undefined
}

type Props = {
  params: T
  searchParams: T
}

export default async function Page({ searchParams }: Props) {
  const { modal_delete = 'false', modal_form = 'false', id = '' } = searchParams

  const upcomingEventUseCase = container.get<AllUpcomingEventUseCase>(
    Registry.AllUpcomingEventUseCase
  )
  const categoryUseCase = container.get<AllCategoryUseCase>(
    Registry.AllCategoryUseCase
  )
  const citiesUseCase = container.get<AllCityUseCase>(Registry.AllCityUseCase)

  const [{ data }, { data: category }, { data: cities }] = await Promise.all([
    upcomingEventUseCase.execute(),
    categoryUseCase.execute(),
    citiesUseCase.execute()
  ])

  return (
    <>
      {modal_delete === 'open' && (
        <PageClientDelete
          data={data?.find((item) => item.id === id)!}
          categories={[]}
          cities={[]}
        />
      )}

      {modal_form === 'open' && (
        <PageClientForm
          data={data?.find((item) => item.id === id) || ({} as any)}
          categories={category}
          cities={cities}
        />
      )}

      <div className="mb-4 flex items-center justify-between space-x-2">
        <h1 className="text-2xl">Próximos Eventos</h1>
        <Button asChild type="button">
          <Link
            href="/dashboard/upcoming-events/?modal_form=open"
            className="flex items-center gap-2"
          >
            <Newspaper className="h-4 w-4" /> <span>Cadastrar</span>
          </Link>
        </Button>
      </div>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={1}>#</TableHead>
            <TableHead>Açoes</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[175px]">
                <Image
                  alt=""
                  src={`${process.env.NEXT_PUBLIC_BASE_IMG}${item.galleryImages!}`}
                  width={255}
                  height={55}
                  quality={100}
                />
              </TableCell>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link
                    href={`/dashboard/upcoming-events/?modal_form=open&id=${item.id}`}
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/dashboard/upcoming-events/?modal_delete=open&id=${item.id}`}
                  >
                    <Trash className="h-5 w-5" />
                  </Link>
                </span>
              </TableCell>
              <TableCell>
                <div>
                  {item.title} -{' '}
                  {
                    new Date(item.date!)
                      .toISOString()
                      .split('T')[0]
                      .split('-')
                      .reverse()
                      .join('/')!
                  }
                </div>
                <div className="text-xs">{item.locale}</div>
                <div className="text-xs">{item.description}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
