import { PrismaClient } from '@prisma/client'
import { genSaltSync, getSalt, hashSync } from 'bcryptjs'
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
      password
    },
    create: {
      id,
      email: 'dci@dcisuporte.com.br',
      name: 'Dci',
      password
    }
  })
}

main()
  .then(() => console.log('Seed done'))
  .catch(console.error)
