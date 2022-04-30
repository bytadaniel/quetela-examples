import container from "@quetela/core/build/container"
import { Ignitor } from "@quetela/core/build/ignitor"
import { NodeQueueClient } from "@quetela/core/build/builtins/queue-drivers/base-driver"

import { StockQueue } from "./quetela/queues/StockQueue"
import { ResolveParseDatesTask } from "./quetela/tasks/parse_token_stocks/resolve_parse_dates.task"
import { initialContext, tokenDateContext, tokenDateWebhookContext } from "./quetela/tasks/parse_token_stocks.context"
import { runServer } from "./server"

(async function () {
  await Ignitor({
    queueClient: new NodeQueueClient(),
    contexts: [initialContext, tokenDateContext, tokenDateWebhookContext]
  })
})()

async function main () {
  await Ignitor({
    queueClient: new NodeQueueClient(),
    contexts: [initialContext, tokenDateContext, tokenDateWebhookContext]
    // contexts: []
  })

  runServer(4200)

  // queueClient.sendMessage(StockQueue.queueName, {
  //   previousData: { token: 'MGRiYTgwOWUtZDQwMy00ODE0LTllMDQtYTAxMmI4ODc0Njc4' },
  //   taskName: ResolveParseDatesTask.taskName,
  //   attempt: 1,
  //   data: {}
  // })
}

main()

