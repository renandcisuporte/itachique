import { AllCityUseCase } from '@/core/app/use-cases/city/all-city-use-case'
import { CreateGalleryUseCase } from '@/core/app/use-cases/gallery/create-gallery-use-case'
import { DeleteGalleryUseCase } from '@/core/app/use-cases/gallery/delete-gallery-use-case'
import { ListGalleryUseCase } from '@/core/app/use-cases/gallery/list-gallery-use-case'
import { AllLocaleUseCase } from '@/core/app/use-cases/locale/all-locale-use-case'
import { CreatePostUseCase } from '@/core/app/use-cases/post/create-post-use-case'
import { DeletePostUseCase } from '@/core/app/use-cases/post/delete-post-use-case'
import { FindPostUseCase } from '@/core/app/use-cases/post/find-post-use-case'
import { ListPostUseCase } from '@/core/app/use-cases/post/list-post-use-case'
import { UpdatePostUseCase } from '@/core/app/use-cases/post/update-post-use-case'
import { CityActionImpl } from '@/core/infra/actions/city-action'
import { GalleryActionImpl } from '@/core/infra/actions/gallery-action'
import { LocaleActionImpl } from '@/core/infra/actions/locale-action'
import { PostActionImpl } from '@/core/infra/actions/post-action'
import { UploadImageProviderImpl } from '@/core/infra/provider/upload-image'
import { CityRepositoryPrisma } from '@/core/infra/repositories/city-repository'
import { GalleryRepositoryPrisma } from '@/core/infra/repositories/gallery-repository'
import { LocaleRepositoryPrisma } from '@/core/infra/repositories/locale-repository'
import { PostRepositoryPrisma } from '@/core/infra/repositories/post-repository'
import { prisma } from '@/core/package/prisma'

const repositoryPost = new PostRepositoryPrisma(prisma)
const repositoryGallery = new GalleryRepositoryPrisma(prisma)
const localeRepository = new LocaleRepositoryPrisma(prisma)
const cityRepository = new CityRepositoryPrisma(prisma)

const uploadImageProvider = new UploadImageProviderImpl()

export const postAction = new PostActionImpl(
  new ListPostUseCase(repositoryPost),
  new FindPostUseCase(repositoryPost, repositoryGallery),
  new CreatePostUseCase(repositoryPost, uploadImageProvider),
  new UpdatePostUseCase(repositoryPost, uploadImageProvider),
  new DeletePostUseCase(repositoryPost)
)

export const localeAction = new LocaleActionImpl(
  new AllLocaleUseCase(localeRepository)
)

export const cityAction = new CityActionImpl(new AllCityUseCase(cityRepository))

export const galleryAction = new GalleryActionImpl(
  new ListGalleryUseCase(repositoryGallery),
  new CreateGalleryUseCase(repositoryGallery, uploadImageProvider),
  new DeleteGalleryUseCase(repositoryGallery)
)
