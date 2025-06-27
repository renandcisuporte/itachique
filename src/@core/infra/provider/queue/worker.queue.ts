import { redis } from '@/core/package/redis'
import { Worker } from 'bullmq'

const emailWorker = new Worker(
  'send-email',
  async (job) => {
    const { to, subject, body } = job.data
    console.log(`📩 Enviando email para ${to}...`)
    // Simula envio real
    await new Promise((res) => setTimeout(res, 1000))
    console.log('✅ Email enviado!')
  },
  { connection: redis }
)

emailWorker.on('failed', (job, err) => {
  console.log(`❌ Falha ao enviar email ${job?.id}:`, err)
})
