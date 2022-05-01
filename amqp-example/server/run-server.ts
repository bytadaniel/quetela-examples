import http from 'http'
import WebSocket from 'ws'
import express, { Request, Response } from 'express'
import cors from 'cors'
import container from '@quetela/core/build/container'
import { NodeQueueClient } from '@quetela/core/build/builtins/queue-drivers/base-driver'
import { CatQueue } from './quetela/queues/CatQueue'
import { ProduceCatsTask } from './quetela/tasks/parse_cat_images/produce-cats.task'
import { eventEmitter } from './event-listener'

async function runInitialTask (req: Request, res: Response) {
  const catCount: number = req.body.catCount ?? 0

  console.log({ catCount })

  if (catCount > 0) {
    console.log('send tasks to queue')
    container.get<NodeQueueClient>('queueClient').sendMessage(CatQueue.queueName, {
      previousData: {},
      taskName: ProduceCatsTask.taskName,
      attempt: 1,
      data: { catCount }
    })
  }

  res.sendStatus(200)
}

async function runServer (PORT: number) {
  const app = express()
  app.use(cors())
  app.use(express.json())
  
  const server = http.createServer(app)
  const wsServer = new WebSocket.Server({ server })
  
  wsServer.on('connection', socket => {
    eventEmitter.addListener('catUrl', (catUrl) => socket.send(catUrl))
  })
  
  app.post('/tasks/cats/run', runInitialTask)
  
  server.listen(PORT, () => console.log('listening on port ' + PORT))
}

export { runServer }
