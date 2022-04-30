
import { Task } from '@quetela/core/build/models'
import { StockQueue } from '../../queues/StockQueue'


export class ParseTokenDateTask extends Task {
  public static taskName = 'parse_token_stocks:parse_token_date'
  public static queue = StockQueue

  public static async handler (ctx: { token: string }, p: { date: string }) {
    const url = `https://suppliers-stats.wildberries.ru/api/v1/supplier/orders?dateFrom=${p.date}&flag=1&key=${ctx.token}`
    console.log({ url })
    // const response = await axios.get(url)
    // console.log({ data: response.data[0] })
    // return response.data
    // return []
  }
}