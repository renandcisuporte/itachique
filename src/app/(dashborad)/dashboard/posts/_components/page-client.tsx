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
import { cn } from '@/libs/utils'
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

  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [localeId, setLocaleId] = useState('')
  const [cityId, setCityId] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/posts-helpers')
      const { category, subcategory, city, locale } = await response.json()

      const mapData = (arr: any[], label = 'name'): Selects[] =>
        arr.map((r: any) => ({ id: r.id, name: r[label] }))

      setCategory(mapData(category))
      setSubCategory(mapData(subcategory))
      setLocale(mapData(locale))
      setCity(mapData(city, 'city'))

      if (post) {
        if (post.categoryId) setCategoryId(post.categoryId)
        if (post.subCategoryId) setSubCategoryId(post.subCategoryId)
        if (post.localeId) setLocaleId(post.localeId)
        if (post.cityId) setCityId(post.cityId)
      }

      setLoading(true)
    }

    fetchData()
  }, [post])

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
          <AlertDescription>{state.message[0]}</AlertDescription>
        </Alert>
      )}

      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">Cadastro - Postagem/Eventos</h1>
        <span className="flex items-center space-x-1">
          <Button asChild variant="ghost">
            <Link href="/dashboard/posts" className="flex items-center gap-2">
              <Undo className="h-4 w-4" /> <span>Voltar</span>
            </Link>
          </Button>
          {post?.id && (
            <Button asChild variant="ghost">
              <Link
                href={`/dashboard/posts/${post.id}/upload`}
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
        {/* Data */}
        <div className={cn('basis-24', state?.errors?.date && errorClass)}>
          <Label htmlFor="date">Data - Evento</Label>
          <Input
            id="date"
            type="date"
            name="date"
            defaultValue={post?.dateISO}
          />
          {state?.errors?.date && <small>{state.errors.date[0]}</small>}
        </div>

        {/* Título */}
        <div className={cn('basis-full', state?.errors?.title && errorClass)}>
          <Label htmlFor="title">Festa/Evento</Label>
          <Input
            id="title"
            type="text"
            name="title"
            defaultValue={post?.title}
          />
          {state?.errors?.title && <small>{state.errors.title[0]}</small>}
        </div>

        {/* Categoria */}
        <div className="relative h-16 basis-1/5">
          <Label htmlFor="categoryId">Categorias</Label>
          {loading && (
            <Select
              name="categoryId"
              value={categoryId}
              onValueChange={setCategoryId}
            >
              <SelectTrigger id="categoryId" className="w-full text-black">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Selecione uma categoria</SelectItem>
                {category.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Subcategoria */}
        <div className="relative h-16 basis-1/5">
          <Label htmlFor="subCategoryId">Sub Categorias</Label>
          {loading && (
            <Select
              name="subCategoryId"
              value={subCategoryId}
              onValueChange={setSubCategoryId}
            >
              <SelectTrigger id="subCategoryId" className="w-full text-black">
                <SelectValue placeholder="Selecione uma sub categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">
                  Selecione uma sub categoria
                </SelectItem>
                {subCategory.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Local */}
        <div
          className={cn(
            'relative basis-full',
            state?.errors?.localeId && errorClass
          )}
        >
          <Label htmlFor="localeId">Local Evento</Label>
          <div className="flex items-center gap-4 [&>input]:text-[#292929]">
            {loading && (
              <Select
                name="localeId"
                value={localeId}
                onValueChange={setLocaleId}
              >
                <SelectTrigger id="localeId" className="w-full text-black">
                  <SelectValue placeholder="Selecione o local evento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Selecione o local evento</SelectItem>
                  {locale.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <span>ou</span>
            <Input
              id="localeText"
              type="text"
              name="localeText"
              defaultValue={post?.localeText || ''}
            />
          </div>
          {state?.errors?.localeId && <small>{state.errors.localeId[0]}</small>}
        </div>

        {/* Cidade */}
        <div
          className={cn('relative w-full', state?.errors?.cityId && errorClass)}
        >
          <Label htmlFor="cityId">Cidade/UF Evento</Label>
          <div className="flex items-center gap-4 [&>input]:text-[#292929]">
            {loading && (
              <Select
                name="cityId"
                value={String(loading && cityId)}
                onValueChange={setCityId}
              >
                <SelectTrigger id="cityId" className="w-full text-black">
                  <SelectValue placeholder="Selecione Cidade/UF" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="null">Selecione Cidade/UF</SelectItem>
                  {city.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {/* <span>ou</span>
            <Input
              id="cityText"
              type="text"
              name="cityText"
              defaultValue={post?.cityText || ''}
            /> */}
          </div>

          {state?.errors?.cityId && <small>{state.errors.cityId[0]}</small>}
        </div>

        {/* Imagem */}
        <div className="flex basis-full items-center gap-4">
          {post?.coverImage && (
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_IMG}${post.coverImage}`}
              alt={post.coverImage}
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
