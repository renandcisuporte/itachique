import { PrismaClient } from '@prisma/client'
import { genSaltSync, hashSync } from 'bcryptjs'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()
async function main() {
  const salt = genSaltSync(10)
  const password = hashSync('dci@6913', salt)

  const id = randomUUID()
  await prisma.user.upsert({
    where: {
      email: 'dci@dcisuporte.com.br'
    },
    update: {
      id,
      email: 'dci@dcisuporte.com.br',
      name: 'Dci',
      password,
      updated_at: new Date()
    },
    create: {
      id,
      email: 'dci@dcisuporte.com.br',
      name: 'Dci',
      password,
      created_at: new Date(),
      updated_at: new Date()
    }
  })

  await prisma.post.createMany({
    data: [
      {
        id: randomUUID(),
        locale_id: null,
        title: 'First Event',
        date: new Date('2025-02-01'),
        locale_text: 'Event in English',
        city_id: null,
        cover_image: 'https://example.com/image1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: randomUUID(),
        locale_id: null,
        title: 'Segundo Evento',
        date: new Date('2025-03-01'),
        locale_text: 'Evento em Português',
        city_id: null,
        cover_image: 'https://example.com/image2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: randomUUID(),
        locale_id: null,
        title: 'Tercer Evento',
        date: new Date('2025-04-10'),
        locale_text: 'Evento en Español',
        city_id: null,
        cover_image: 'https://example.com/image3.jpg',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ]
  })

  await prisma.locale.createMany({
    data: [
      {
        id: randomUUID(),
        name: 'CCI - Clube de Campo de Itápolis',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: randomUUID(),
        name: 'AABB - Associação Advogados do Banco do Brasil de Itápolis',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        id: randomUUID(),
        name: 'Bairro das Antas',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ]
  })
}

main()
  .then(() => console.log('Seed done'))
  .catch(console.error)
