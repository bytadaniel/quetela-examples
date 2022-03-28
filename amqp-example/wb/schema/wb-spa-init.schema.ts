import Joi from 'joi'

export const WbSpaInitSchema = Joi.object<IWbSpaInitSchema>({
  router: Joi.object({
    modules: Joi.object().optional(),
    ssrModel: Joi.object({
      model: Joi.object().optional()
    }).required(),
    appVersion: Joi.string().optional()
  }).required(),
  seoHelper: Joi.object({
    items: Joi.array().optional(),
    updateUrl: Joi.string().optional(),
    defaultTitle: Joi.string().optional()
  }).optional(),
  menuLkHelper: Joi.object({
    stylesLink: Joi.string().optional()
  }).optional()
})

export interface IWbSpaInitSchema {
  router: {
    modules?: Record<any, any>,
    ssrModel: {
      model?: Record<any, any>
    },
    appVersion?: string
  },
  seoHelper?: {
    items?: any[],
    updateUrl?: string,
    defaultTitle?: string
  },
  menuLkHelper?: {
    stylesLink?: string
  }
}
