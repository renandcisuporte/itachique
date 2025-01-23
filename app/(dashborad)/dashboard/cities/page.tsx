import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cityAction } from '@/core/main/config/dependencies'
import { Edit, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { PageClientDelete } from './page-client'

export const metadata: Metadata = {
  title: 'Cidades - Itachique'
}

type T = {
  [key: string]: string | string[] | undefined
}

type Props = {
  params: T
  searchParams: T
}

export default async function Page({ searchParams }: Props) {
  const { modal_delete = 'false', city_id = '' } = searchParams
  const cities = await cityAction.list()

  return (
    <>
      {modal_delete === 'open' && <PageClientDelete isOpen={true} />}
      <div className="mb-4 flex items-center justify-between space-x-2">
        <h1 className="text-2xl">Cidades</h1>
      </div>
      <hr />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Cidade/UF</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cities.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link
                    href={`/dashboard/cities/?modal_form=open&id=${item.id}`}
                  >
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Link
                    href={`/dashboard/cities/?modal_delete=open&post_id=${item.id}`}
                  >
                    <Trash className="h-5 w-5" />
                  </Link>
                </span>
              </TableCell>
              <TableCell>{item.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
