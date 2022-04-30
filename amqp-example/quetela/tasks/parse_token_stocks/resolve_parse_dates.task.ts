import * as luxon from 'luxon'
import { Task } from '@quetela/core/build/models'
import { StockQueue } from '../../queues/StockQueue'


export class ResolveParseDatesTask extends Task {
  public static taskName = 'parse_token_stocks:resolve_parse_dates'
  public static queue = StockQueue

  public static async handler (_ctx: any, _p: { token: string }) {
    console.log({
      _ctx,
      _p
    })

    return luxon.Interval
      .fromDateTimes(
        luxon.DateTime.now().minus({ month: 1 }),
        luxon.DateTime.now()
      )
      .splitBy({ day: 1 })
      .map(d => ({ date: d.end.toISODate() }))
  }
}