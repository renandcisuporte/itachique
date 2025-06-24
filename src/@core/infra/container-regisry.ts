import { Container } from 'inversify'
import 'reflect-metadata'

import { AllAdvertisementUseCase } from '@/core/application/use-cases/advertisement/all-advertisement-use-case'
import { CreateAdvertisementUseCase } from '@/core/application/use-cases/advertisement/create-advertisement-use-case'
import { DeleteAdvertisementUseCase } from '@/core/application/use-cases/advertisement/delete-advertisement-use-case'
import { UpdateAdvertisementUseCase } from '@/core/application/use-cases/advertisement/update-advertisement-use-case'
import { AuthenticationUseCase } from '@/core/application/use-cases/authentication/authentication-use-case'
import { CreateCategoryPostUseCase } from '@/core/application/use-cases/category-post/create-category-post-use-case'
import { AllCategoryUseCase } from '@/core/application/use-cases/category/all-category-use-case'
import { CreateCategoryUseCase } from '@/core/application/use-cases/category/create-category-use-case'
import { DeleteCategoryUseCase } from '@/core/application/use-cases/category/delete-category-use-case'
import { UpdateCategoryUseCase } from '@/core/application/use-cases/category/update-category-use-case'
import { AllCityUseCase } from '@/core/application/use-cases/city/all-city-use-case'
import { CreateCityUseCase } from '@/core/application/use-cases/city/create-city-use-case'
import { DeleteCityUseCase } from '@/core/application/use-cases/city/delete-city-use-case'
import { UpdateCityUseCase } from '@/core/application/use-cases/city/update-city-use-case'
import { CountGalleryUseCase } from '@/core/application/use-cases/gallery/count-gallery-use-case'
import { CreateGalleryUseCase } from '@/core/application/use-cases/gallery/create-gallery-use-case'
import { DeleteGalleryUseCase } from '@/core/application/use-cases/gallery/delete-gallery-use-case'
import { ListGalleryUseCase } from '@/core/application/use-cases/gallery/list-gallery-use-case'
import { AllLocaleUseCase } from '@/core/application/use-cases/locale/all-locale-use-case'
import { CreateLocaleUseCase } from '@/core/application/use-cases/locale/create-city-use-case'
import { DeleteLocaleUseCase } from '@/core/application/use-cases/locale/delete-city-use-case'
import { UpdateLocaleUseCase } from '@/core/application/use-cases/locale/update-city-use-case'
import { CreatePostUseCase } from '@/core/application/use-cases/post/create-post-use-case'
import { DeletePostUseCase } from '@/core/application/use-cases/post/delete-post-use-case'
import { FindPostUseCase } from '@/core/application/use-cases/post/find-post-use-case'
import { ListPostUseCase } from '@/core/application/use-cases/post/list-post-use-case'
import { UpdatePostUseCase } from '@/core/application/use-cases/post/update-post-use-case'
import { AllSubCategoryUseCase } from '@/core/application/use-cases/subcategory/all-subcategory-use-case'
import { CreateSubCategoryUseCase } from '@/core/application/use-cases/subcategory/create-subcategory-use-case'
import { DeleteSubCategoryUseCase } from '@/core/application/use-cases/subcategory/delete-subcategory-use-case'
import { UpdateSubCategoryUseCase } from '@/core/application/use-cases/subcategory/update-subcategory-use-case'
import { AllUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/all-upcoming-event-use-case'
import { AllValidatedUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/all-validated-upcoming-event-use-case'
import { CreateUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/create-upcoming-event-use-case'
import { DeleteUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/delete-upcoming-event-use-case'
import { UpdateUpcomingEventUseCase } from '@/core/application/use-cases/upcoming-event/update-upcoming-event-use-case'
import { AllAdvertisementWebSiteUseCase } from '@/core/application/use-cases/website/all-advertisement-website-use-case'
import { AllMenuSiteUseCase } from '@/core/application/use-cases/website/all-menusite-use-case'
import { AllUpcomingSiteUseCase } from '@/core/application/use-cases/website/all-upcomingsite-use-case'
import { AllWebSiteUseCase } from '@/core/application/use-cases/website/all-website-use-case'
import { FindByTagsSiteUseCase } from '@/core/application/use-cases/website/find-by-tags-website-use-case'
import { FindWebSiteUseCase } from '@/core/application/use-cases/website/find-website-use-case'

import { AdvertisementRepositoryPrisma } from '@/core/infra/repositories/advertisement-repository'
import { CategoryPostRepositoryPrisma } from '@/core/infra/repositories/category-post-repository'
import { CategoryRepositoryPrisma } from '@/core/infra/repositories/category-repository'
import { CityRepositoryPrisma } from '@/core/infra/repositories/city-repository'
import { GalleryRepositoryPrisma } from '@/core/infra/repositories/gallery-repository'
import { LocaleRepositoryPrisma } from '@/core/infra/repositories/locale-repository'
import { PostRepositoryPrisma } from '@/core/infra/repositories/post-repository'
import { SubCategoryRepositoryPrisma } from '@/core/infra/repositories/subcategory-repository'
import { UpcomingEventRepositoryPrisma } from '@/core/infra/repositories/upcoming-event-repository'
import { UserRepositoryPrisma } from '@/core/infra/repositories/user-repository'
import { WebSiteRepositoryPrisma } from '@/core/infra/repositories/website-repository'

import { prisma } from '@/core/package/prisma'
import { UploadImageProviderImpl } from './provider/upload-image'

export const Registry = {
  PrismaAdapter: Symbol.for('PrismaAdapter'),

  // Repositories
  AdvertisementCategoryGateway: Symbol.for('AdvertisementCategoryGateway'),
  CategoryPostCategoryGateway: Symbol.for('CategoryPostCategoryGateway'),
  CategoryCategoryGateway: Symbol.for('CategoryCategoryGateway'),
  CityGateway: Symbol.for('CityGateway'),
  GalleryGateway: Symbol.for('GalleryGateway'),
  LocaleGateway: Symbol.for('LocaleGateway'),
  PostGateway: Symbol.for('PostGateway'),
  SubCategoryGateway: Symbol.for('SubCategoryGateway'),
  UpcomingEventGateway: Symbol.for('UpcomingEventGateway'),
  UserGateway: Symbol.for('UserGateway'),
  WebSiteGateway: Symbol.for('WebSiteGateway'),

  // UseCases
  AllAdvertisementUseCase: Symbol.for('AllAdvertisementUseCase'),
  CreateAdvertisementUseCase: Symbol.for('CreateAdvertisementUseCase'),
  DeleteAdvertisementUseCase: Symbol.for('DeleteAdvertisementUseCase'),
  UpdateAdvertisementUseCase: Symbol.for('UpdateAdvertisementUseCase'),

  AuthenticationUseCase: Symbol.for('AuthenticationUseCase'),

  AllCategoryUseCase: Symbol.for('AllCategoryUseCase'),
  CreateCategoryUseCase: Symbol.for('CreateCategoryUseCase'),
  DeleteCategoryUseCase: Symbol.for('DeleteCategoryUseCase'),
  UpdateCategoryUseCase: Symbol.for('UpdateCategoryUseCase'),

  CreateCategoryPostUseCase: Symbol.for('CreateCategoryPostUseCase'),

  AllCityUseCase: Symbol.for('AllCityUseCase'),
  CreateCityUseCase: Symbol.for('CreateCityUseCase'),
  DeleteCityUseCase: Symbol.for('DeleteCityUseCase'),
  UpdateCityUseCase: Symbol.for('UpdateCityUseCase'),

  CountGalleryUseCase: Symbol.for('CountGalleryUseCase'),
  CreateGalleryUseCase: Symbol.for('CreateGalleryUseCase'),
  DeleteGalleryUseCase: Symbol.for('DeleteGalleryUseCase'),
  ListGalleryUseCase: Symbol.for('ListGalleryUseCase'),

  AllLocaleUseCase: Symbol.for('AllLocaleUseCase'),
  CreateLocaleUseCase: Symbol.for('CreateLocaleUseCase'),
  DeleteLocaleUseCase: Symbol.for('DeleteLocaleUseCase'),
  UpdateLocaleUseCase: Symbol.for('UpdateLocaleUseCase'),

  CreatePostUseCase: Symbol.for('CreatePostUseCase'),
  DeletePostUseCase: Symbol.for('DeletePostUseCase'),
  FindPostUseCase: Symbol.for('FindPostUseCase'),
  ListPostUseCase: Symbol.for('ListPostUseCase'),
  UpdatePostUseCase: Symbol.for('UpdatePostUseCase'),

  AllSubCategoryUseCase: Symbol.for('AllSubCategoryUseCase'),
  CreateSubCategoryUseCase: Symbol.for('CreateSubCategoryUseCase'),
  DeleteSubCategoryUseCase: Symbol.for('DeleteSubCategoryUseCase'),
  UpdateSubCategoryUseCase: Symbol.for('UpdateSubCategoryUseCase'),

  AllUpcomingEventUseCase: Symbol.for('AllUpcomingEventUseCase'),
  AllValidatedUpcomingEventUseCase: Symbol.for(
    'AllValidatedUpcomingEventUseCase'
  ),
  CreateUpcomingEventUseCase: Symbol.for('CreateUpcomingEventUseCase'),
  DeleteUpcomingEventUseCase: Symbol.for('DeleteUpcomingEventUseCase'),
  UpdateUpcomingEventUseCase: Symbol.for('UpdateUpcomingEventUseCase'),

  // WebSite
  AllAdvertisementWebSiteUseCase: Symbol.for('AllAdvertisementWebSiteUseCase'),
  AllMenuSiteUseCase: Symbol.for('AllMenuSiteUseCase'),
  AllUpcomingSiteUseCase: Symbol.for('AllUpcomingSiteUseCase'),
  AllWebSiteUseCase: Symbol.for('AllWebSiteUseCase'),
  FindByTagsSiteUseCase: Symbol.for('FindByTagsSiteUseCase'),
  FindWebSiteUseCase: Symbol.for('FindWebSiteUseCase'),

  // Provider
  UploadImageProvider: Symbol.for('UploadImageProvider')
}

export const container = new Container()

// database
container.bind(Registry.PrismaAdapter).toConstantValue(prisma)

// Provider
container
  .bind(Registry.UploadImageProvider)
  .toConstantValue(new UploadImageProviderImpl())

// repository
container.bind(Registry.AdvertisementCategoryGateway).toDynamicValue(() => {
  return new AdvertisementRepositoryPrisma(
    container.get(Registry.PrismaAdapter)
  )
})
container.bind(Registry.CategoryPostCategoryGateway).toDynamicValue(() => {
  return new CategoryPostRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.CategoryCategoryGateway).toDynamicValue(() => {
  return new CategoryRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.CityGateway).toDynamicValue(() => {
  return new CityRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.GalleryGateway).toDynamicValue(() => {
  return new GalleryRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.LocaleGateway).toDynamicValue(() => {
  return new LocaleRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.PostGateway).toDynamicValue(() => {
  return new PostRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.SubCategoryGateway).toDynamicValue(() => {
  return new SubCategoryRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.UpcomingEventGateway).toDynamicValue(() => {
  return new UpcomingEventRepositoryPrisma(
    container.get(Registry.PrismaAdapter)
  )
})
container.bind(Registry.UserGateway).toDynamicValue(() => {
  return new UserRepositoryPrisma(container.get(Registry.PrismaAdapter))
})
container.bind(Registry.WebSiteGateway).toDynamicValue(() => {
  return new WebSiteRepositoryPrisma(container.get(Registry.PrismaAdapter))
})

// useCase
container.bind(Registry.AllAdvertisementUseCase).toDynamicValue(() => {
  return new AllAdvertisementUseCase(
    container.get(Registry.AdvertisementCategoryGateway)
  )
})
container.bind(Registry.CreateAdvertisementUseCase).toDynamicValue(() => {
  return new CreateAdvertisementUseCase(
    container.get(Registry.AdvertisementCategoryGateway)
  )
})
container.bind(Registry.DeleteAdvertisementUseCase).toDynamicValue(() => {
  return new DeleteAdvertisementUseCase(
    container.get(Registry.AdvertisementCategoryGateway)
  )
})
container.bind(Registry.UpdateAdvertisementUseCase).toDynamicValue(() => {
  return new UpdateAdvertisementUseCase(
    container.get(Registry.AdvertisementCategoryGateway)
  )
})

container.bind(Registry.AuthenticationUseCase).toDynamicValue(() => {
  return new AuthenticationUseCase(container.get(Registry.UserGateway))
})

container.bind(Registry.AllCategoryUseCase).toDynamicValue(() => {
  return new AllCategoryUseCase(container.get(Registry.CategoryCategoryGateway))
})
container.bind(Registry.CreateCategoryUseCase).toDynamicValue(() => {
  return new CreateCategoryUseCase(
    container.get(Registry.CategoryCategoryGateway)
  )
})
container.bind(Registry.DeleteCategoryUseCase).toDynamicValue(() => {
  return new DeleteCategoryUseCase(
    container.get(Registry.CategoryCategoryGateway)
  )
})
container.bind(Registry.UpdateCategoryUseCase).toDynamicValue(() => {
  return new UpdateCategoryUseCase(
    container.get(Registry.CategoryCategoryGateway)
  )
})

container.bind(Registry.CreateCategoryPostUseCase).toDynamicValue(() => {
  return new CreateCategoryPostUseCase(
    container.get(Registry.CategoryPostCategoryGateway)
  )
})

container.bind(Registry.AllCityUseCase).toDynamicValue(() => {
  return new AllCityUseCase(container.get(Registry.CityGateway))
})
container.bind(Registry.CreateCityUseCase).toDynamicValue(() => {
  return new CreateCityUseCase(container.get(Registry.CityGateway))
})
container.bind(Registry.DeleteCityUseCase).toDynamicValue(() => {
  return new DeleteCityUseCase(container.get(Registry.CityGateway))
})
container.bind(Registry.UpdateCityUseCase).toDynamicValue(() => {
  return new UpdateCityUseCase(container.get(Registry.CityGateway))
})

container.bind(Registry.CountGalleryUseCase).toDynamicValue(() => {
  return new CountGalleryUseCase(container.get(Registry.GalleryGateway))
})
container.bind(Registry.CreateGalleryUseCase).toDynamicValue(() => {
  return new CreateGalleryUseCase(container.get(Registry.GalleryGateway))
})
container.bind(Registry.DeleteGalleryUseCase).toDynamicValue(() => {
  return new DeleteGalleryUseCase(container.get(Registry.GalleryGateway))
})
container.bind(Registry.ListGalleryUseCase).toDynamicValue(() => {
  return new ListGalleryUseCase(container.get(Registry.GalleryGateway))
})

container.bind(Registry.AllLocaleUseCase).toDynamicValue(() => {
  return new AllLocaleUseCase(container.get(Registry.LocaleGateway))
})
container.bind(Registry.CreateLocaleUseCase).toDynamicValue(() => {
  return new CreateLocaleUseCase(container.get(Registry.LocaleGateway))
})
container.bind(Registry.DeleteLocaleUseCase).toDynamicValue(() => {
  return new DeleteLocaleUseCase(container.get(Registry.LocaleGateway))
})
container.bind(Registry.UpdateLocaleUseCase).toDynamicValue(() => {
  return new UpdateLocaleUseCase(container.get(Registry.LocaleGateway))
})

container.bind(Registry.CreatePostUseCase).toDynamicValue(() => {
  return new CreatePostUseCase(
    container.get(Registry.PostGateway),
    container.get(Registry.UploadImageProvider)
  )
})
container.bind(Registry.DeletePostUseCase).toDynamicValue(() => {
  return new DeletePostUseCase(
    container.get(Registry.PostGateway),
    container.get(Registry.GalleryGateway)
  )
})
container.bind(Registry.FindPostUseCase).toDynamicValue(() => {
  return new FindPostUseCase(
    container.get(Registry.PostGateway),
    container.get(Registry.GalleryGateway)
  )
})
container.bind(Registry.ListPostUseCase).toDynamicValue(() => {
  return new ListPostUseCase(container.get(Registry.PostGateway))
})
container.bind(Registry.UpdatePostUseCase).toDynamicValue(() => {
  return new UpdatePostUseCase(
    container.get(Registry.PostGateway),
    container.get(Registry.UploadImageProvider)
  )
})

container.bind(Registry.AllSubCategoryUseCase).toDynamicValue(() => {
  return new AllSubCategoryUseCase(container.get(Registry.SubCategoryGateway))
})
container.bind(Registry.CreateSubCategoryUseCase).toDynamicValue(() => {
  return new CreateSubCategoryUseCase(
    container.get(Registry.SubCategoryGateway)
  )
})
container.bind(Registry.DeleteSubCategoryUseCase).toDynamicValue(() => {
  return new DeleteSubCategoryUseCase(
    container.get(Registry.SubCategoryGateway)
  )
})
container.bind(Registry.UpdateSubCategoryUseCase).toDynamicValue(() => {
  return new UpdateSubCategoryUseCase(
    container.get(Registry.SubCategoryGateway)
  )
})

container.bind(Registry.AllUpcomingEventUseCase).toDynamicValue(() => {
  return new AllUpcomingEventUseCase(
    container.get(Registry.UpcomingEventGateway)
  )
})
container.bind(Registry.AllValidatedUpcomingEventUseCase).toDynamicValue(() => {
  return new AllValidatedUpcomingEventUseCase(
    container.get(Registry.UpcomingEventGateway)
  )
})
container.bind(Registry.CreateUpcomingEventUseCase).toDynamicValue(() => {
  return new CreateUpcomingEventUseCase(
    container.get(Registry.UpcomingEventGateway)
  )
})
container.bind(Registry.DeleteUpcomingEventUseCase).toDynamicValue(() => {
  return new DeleteUpcomingEventUseCase(
    container.get(Registry.UpcomingEventGateway)
  )
})
container.bind(Registry.UpdateUpcomingEventUseCase).toDynamicValue(() => {
  return new UpdateUpcomingEventUseCase(
    container.get(Registry.UpcomingEventGateway)
  )
})

container.bind(Registry.AllAdvertisementWebSiteUseCase).toDynamicValue(() => {
  return new AllAdvertisementWebSiteUseCase(
    container.get(Registry.WebSiteGateway)
  )
})
container.bind(Registry.AllMenuSiteUseCase).toDynamicValue(() => {
  return new AllMenuSiteUseCase(container.get(Registry.WebSiteGateway))
})
container.bind(Registry.AllUpcomingSiteUseCase).toDynamicValue(() => {
  return new AllUpcomingSiteUseCase(container.get(Registry.WebSiteGateway))
})
container.bind(Registry.AllWebSiteUseCase).toDynamicValue(() => {
  return new AllWebSiteUseCase(container.get(Registry.WebSiteGateway))
})
container.bind(Registry.FindByTagsSiteUseCase).toDynamicValue(() => {
  return new FindByTagsSiteUseCase(container.get(Registry.WebSiteGateway))
})
container.bind(Registry.FindWebSiteUseCase).toDynamicValue(() => {
  return new FindWebSiteUseCase(container.get(Registry.WebSiteGateway))
})
