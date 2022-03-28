import axios from 'axios'
import cheerio from 'cheerio'
import { WbSpaInitParser } from '../../wb/WBSpaInitParser'
import { Task } from '@quetela/core/build/models'
import { BrandQueue } from "../../queues/BrandQueue"

export class ParseBrandTask extends Task {
  public static taskName = 'parse_brand'
  public static queue = BrandQueue

  public static async handler (context: { url: string }, data: { brandUrl: string }) {
    console.log({ context, data })
    const requestUrl = `https://www.wildberries.ru/brands/${data.brandUrl}/all?page=1`
    const response = await axios.get(requestUrl)
    cheerio.load('')
    return await new WbSpaInitParser().getBrandPageValidated(cheerio.load(response.data))
  }
}