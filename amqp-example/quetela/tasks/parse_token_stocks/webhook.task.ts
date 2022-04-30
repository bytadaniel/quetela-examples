import axios from 'axios'
import { Task } from '@quetela/core/build/models'
import { StockQueue } from '../../queues/StockQueue'

const webhookUrl = 'http://localhost:3000/task/complete'

export class WebhookTask extends Task {
  public static taskName = 'parse_token_stocks:resolve_parse_dates'
  public static queue = StockQueue

  public static async handler (_ctx: any, _p: any) {
    console.log('Send webhook about completing task')
    process.exit(1)
    await axios.post(webhookUrl, '', { validateStatus: _status => true })
  }
}