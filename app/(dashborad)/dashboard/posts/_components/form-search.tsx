'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Newspaper, Search } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function FormSearch() {
  const searchParams = useSearchParams()
  const orderParam = searchParams.get('order') || '[date_desc]'
  const [order, setOrder] = useState(orderParam)

  return (
    <form action="/dashboard/posts" className="flex flex-1 items-center gap-2">
      <Input
        name="q"
        placeholder="Pesquisar Festa/Evento"
        className="text-black"
      />
      <input type="text" name="order" defaultValue={order} hidden />
      <Select onValueChange={setOrder} defaultValue={orderParam}>
        <SelectTrigger className="w-[180px] text-black">
          <SelectValue placeholder="Por Data" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="[date_desc]">Data Maior</SelectItem>
          <SelectItem value="[date_asc]">Data Menor</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit">
        <Search className="h-4 w-4" />
      </Button>
      <Button asChild type="button">
        <Link href="/dashboard/posts/new" className="flex items-center gap-2">
          <Newspaper className="h-4 w-4" /> <span>Cadastrar</span>
        </Link>
      </Button>
    </form>
  )
}
