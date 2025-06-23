import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { AllAdvertisementUseCase } from '@/core/application/use-cases/advertisement/all-advertisement-use-case'
import { container, Registry } from '@/core/infra/container-regisry'
import { Edit, Newspaper, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageClientDelete, PageClientForm } from './page-client'

export const metadata: Metadata = {
  title: 'Propagandas - Itachique'
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

  const useCase = container.get<AllAdvertisementUseCase>(
    Registry.AllAdvertisementUseCase
  )
  const result = await useCase.execute()

  return (
    <>
      {modal_delete === 'open' && (
        <PageClientDelete
          data={result?.data?.find((item) => item.id === id)!}
        />
      )}

      {modal_form === 'open' && (
        <PageClientForm
          data={result?.data?.find((item) => item.id === id) || ({} as any)}
        />
      )}

      <div className="mb-4 flex items-center justify-between space-x-2">
        <h1 className="text-2xl">Propagandas</h1>
        <Button asChild type="button">
          <Link
            href="/dashboard/advertisements/?modal_form=open"
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
            <TableHead>#</TableHead>
            <TableHead>Lista</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {result.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link
                    href={`/dashboard/advertisements/?modal_form=open&id=${item.id}`}
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/dashboard/advertisements/?modal_delete=open&id=${item.id}`}
                  >
                    <Trash className="h-5 w-5" />
                  </Link>
                </span>
              </TableCell>
              <TableCell>
                <div>{item.title}</div>
                <div className="text-xs" style={{ letterSpacing: '0.05em' }}>
                  {item.link} - Válido até:{' '}
                  {item.validatedAt.toLocaleDateString('pt-BR', {
                    timeZone: 'UTC'
                  })}
                </div>
                <div className="mt-2 grid grid-cols-2 justify-center gap-2">
                  {item.galleryImagesJson?.map((image) => (
                    <Image
                      alt=""
                      key={image}
                      src={image}
                      width={505}
                      height={65}
                      quality={100}
                    />
                  ))}
                </div>
                {item.description}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
