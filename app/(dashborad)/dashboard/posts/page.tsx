import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { postAction } from '@/core/main/config/dependencies'
import { Edit, Image, Newspaper, Trash } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Postagem/Eventos - Itachique'
}

type T = {
  [key: string]: string | string[] | undefined
}

type Props = {
  params: T
  searchParams: T
}

export default async function Page({ searchParams }: Props) {
  const { page = '1', limit = '10' } = searchParams
  const posts = await postAction.list()

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="mb-4 text-2xl">Postagem/Eventos</h1>
        <Button asChild>
          <Link href="/dashboard/posts/new" className="flex items-center gap-2">
            <Newspaper className="h-4 w-4" /> <span>Cadastrar</span>
          </Link>
        </Button>
      </div>
      <hr />
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead className="text-center">Data</TableHead>
            <TableHead>Festa/Evento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[1%]">
                <span className="flex space-x-1">
                  <Link href={`/dashboard/posts/${item.id}/upload`}>
                    <Image className="h-5 w-5" />
                  </Link>
                  <Link href={`/dashboard/posts/${item.id}/edit`}>
                    <Edit className="h-5 w-5" />
                  </Link>
                  <Trash className="h-5 w-5" />
                </span>
              </TableCell>
              <TableCell className="w-[1%] whitespace-nowrap text-center">
                {item.date as string}
              </TableCell>
              <TableCell>{item.title}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
