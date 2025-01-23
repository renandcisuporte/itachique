import { CreateCategoryPostUseCase } from '@/core/app/use-cases/category-post/create-category-post-use-case'
import { AllCategoryUseCase } from '@/core/app/use-cases/category/all-category-use-case'
import { CreateCategoryUseCase } from '@/core/app/use-cases/category/create-category-use-case'
import { DeleteCategoryUseCase } from '@/core/app/use-cases/category/delete-category-use-case'
import { UpdateCategoryUseCase } from '@/core/app/use-cases/category/update-category-use-case'
import { AllCityUseCase } from '@/core/app/use-cases/city/all-city-use-case'
import { CreateCityUseCase } from '@/core/app/use-cases/city/create-city-use-case'
import { DeleteCityUseCase } from '@/core/app/use-cases/city/delete-city-use-case'
import { UpdateCityUseCase } from '@/core/app/use-cases/city/update-city-use-case'
import { CreateGalleryUseCase } from '@/core/app/use-cases/gallery/create-gallery-use-case'
import { DeleteGalleryUseCase } from '@/core/app/use-cases/gallery/delete-gallery-use-case'
import { ListGalleryUseCase } from '@/core/app/use-cases/gallery/list-gallery-use-case'
import { AllLocaleUseCase } from '@/core/app/use-cases/locale/all-locale-use-case'
import { CreateLocaleUseCase } from '@/core/app/use-cases/locale/create-city-use-case'
import { DeleteLocaleUseCase } from '@/core/app/use-cases/locale/delete-city-use-case'
import { UpdateLocaleUseCase } from '@/core/app/use-cases/locale/update-city-use-case'
import { CreatePostUseCase } from '@/core/app/use-cases/post/create-post-use-case'
import { DeletePostUseCase } from '@/core/app/use-cases/post/delete-post-use-case'
import { FindPostUseCase } from '@/core/app/use-cases/post/find-post-use-case'
import { ListPostUseCase } from '@/core/app/use-cases/post/list-post-use-case'
import { UpdatePostUseCase } from '@/core/app/use-cases/post/update-post-use-case'
import { AllWebSiteUseCase } from '@/core/app/use-cases/website/all-website-use-case'
import { FindByTagsSiteUseCase } from '@/core/app/use-cases/website/find-by-tags-website-use-case'
import { FindWebSiteUseCase } from '@/core/app/use-cases/website/find-website-use-case'
import { CategoryActionImpl } from '@/core/infra/actions/category-action'
import { CityActionImpl } from '@/core/infra/actions/city-action'
import { GalleryActionImpl } from '@/core/infra/actions/gallery-action'
import { LocaleActionImpl } from '@/core/infra/actions/locale-action'
import { PostActionImpl } from '@/core/infra/actions/post-action'
import { WebSiteActionImpl } from '@/core/infra/actions/website-action'
import { UploadImageProviderImpl } from '@/core/infra/provider/upload-image'
import { CategoryPostRepositoryPrisma } from '@/core/infra/repositories/category-post-repository'
import { CategoryRepositoryPrisma } from '@/core/infra/repositories/category-repository'
import { CityRepositoryPrisma } from '@/core/infra/repositories/city-repository'
import { GalleryRepositoryPrisma } from '@/core/infra/repositories/gallery-repository'
import { LocaleRepositoryPrisma } from '@/core/infra/repositories/locale-repository'
import { PostRepositoryPrisma } from '@/core/infra/repositories/post-repository'
import { WebSiteRepositoryPrisma } from '@/core/infra/repositories/website-repository'
import { prisma } from '@/core/package/prisma'

const repositoryPost = new PostRepositoryPrisma(prisma)
const repositoryGallery = new GalleryRepositoryPrisma(prisma)
const localeRepository = new LocaleRepositoryPrisma(prisma)
const cityRepository = new CityRepositoryPrisma(prisma)
const categoryRepository = new CategoryRepositoryPrisma(prisma)
const categoryPostRepository = new CategoryPostRepositoryPrisma(prisma)

const uploadImageProvider = new UploadImageProviderImpl()

export const postAction = new PostActionImpl(
  new ListPostUseCase(repositoryPost),
  new FindPostUseCase(repositoryPost, repositoryGallery),
  new CreatePostUseCase(repositoryPost, uploadImageProvider),
  new UpdatePostUseCase(repositoryPost, uploadImageProvider),
  new DeletePostUseCase(repositoryPost, repositoryGallery),
  new CreateCategoryPostUseCase(categoryPostRepository)
)

export const localeAction = new LocaleActionImpl(
  new AllLocaleUseCase(localeRepository),
  new CreateLocaleUseCase(localeRepository),
  new UpdateLocaleUseCase(localeRepository),
  new DeleteLocaleUseCase(localeRepository)
)

export const categoryAction = new CategoryActionImpl(
  new AllCategoryUseCase(categoryRepository),
  new CreateCategoryUseCase(categoryRepository),
  new UpdateCategoryUseCase(categoryRepository),
  new DeleteCategoryUseCase(categoryRepository)
)
export const cityAction = new CityActionImpl(
  new AllCityUseCase(cityRepository),
  new CreateCityUseCase(cityRepository),
  new UpdateCityUseCase(cityRepository),
  new DeleteCityUseCase(cityRepository)
)

export const galleryAction = new GalleryActionImpl(
  new ListGalleryUseCase(repositoryGallery),
  new CreateGalleryUseCase(repositoryGallery),
  new DeleteGalleryUseCase(repositoryGallery)
)

// WebSite Template
const repositoryWebSite = new WebSiteRepositoryPrisma(prisma)
export const webSiteAction = new WebSiteActionImpl(
  new AllWebSiteUseCase(repositoryWebSite),
  new FindWebSiteUseCase(repositoryWebSite),
  new FindByTagsSiteUseCase(repositoryWebSite)
)
