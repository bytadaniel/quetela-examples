import axios from 'axios'
import { Task } from '@quetela/core/build/models'
import { BrandQueue } from "../../queues/BrandQueue"

export class ParseBrandLetterTask extends Task {
  public static taskName = 'parse_brand_letter'
  public static queue = BrandQueue

  public static async handler (_ctx: any, p: { letter: string }) {
    const response = await axios.get(`https://www.wildberries.ru/wildberries/brandlist/data?letter=${p.letter}`)
    const brandLetterObject: {
      resultState: number,
      value: {
        brandsCount: string,
        currentLetter: string,
        letters: { name: string, link: string }[],
        brandGroups: { isSelected: boolean, link: string, name: string }[],
        brandsList: { id: number, logoPath: string, name: string, url: string }[]
      }
    } = response.data

    const brandUrls = brandLetterObject.value.brandsList.map(brand => brand.url.split('/')[2])
    return brandUrls.map(brandUrl => ({ brandUrl }))
  }
}