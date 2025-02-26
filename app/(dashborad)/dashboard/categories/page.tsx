import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { categoryAction } from '@/core/main/config/dependencies'
import { Edit, Newspaper, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { PageClientDelete, PageClientForm } from './page-client'

export const metadata: Metadata = {
  title: 'Categorias - Itachique'
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
  const categories = await categoryAction.list()

  return (
    <>
      {modal_delete === 'open' && (
        <PageClientDelete
          data={categories?.data?.find((item) => item.id === id)!}
        />
      )}

      {modal_form === 'open' && (
        <PageClientForm
          data={
            categories?.data?.find((item) => item.id === id) || {
              id: '',
              name: '',
              position: 0
            }
          }
        />
      )}

      <div className="mb-4 flex items-center justify-between space-x-2">
        <h1 className="text-2xl">Categorias</h1>
        <Button asChild type="button">
          <Link
            href="/dashboard/categories/?modal_form=open"
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
            <TableHead>Categorias</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link
                    href={`/dashboard/categories/?modal_form=open&id=${item.id}`}
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/dashboard/categories/?modal_delete=open&id=${item.id}`}
                  >
                    <Trash className="h-5 w-5" />
                  </Link>
                </span>
              </TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
