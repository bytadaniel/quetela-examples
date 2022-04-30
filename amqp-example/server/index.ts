import express from 'express'
import cors from 'cors'
import { NodeQueueClient } from '@quetela/core/build/builtins/queue-drivers/base-driver'
import container from '@quetela/core/build/container'

const queueClient = container.get<NodeQueueClient>('queueClient')

async function runServer (PORT: number) {
    const app = express()
    
    app.use(express.json())
    app.use(cors())
    
    app.post('/tasks/run/initial', (_req, res) => res.sendStatus(200))
    
    app.listen(PORT, () => console.log('listening on port ' + PORT))
}

export { runServer }
