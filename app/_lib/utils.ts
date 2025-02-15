import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugNormalized(string: string) {
  return string.normalize('NFD').replace(/[-]/g, ' ').toLowerCase()
}

export function slug(string: unknown) {
  if (typeof string !== 'string') return ''
  return string
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w-]+/g, '-') // Remove caracteres não alfanuméricos
    .replace(/-+/g, '-') // Remove múltiplos hífens consecutivos
}

export function isMobile() {
  if (typeof window === 'undefined') return false // Evita erro no servidor
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

// Função auxiliar para dividir a galeria em chunks
export function chunkGallery<Props>(gallery: Props[], size = 12) {
  const chunks: Props[][] = []
  for (let i = 0; i < gallery.length; i += size) {
    chunks.push(gallery.slice(i, i + size))
  }
  return chunks
}
