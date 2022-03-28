import Joi from 'joi'

export const BrandPageSchema = Joi.object<IBrandPageSchema>({
  brandInfo: Joi.object({
    logoUrl: Joi.string().required(),
    brandLink: Joi.string().required(),
    name: Joi.string().required(),
    id: Joi.number().required()
  }).required(),
  pagerModel: Joi.object({
    pagingInfo: Joi.object({
      currentPage: Joi.number().required(),
      currentPageSize: Joi.number().required(),
      totalItems: Joi.number().required(),
      totalPages: Joi.number().required(),
      isValidPageNumber: Joi.boolean().required()
    }).required()
  }).required(),
  products: Joi.array().items({
    nmId: Joi.number().required(),
    name: Joi.string().required(),
    pics: Joi.number().required(),
    subjectId: Joi.number().required(),
    brand: Joi.string().required(),
    brandId: Joi.number().required(),
    brandCod: Joi.number().required(),
    price: Joi.number().required(),
    salePrice: Joi.number().required(),
    sale: Joi.number().required(),
    star: Joi.number().required(),
    feedbacks: Joi.number().required(),
    sizes: Joi.array().items({
      ch: Joi.number().required(),
      nm: Joi.string().required(),
      s: Joi.number().required()
    }).required(),
    isAdv: Joi.boolean().required(),
    canQuickOrder: Joi.boolean().required(),
    color: Joi.string().allow('').required(),
  }).required(),
  xData: Joi.object({
    xcatalogBaseUrl: Joi.string().required(),
  }).required(),
  sitePathItems: Joi.array().items({
    pageUrl: Joi.string(),
    name: Joi.string(),
    id: Joi.number()
  }).default([])
})

export interface IBrandPageSchema {
  brandInfo: IBrandInfo,
  pagerModel: IPagerModel,
  products: IProduct[],
  xData: IXData,
  sitePathItems: SitePathItem[]
}

export interface SitePathItem {
  id: number,
  name: string,
  pageUrl: string
}

interface IBrandInfo {
  logoUrl: string,
  brandLink: string,
  name: string,
  id: number
}

interface IPagerModel {
  pagingInfo: IPagingInfo
}

interface IPagingInfo {
  currentPage: number,
  currentPageSize: number,
  totalItems: number,
  totalPages: number,
  isValidPageNumber: boolean
}

interface IProduct {
  nmId: number,
  name: string,
  pics: number,
  subjectId: number,
  brand: string,
  brandId: number,
  brandCod: number,
  price: number,
  salePrice: number,
  sale: number,
  star: number,
  feedbacks: number,
  sizes: ISize[],
  isAdv: boolean,
  canQuickOrder: boolean,
  color: string,
}

interface ISize {
  ch: number,
  nm: string,
  s: number
}

interface IXData {
  xcatalogBaseUrl: string,
}

