import { Ignitor } from "@quetela/core/build/ignitor"
import { producerCtx, fetcherCtx, emitterCtx } from "./quetela/tasks/parse_token_stocks.context"
import { runServer } from "./run-server"
import { NodeQueueClient } from "@quetela/core/build/builtins/queue-drivers/base-driver"

async function main () {
  await Ignitor({
    queueClient: new NodeQueueClient(),
    contexts: [producerCtx, fetcherCtx, emitterCtx],
  })

  await runServer(4200)
}

main()