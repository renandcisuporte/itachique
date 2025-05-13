'use client'

import { SubmitButton } from '@/components/submit-button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { cn } from '@/lib/utils'
import { Undo, Upload, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { savePostAction } from '../actions'

type PageClientProps = {
  post?: PostProps
}

type Selects = {
  id: string
  name: string
  selected?: boolean
}

export function PageClient({ post }: PageClientProps) {
  const searchParams = useSearchParams()
  const success = searchParams.get('success')
  const router = useRouter()

  const [state, formAction] = useFormState(savePostAction, {})

  const [category, setCategory] = useState<Selects[]>([])
  const [subCategory, setSubCategory] = useState<Selects[]>([])
  const [locale, setLocale] = useState<Selects[]>([])
  const [city, setCity] = useState<Selects[]>([])

  const markSelected = (list: Selects[], selectedId?: string): Selects[] =>
    list.map((item) => ({
      ...item,
      selected: item.id === selectedId
    }))

  useEffect(() => {
    ;(async () => {
      const response = await fetch('/api/posts-helpers')
      const { category, subcategory, city, locale } = await response.json()

      setCategory(
        category.map((r: any) => ({
          id: r.id,
          name: r.name,
          selected: r.id === post?.categoryId
        }))
      )

      setSubCategory(
        subcategory.map((r: any) => ({
          id: r.id,
          name: r.name,
          selected: r.id === post?.subCategoryId
        }))
      )
      setLocale(
        locale.map((r: any) => ({
          id: r.id,
          name: r.name,
          selected: r.id === post?.localeId
        }))
      )
      setCity(
        city.map((r: any) => ({
          id: r.id,
          name: r.city,
          selected: r.id === post?.cityId
        }))
      )
    })()
  }, [])

  const changeCategory = (value: string) =>
    setCategory((prev) => markSelected(prev, value))

  const changeSubCategory = (value: string) =>
    setSubCategory((prev) => markSelected(prev, value))

  const changeLocale = (value: string) =>
    setLocale((prev) => markSelected(prev, value))

  const changeCity = (value: string) =>
    setCity((prev) => markSelected(prev, value))

  const errorClass = cn(
    '[&>input]:text-red-500 border-red-300 text-red-500 [&>input:focus-visible]:ring-red-300 [&>input]:border-red-500 [&>label]:text-red-500 [&>small]:text-xs [&>small]:text-red-500'
  )

  return (
    <form className="space-y-4" action={formAction}>
      <input type="hidden" name="id" value={post?.id} />

      {success && (
        <Alert className="cursor-pointer border-lime-100 bg-lime-100 text-lime-900">
          <AlertDescription className="flex items-center justify-between">
            Dados salvo com sucesso!
            <X
              className="ml-2 h-4 w-4"
              onClick={() =>
                router.replace(`/dashboard/posts/${post?.id}/edit`, {
                  scroll: false
                })
              }
            />
          </AlertDescription>
        </Alert>
      )}

      {state?.message && (
        <Alert className="border-lime-100 bg-lime-100 text-lime-900">
          <AlertDescription>{state?.message?.[0]}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Cadastro - Postagem/Eventos</h1>
        <span className="flex items-center justify-between space-x-1">
          <Button asChild variant={'ghost'}>
            <Link href="/dashboard/posts" className="flex items-center gap-2">
              <Undo className="h-4 w-4" /> <span>Voltar</span>
            </Link>
          </Button>
          {post?.id && (
            <Button asChild variant={'ghost'}>
              <Link
                href={`/dashboard/posts/${post?.id}/upload`}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" /> <span>Imagens</span>
              </Link>
            </Button>
          )}
          <SubmitButton>Salvar</SubmitButton>
        </span>
      </div>

      <hr />

      <div className="flex flex-wrap gap-4 [&>div>input]:text-[#292929]">
        <div className={cn('basis-24', state?.errors?.date && errorClass)}>
          <Label htmlFor="date">Data - Evento</Label>
          <Input
            id="date"
            type="date"
            name="date"
            defaultValue={`${post?.dateISO}`}
          />
          {state?.errors?.date && <small>{state?.errors?.date?.[0]}</small>}
        </div>

        <div className={cn('basis-full', state?.errors?.title && errorClass)}>
          <Label htmlFor="title">Festa/Evento</Label>
          <Input
            id="title"
            type="text"
            name="title"
            defaultValue={post?.title}
          />
          {state?.errors?.title && <small>{state?.errors?.title?.[0]}</small>}
        </div>

        {/* categorias */}
        <div className={cn('relative basis-1/5')}>
          <Label htmlFor="categoryId">Categorias</Label>
          <Select
            name="categoryId"
            value={category.find(({ selected }) => selected)?.id ?? ''}
            onValueChange={changeCategory}
          >
            <SelectTrigger className="w-full text-black" id="categoryId">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              {category?.map((item) => (
                <SelectItem key={item.id} value={item.id!}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* sub categorias */}
        <div className={cn('relative basis-1/5')}>
          <Label htmlFor="subCategoryId">Sub Categorias</Label>
          <Select
            name="subCategoryId"
            value={subCategory.find(({ selected }) => selected)?.id ?? ''}
            onValueChange={changeSubCategory}
          >
            <SelectTrigger className="w-full text-black" id="subCategoryId">
              <SelectValue placeholder="Selecione uma sub categoria" />
            </SelectTrigger>
            <SelectContent>
              {subCategory?.map((item) => (
                <SelectItem key={item.id} value={item.id!}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* local do evento */}
        <div
          className={cn(
            'relative basis-2/4',
            state?.errors?.localeId && errorClass
          )}
        >
          <Label htmlFor="localeId">Local Evento</Label>
          <Select
            name="localeId"
            value={locale.find(({ selected }) => selected)?.id ?? ''}
            onValueChange={changeLocale}
          >
            <SelectTrigger className="w-full text-black" id="localeId">
              <SelectValue placeholder="Selecione o local evento" />
            </SelectTrigger>
            <SelectContent>
              {locale?.map((item) => (
                <SelectItem key={item.id} value={item.id!}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.localeId && (
            <small>{state?.errors?.localeId?.[0]}</small>
          )}
        </div>

        {/* cidade do evento */}
        <div
          className={cn('relative w-1/4', state?.errors?.cityId && errorClass)}
        >
          <Label htmlFor="cityId">Cidade/UF Evento</Label>
          <Select
            name="cityId"
            value={city.find(({ selected }) => selected)?.id ?? ''}
            onValueChange={changeCity}
          >
            <SelectTrigger className="w-full text-black" id="cityId">
              <SelectValue placeholder="Selecione cidade/uf" />
            </SelectTrigger>
            <SelectContent>
              {city?.map((item) => (
                <SelectItem key={item.id} value={item.id!}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {state?.errors?.cityId && <small>{state?.errors?.cityId?.[0]}</small>}
        </div>

        <div className="flex basis-full items-center gap-4">
          {post?.coverImage && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMG}${post?.coverImage}`}
              alt={post?.coverImage}
              width={155}
              height={155}
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <Label htmlFor="cover_image">Imagem de capa</Label>
            <Input type="file" name="coverImage" id="cover_image" />
          </div>
        </div>
      </div>
    </form>
  )
}
