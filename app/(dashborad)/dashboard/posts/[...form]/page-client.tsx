'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PostProps } from '@/core/domain/schemas/post-schema'
import { cn } from '@/lib/utils'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { postAction } from './actions'

type Post = {
  post: PostProps | null
}

export default function PageClient({ post }: Post) {
  const [state, formAction] = useFormState(postAction, {})

  const errorClass = cn(
    'flex flex-col space-y-1 [&>input]:text-[#292929]',
    (state?.errors?.email ||
      state?.errors?.password ||
      state?.errors?.message) &&
      'border-red-300 text-red-500 [&>input:focus-visible]:ring-red-300 [&>input]:border-red-500 [&>label]:text-red-500 [&>small]:text-xs [&>small]:text-red-500'
  )

  return (
    <form action="" className="space-y-4">
      {JSON.stringify(state)}

      <div className={cn(errorClass, 'w-1/5')}>
        <Label htmlFor="date">Data - Evento</Label>
        <Input type="date" id="date" name="date" defaultValue={post?.date} />
        {state?.errors?.date && <small>{state?.errors?.date?.pop()}</small>}
      </div>

      <div className={cn(errorClass, 'w-1/2')}>
        <Label htmlFor="title">Festa/Evento</Label>
        <Input type="text" id="title" name="title" defaultValue={post?.title} />
        {state?.errors?.title && <small>{state?.errors?.title?.pop()}</small>}
      </div>

      <div className={cn(errorClass, 'w-10/12')}>
        <Label htmlFor="localeId">Local Evento</Label>
        <Input
          list="localeIdList"
          id="localeId"
          name="localeId"
          placeholder="Ex: Itachique"
        />
        <datalist id="localeIdList">
          <option value="Itachique" />
          <option value="São Paulo" />
          <option value="Rio de Janeiro" />
          <option value="Belo Horizonte" />
        </datalist>
        {state?.errors?.localeId && (
          <small>{state?.errors?.localeId?.pop()}</small>
        )}
      </div>
    </form>
  )
}
