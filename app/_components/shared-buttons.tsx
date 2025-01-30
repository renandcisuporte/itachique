import { cn } from '@/lib/utils'
import React from 'react'
import { Icons } from './common/icons'

interface ShareButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  url: string
  text?: string
}

export function ShareButtons({
  url,
  text = 'Compartilhar',
  ...rest
}: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  }

  const className = rest.className || ''

  return (
    <div className={cn('flex space-x-3 p-4', className)}>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
        <Icons.facebook className="h-4 w-4 fill-blue-600 hover:opacity-80 md:h-6 md:w-6" />
      </a>
      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
        <Icons.whatsapp className="h-4 w-4 fill-green-500 hover:opacity-80 md:h-6 md:w-6" />
      </a>
    </div>
  )
}
