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

// parseInt(a.image.match(/\((\d+)\)/)![1], 10)
export function getImageNumber(image: string) {
  const match = image.match(/\((\d+)\)/)
  if (match) {
    return parseInt(match[1], 10)
  }
  return 0
}

export function buildSearchInput(
  slug: string[],
  searchParams: { q?: string; page?: string; limit?: string }
) {
  return {
    page: Number(searchParams.page ?? 1),
    limit: Number(searchParams.limit ?? 16),
    categoryName: slug[0] !== 'search' ? slug[0] : '',
    subCategoryName: slug[1] ?? '',
    postTitle: searchParams.q ?? ''
  }
}
