import 'server-only'

import { AllAdvertisementUseCase } from '../../application/use-cases/advertisement/all-advertisement-use-case'
import { CreateAdvertisementUseCase } from '../../application/use-cases/advertisement/create-advertisement-use-case'
import { DeleteAdvertisementUseCase } from '../../application/use-cases/advertisement/delete-advertisement-use-case'
import { UpdateAdvertisementUseCase } from '../../application/use-cases/advertisement/update-advertisement-use-case'
import { CreateCategoryPostUseCase } from '../../application/use-cases/category-post/create-category-post-use-case'
import { AllCategoryUseCase } from '../../application/use-cases/category/all-category-use-case'
import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category-use-case'
import { DeleteCategoryUseCase } from '../../application/use-cases/category/delete-category-use-case'
import { UpdateCategoryUseCase } from '../../application/use-cases/category/update-category-use-case'
import { AllCityUseCase } from '../../application/use-cases/city/all-city-use-case'
import { CreateCityUseCase } from '../../application/use-cases/city/create-city-use-case'
import { DeleteCityUseCase } from '../../application/use-cases/city/delete-city-use-case'
import { UpdateCityUseCase } from '../../application/use-cases/city/update-city-use-case'
import { CountGalleryUseCase } from '../../application/use-cases/gallery/count-gallery-use-case'
import { CreateGalleryUseCase } from '../../application/use-cases/gallery/create-gallery-use-case'
import { DeleteGalleryUseCase } from '../../application/use-cases/gallery/delete-gallery-use-case'
import { ListGalleryUseCase } from '../../application/use-cases/gallery/list-gallery-use-case'
import { AllLocaleUseCase } from '../../application/use-cases/locale/all-locale-use-case'
import { CreateLocaleUseCase } from '../../application/use-cases/locale/create-city-use-case'
import { DeleteLocaleUseCase } from '../../application/use-cases/locale/delete-city-use-case'
import { UpdateLocaleUseCase } from '../../application/use-cases/locale/update-city-use-case'
import { CreatePostUseCase } from '../../application/use-cases/post/create-post-use-case'
import { DeletePostUseCase } from '../../application/use-cases/post/delete-post-use-case'
import { FindPostUseCase } from '../../application/use-cases/post/find-post-use-case'
import { ListPostUseCase } from '../../application/use-cases/post/list-post-use-case'
import { UpdatePostUseCase } from '../../application/use-cases/post/update-post-use-case'
import { AllSubCategoryUseCase } from '../../application/use-cases/subcategory/all-subcategory-use-case'
import { CreateSubCategoryUseCase } from '../../application/use-cases/subcategory/create-subcategory-use-case'
import { DeleteSubCategoryUseCase } from '../../application/use-cases/subcategory/delete-subcategory-use-case'
import { UpdateSubCategoryUseCase } from '../../application/use-cases/subcategory/update-subcategory-use-case'
import { AllUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/all-upcoming-event-use-case'
import { AllValidatedUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/all-validated-upcoming-event-use-case'
import { CreateUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/create-upcoming-event-use-case'
import { DeleteUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/delete-upcoming-event-use-case'
import { UpdateUpcomingEventUseCase } from '../../application/use-cases/upcoming-event/update-upcoming-event-use-case'
import { AllAdvertisementWebSiteUseCase } from '../../application/use-cases/website/all-advertisement-website-use-case'
import { AllMenuSiteUseCase } from '../../application/use-cases/website/all-menusite-use-case'
import { AllUpcomingSiteUseCase } from '../../application/use-cases/website/all-upcomingsite-use-case'
import { AllWebSiteUseCase } from '../../application/use-cases/website/all-website-use-case'
import { FindByTagsSiteUseCase } from '../../application/use-cases/website/find-by-tags-website-use-case'
import { FindWebSiteUseCase } from '../../application/use-cases/website/find-website-use-case'
import { AdvertisementActionImpl } from '../../infra/__delete_actions/advertisement-action'
import { CategoryActionImpl } from '../../infra/__delete_actions/category-action'
import { CityActionImpl } from '../../infra/__delete_actions/city-action'
import { GalleryActionImpl } from '../../infra/__delete_actions/gallery-action'
import { LocaleActionImpl } from '../../infra/__delete_actions/locale-action'
import { PostActionImpl } from '../../infra/__delete_actions/post-action'
import { SubCategoryActionImpl } from '../../infra/__delete_actions/subcategory-action'
import { UpcomingEventActionImpl } from '../../infra/__delete_actions/upcoming-event-action'
import { WebSiteActionImpl } from '../../infra/__delete_actions/website-action'
import { UploadImageProviderImpl } from '../../infra/provider/upload-image'
import { AdvertisementRepositoryPrisma } from '../../infra/repositories/advertisement-repository'
import { CategoryPostRepositoryPrisma } from '../../infra/repositories/category-post-repository'
import { CategoryRepositoryPrisma } from '../../infra/repositories/category-repository'
import { CityRepositoryPrisma } from '../../infra/repositories/city-repository'
import { GalleryRepositoryPrisma } from '../../infra/repositories/gallery-repository'
import { LocaleRepositoryPrisma } from '../../infra/repositories/locale-repository'
import { PostRepositoryPrisma } from '../../infra/repositories/post-repository'
import { SubCategoryRepositoryPrisma } from '../../infra/repositories/subcategory-repository'
import { UpcomingEventRepositoryPrisma } from '../../infra/repositories/upcoming-event-repository'
import { WebSiteRepositoryPrisma } from '../../infra/repositories/website-repository'
import { prisma } from '../../package/prisma'

const uploadImageProvider = new UploadImageProviderImpl()

const repositoryPost = new PostRepositoryPrisma(prisma)
const repositoryGallery = new GalleryRepositoryPrisma(prisma)
const categoryPostRepository = new CategoryPostRepositoryPrisma(prisma)
export const postAction = new PostActionImpl(
  new ListPostUseCase(repositoryPost),
  new FindPostUseCase(repositoryPost, repositoryGallery),
  new CreatePostUseCase(repositoryPost, uploadImageProvider),
  new UpdatePostUseCase(repositoryPost, uploadImageProvider),
  new DeletePostUseCase(repositoryPost, repositoryGallery),
  new CreateCategoryPostUseCase(categoryPostRepository)
)

const localeRepository = new LocaleRepositoryPrisma(prisma)
export const localeAction = new LocaleActionImpl(
  new AllLocaleUseCase(localeRepository),
  new CreateLocaleUseCase(localeRepository),
  new UpdateLocaleUseCase(localeRepository),
  new DeleteLocaleUseCase(localeRepository)
)

const categoryRepository = new CategoryRepositoryPrisma(prisma)
export const categoryAction = new CategoryActionImpl(
  new AllCategoryUseCase(categoryRepository),
  new CreateCategoryUseCase(categoryRepository),
  new UpdateCategoryUseCase(categoryRepository),
  new DeleteCategoryUseCase(categoryRepository)
)

const subCategoryRepository = new SubCategoryRepositoryPrisma(prisma)
export const subCategoryAction = new SubCategoryActionImpl(
  new AllSubCategoryUseCase(subCategoryRepository),
  new CreateSubCategoryUseCase(subCategoryRepository),
  new UpdateSubCategoryUseCase(subCategoryRepository),
  new DeleteSubCategoryUseCase(subCategoryRepository)
)

const cityRepository = new CityRepositoryPrisma(prisma)
export const cityAction = new CityActionImpl(
  new AllCityUseCase(cityRepository),
  new CreateCityUseCase(cityRepository),
  new UpdateCityUseCase(cityRepository),
  new DeleteCityUseCase(cityRepository)
)

export const galleryAction = new GalleryActionImpl(
  new ListGalleryUseCase(repositoryGallery),
  new CreateGalleryUseCase(repositoryGallery),
  new DeleteGalleryUseCase(repositoryGallery),
  new CountGalleryUseCase(repositoryGallery)
)

// WebSite Template
const repositoryWebSite = new WebSiteRepositoryPrisma(prisma)
export const webSiteAction = new WebSiteActionImpl(
  new AllWebSiteUseCase(repositoryWebSite),
  new FindWebSiteUseCase(repositoryWebSite),
  new FindByTagsSiteUseCase(repositoryWebSite),
  new AllAdvertisementWebSiteUseCase(repositoryWebSite),
  new AllUpcomingSiteUseCase(repositoryWebSite),
  new AllMenuSiteUseCase(repositoryWebSite)
)

const repositoryAdvertisement = new AdvertisementRepositoryPrisma(prisma)
export const advertisementAction = new AdvertisementActionImpl(
  new AllAdvertisementUseCase(repositoryAdvertisement),
  new CreateAdvertisementUseCase(repositoryAdvertisement),
  new UpdateAdvertisementUseCase(repositoryAdvertisement),
  new DeleteAdvertisementUseCase(repositoryAdvertisement)
)

const repositoryUpcomingEvent = new UpcomingEventRepositoryPrisma(prisma)
export const upcomingEventAction = new UpcomingEventActionImpl(
  new AllUpcomingEventUseCase(repositoryUpcomingEvent),
  new AllValidatedUpcomingEventUseCase(repositoryUpcomingEvent),
  new CreateUpcomingEventUseCase(repositoryUpcomingEvent),
  new UpdateUpcomingEventUseCase(repositoryUpcomingEvent),
  new DeleteUpcomingEventUseCase(repositoryUpcomingEvent)
)
