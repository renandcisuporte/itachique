import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcryptjs'
import { randomUUID } from 'crypto'
// import { randomUUID } from 'crypto'
import fs from 'fs'
import path from 'path'

function getImagesFromFolderRecursive(folderPath: string): string[] {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
  const images: string[] = []

  function readDirectory(directory: string) {
    const filesAndFolders = fs.readdirSync(directory)

    for (const item of filesAndFolders) {
      const fullPath = path.join(directory, item)
      const stats = fs.statSync(fullPath)

      if (stats.isDirectory()) {
        // Se for uma subpasta, chama a função novamente
        readDirectory(fullPath)
      } else if (
        stats.isFile() &&
        imageExtensions.includes(path.extname(item).toLowerCase())
      ) {
        // Se for um arquivo de imagem, adiciona à lista
        images.push(fullPath)
      }
    }
  }

  readDirectory(folderPath)
  return images
}

const prisma = new PrismaClient()
async function main() {
  const salt = genSaltSync(10)
  const password = hashSync('dci@6913', salt)

  const folderPath = './public/uploads'
  const images = getImagesFromFolderRecursive(folderPath)
  for (const item of images) {
    const [, dir, id, image] = item.split('\\')
    if (image) {
      await prisma.gallery.create({
        data: {
          id: randomUUID(),
          post_id: id,
          url: [dir, id, image].join('/'),
          image: image
        }
      })
    }
  }
  // console.log(images, 'images')

  // const id = randomUUID()
  // await prisma.user.upsert({
  //   where: {
  //     email: 'dci@dcisuporte.com.br'
  //   },
  //   update: {
  //     id,
  //     email: 'dci@dcisuporte.com.br',
  //     name: 'Dci',
  //     password,
  //     updated_at: new Date()
  //   },
  //   create: {
  //     id,
  //     email: 'dci@dcisuporte.com.br',
  //     name: 'Dci',
  //     password,
  //     created_at: new Date(),
  //     updated_at: new Date()
  //   }
  // })

  // await prisma.post.createMany({
  //   data: [
  //     {
  //       id: randomUUID(),
  //       locale_id: null,
  //       title: 'First Event',
  //       date: new Date('2025-02-01'),
  //       locale_text: 'Event in English',
  //       city_id: null,
  //       cover_image: 'https://example.com/image1.jpg',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       locale_id: null,
  //       title: 'Segundo Evento',
  //       date: new Date('2025-03-01'),
  //       locale_text: 'Evento em Português',
  //       city_id: null,
  //       cover_image: 'https://example.com/image2.jpg',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       locale_id: null,
  //       title: 'Tercer Evento',
  //       date: new Date('2025-04-10'),
  //       locale_text: 'Evento en Español',
  //       city_id: null,
  //       cover_image: 'https://example.com/image3.jpg',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     }
  //   ]
  // })

  // await prisma.locale.createMany({
  //   data: [
  //     {
  //       id: randomUUID(),
  //       name: 'CCI - Clube de Campo de Itápolis',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       name: 'AABB - Associação Advogados do Banco do Brasil de Itápolis',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       name: 'Bairro das Antas',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     }
  //   ]
  // })

  // await prisma.city.createMany({
  //   data: [
  //     {
  //       id: randomUUID(),
  //       city: 'Itápolis/SP',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       city: 'São José do Rio Preto/SP',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       city: 'São Paulo/SP',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     }
  //   ]
  // })

  // await prisma.category.createMany({
  //   data: [
  //     {
  //       id: randomUUID(),
  //       name: 'Fotos',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       name: 'Próximos Eventos',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       name: 'Ofertas de Emprego',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     },
  //     {
  //       id: randomUUID(),
  //       name: 'Fones e Endereços',
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null
  //     }
  //   ]
  // })
}

main()
  .then(() => console.log('Seed done'))
  .catch(console.error)
