'use client'

import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { CircleX } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import {
  // @ts-ignore
  experimental_useFormState as useFormState
} from 'react-dom'
import { postActionRemove } from '../../actions'

type Props = {
  isOpen: boolean
}

export function PageClientDelete({ isOpen }: Props) {
  const { back } = useRouter()
  const searchParams = useSearchParams()
  const postId = searchParams.get('post_id')

  const [state, formAction] = useFormState(postActionRemove, {})
  useEffect(() => {
    if (state.success) back()
  }, [state, back])

  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent
        className="text-[#616161] [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogClose asChild>
          <CircleX
            onClick={() => back()}
            className="absolute right-4 top-4 z-10 cursor-pointer"
          />
        </DialogClose>
        <DialogHeader className="mb-1">
          <DialogTitle>Deseja realmente remover</DialogTitle>
          <DialogDescription>
            Após a remoção, não será possível recuperar o post.
          </DialogDescription>
        </DialogHeader>
        <form
          action={formAction}
          className="flex flex-row items-center justify-end space-x-2"
        >
          <input type="text" name="id" value={postId!} hidden />
          <Button variant={'outline'} type="button" onClick={() => back()}>
            Cancela
          </Button>
          <SubmitButton type="submit" variant={'destructive'} isConfirm>
            Confirmar
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  )
}
