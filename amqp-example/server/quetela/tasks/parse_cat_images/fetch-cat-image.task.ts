
import { Task } from '@quetela/core/build/models'
import axios from 'axios'
import { CatQueue } from '../../queues/CatQueue'


export class FetchCatImageTask extends Task {
  public static taskName = 'fetch-cat-image.task'
  public static queue = CatQueue

  public static async handler () {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=1&size=small`)
    return {
      catUrl: response.data[0].url
    }
  }
}