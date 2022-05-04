
import _ from 'lodash'
import { Task } from '@quetela/core/build/models'
import { CatQueue } from '../../queues/CatQueue'


export class ProduceCatsTask extends Task {
  public static taskName = 'produce-cats.task'
  public static queue = CatQueue

  public static async handler (_ctx: any, p: { catCount: number }) {
    const tasks = new Array(p.catCount).fill({}).map((_o, i) => {
      return {
        catCount: p.catCount,
        counter: i
      }
    })

    console.log(tasks)
    return tasks
  }
}