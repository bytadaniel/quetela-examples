import { Task } from '@quetela/core/build/models'
import { BrandQueue } from "../../queues/BrandQueue"

export class StartParseBrandsTask extends Task {
  public static taskName = 'start_parse_brands_task'
  public static queue = BrandQueue
  public static async handler () {
    return [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '123',
      '%D0%B0-%D1%8F'
    ].map(letter => ({ letter }))
  }
}