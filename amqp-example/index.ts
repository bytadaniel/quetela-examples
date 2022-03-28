import container from "@quetela/core/build/container"
import { Ignitor } from "@quetela/core/build/ignitor"
import { NodeQueueClient } from "@quetela/core/build/builtins/queue-drivers/base-driver"

import { BrandQueue } from "./queues/BrandQueue"
import { initialContext, brandLettersContext, brandBrandContext } from "./tasks/parse-brand-context"
import { StartParseBrandsTask } from "./tasks/parse_brand/start_parse_brands"

async function main () {
  await Ignitor({
    queueClient: new NodeQueueClient(),
    contexts: [initialContext, brandLettersContext, brandBrandContext]
  })

  const queueClient = container.get<NodeQueueClient>('queueClient')

  queueClient.sendMessage(BrandQueue.queueName, {
    previousData: {},
    taskName: StartParseBrandsTask.taskName,
    attempt: 1,
    data: {}
  })
}

main()

