import { revalidatePath } from 'next/cache'

export function revalidatePaths() {
  // revalidação das rotas do adm
  revalidatePath(`/(dashboard)/dashboard`, 'layout')

  // revalidação das rotas do site
  revalidatePath(`/(website)/`, 'layout')

  // // revalidação das rotas do adm
  // revalidatePath(`/(dashboard)/dashboard/advertisements`, 'page')
  // revalidatePath(`/(dashboard)/dashboard/categories`, 'page')
  // revalidatePath(`/(dashboard)/dashboard/cities`, 'page')
  // revalidatePath('/(dashboard)/dashboard/locales', 'page')
  // revalidatePath(`/(dashboard)/dashboard/posts/[form]/upload`)
  // revalidatePath(`/(dashboard)/dashboard/posts/[form]/edit`)
  // revalidatePath(`/(dashboard)/dashboard/posts`)
  // revalidatePath(`/(dashboard)/dashboard/subcategories`, 'page')
  // revalidatePath(`/(dashboard)/dashboard/upcoming-events`, 'page')

  // // revalidação das rotas do site
  // revalidatePath(`/`, 'page')
  // revalidatePath('/(website)/', 'page')
  // revalidatePath('/(website)/[...slug]', 'page')
  // revalidatePath('/(website)/evento/[...id]', 'page')
  // revalidatePath('/(website)/galeria/[...gallery]', 'page')
}
