class Http {
  sendInitialTask (token) {
    fetch(`http://localhost:4200/tasks/${token}`)
  }

  checkWorkProgress () {
    fetch(`http://localhost:4200/work-progress`)
  }
}

class ApiEventEmitter extends EventTarget {
  emit (eventName) {
    this.dispatchEvent(new Event(eventName))
  }
}


class Api {
  http = new Http()

  workCounter = 0

  incrementWorkCounter () {
    this.workCounter++
  }

  setToken (token) {
    window.localStorage.setItem('token', token)
  }

  getToken () {
    return window.localStorage.getItem('token')
  }

  startAsyncWork (token) {
    console.log('work with', { token })
  }
}

class Renderer {
  constructor () {
    this.elementHooks = new WeakMap()
    this.elementIteratee = []
  }

  addElementRenderHook (element, hook) {
    this.elementHooks.set(element, hook)
    this.elementIteratee.push(element)
  }

  render () {
    for (const element of this.elementIteratee) {
      this.renderElement(element)
    }
  }

  renderElement (element) {
    const renderHook = this.elementHooks.get(element)
    renderHook()
  }
}

document.api = new Api()
document.renderer = new Renderer()
document.apiEventEmitter = new ApiEventEmitter()


document.api.http.checkWorkProgress()