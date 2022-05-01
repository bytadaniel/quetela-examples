import { Task } from '@quetela/core/build/models'
import { eventEmitter } from '../../../../server/event-listener'
import { CatQueue } from '../../queues/CatQueue'

export class EmitContextTask extends Task {
  public static taskName = 'emit-context.task'
  public static queue = CatQueue

  public static async handler (_ctx: any, p: { catUrl: string }) {
    eventEmitter.emit('catUrl', p.catUrl)
  }
}