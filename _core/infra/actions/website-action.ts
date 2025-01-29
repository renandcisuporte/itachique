import { AllAdvertisementWebSiteUseCase } from '@/core/app/use-cases/website/all-advertisement-website-use-case'
import { AllWebSiteUseCase } from '@/core/app/use-cases/website/all-website-use-case'
import { FindByTagsSiteUseCase } from '@/core/app/use-cases/website/find-by-tags-website-use-case'
import { FindWebSiteUseCase } from '@/core/app/use-cases/website/find-website-use-case'
import { AdvertisementProps } from '@/core/domain/entity/advertisement-entity'
import { WebSiteProps } from '@/core/domain/entity/website-entity'

export class WebSiteActionImpl {
  constructor(
    private readonly listUseCase: AllWebSiteUseCase,
    private readonly findUseCase: FindWebSiteUseCase,
    private readonly findByTagsUseCase: FindByTagsSiteUseCase,
    private readonly allAdsUseCase: AllAdvertisementWebSiteUseCase
  ) {}

  async listByAds(): Promise<{ data: AdvertisementProps[] }> {
    return await this.allAdsUseCase.execute()
  }

  async listByTags(input: string): Promise<{ data: WebSiteProps[] | null }> {
    return await this.findByTagsUseCase.execute(input)
  }

  async list(input: Input): Promise<OutputArray> {
    return await this.listUseCase.execute(input)
  }

  async find(id: string): Promise<OutputSingle> {
    return await this.findUseCase.execute({ id })
  }

  // async save(input: Input): Promise<OutputSingle> {
  //   return {
  //     message: ['Post criado com sucesso!']
  //   }
  //   // try {
  //   //   if (input.id) {
  //   //     await this.updateUseCase.execute(input)
  //   //     return {
  //   //       message: ['Post atualizado com sucesso!'],
  //   //       data: { id: input.id }
  //   //     }
  //   //   }
  //   //   await this.createUseCase.execute(input)
  //   //   return {
  //   //     message: ['Post criado com sucesso!'],
  //   //     data: { id: input.id }
  //   //   }
  //   // } catch (err: unknown) {
  //   //   console.log('[ERROR POST ACTION]', JSON.stringify(err, null, 2))
  //   //   if (err instanceof ValidationError) {
  //   //     const errors = err.errors
  //   //     return { errors } as Output
  //   //   }
  //   //   return { message: ['Erro ao criar post'] }
  //   // }
  // }
}

type Input = Record<string, {}>

type Outhers = {
  message?: string[]
  errors?: Record<string, string[]>
}

type OutputSingle = {
  data?: WebSiteProps | null
  total?: number
} & Outhers

type OutputArray = {
  data: WebSiteProps[]
  total: number
} & Outhers
