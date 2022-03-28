import jsonrepair from 'jsonrepair'
import Joi from 'joi'
import cheerio from 'cheerio'


import { IWbSpaInitSchema, WbSpaInitSchema } from './schema/wb-spa-init.schema'
import { BrandPageSchema, IBrandPageSchema } from './schema/brand-page.schema'

const REGEXP_WB_SPA_INIT = /wb\.spa\.init\((.*)\)\;\s+\}\s+catch/ms

export class WbSpaInitParser {
  constructor() {}

  private async validateSchema<T>(
    schema: Joi.Schema,
    object: Record<any, any> | undefined = {}
  ): Promise<T> {
    try {
      const validated = await schema.validateAsync(object, {
        abortEarly: true,
        allowUnknown: true
      })
      return validated
    } catch (validationError) {
      console.log(validationError)
      // return undefined
      throw new Error('Object does not match schema. wb.spa.init incorrect')
    }
  }

  public async getWbSPAInit ($: cheerio.Root): Promise<IWbSpaInitSchema> {
    const scripts = $('script').get()

    const script = scripts
      .map(candidate => $(candidate).html())
      .find(candidate => candidate?.includes('wb.spa.init'))

    if (!script) {
      throw new Error('wb.spa.init script not found')
    }

    const match = script.match(REGEXP_WB_SPA_INIT)

    if (!match) {
      throw new Error('Failed to match object inside wb.spa.init function')
    }

    /**
     * фикс вот этой части wb.spa.init
     * googleTagParams: '{\n' +
        '  "PageType": "product",\n' +
        '  "Ptype": [\n' +
        '    "Сыворотка омолаживающая с ретинолом в сквалане The Ordinary Retinol 1% in Squalane, 30 мл"\n' +
        '  ],\n' +
        '  "Pbrand": "THE ORDINARY",\n' +
        '  "ProdID": [\n' +
        '    66355125\n' +
        '  ],\n' +
        '  "Value": [\n' +
        '    "1612"\n' +
        '  ],\n' +
        '  "Discount": "52%",\n' +
        '  "Delivery": "Бесплатная доставка",\n' +
        '  "Psize": []\n' +
        '}',
     */
    const matchFix = match[1].replace(/tmplHashes/g, `"tmplHashes"`)

    const parsed = JSON.parse(jsonrepair(matchFix))

    const validated = await this.validateSchema<IWbSpaInitSchema>(
      WbSpaInitSchema,
      parsed
    )
    return validated
  }

  public async getBrandPageValidated($: cheerio.Root): Promise<IBrandPageSchema> {
    const spaInit = await this.getWbSPAInit($)
    console.log(spaInit.router.ssrModel.model)
    const validated = await this.validateSchema<IBrandPageSchema>(
      BrandPageSchema,
      spaInit.router.ssrModel.model
    )
    return validated
  }
}
