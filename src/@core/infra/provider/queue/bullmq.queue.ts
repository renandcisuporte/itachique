import { redis } from '@/core/package/redis'
import { Queue } from 'bullmq'

export interface QueueProvider {
  addJob(queueName: string, data: any): Promise<void>
}

export class QueueProviderImpl implements QueueProvider {
  private queues: Record<string, Queue> = {}

  async addJob(queueName: string, data: any): Promise<void> {
    if (!this.queues[queueName]) {
      this.queues[queueName] = new Queue(queueName, { connection: redis })
    }
    return this.queues[queueName].add(queueName, data).then(() => {})
  }
}
