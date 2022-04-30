import fs from 'fs'
import { Proxy } from './Proxy'

export class ProxyQueue {
  readonly proxyList: Proxy[]

  constructor(proxyList: Proxy[] = []) {
    this.proxyList = proxyList
  }

  public get length() {
    return this.proxyList.length
  }

  public appendProxy(proxy: Proxy) {
    this.proxyList.push(proxy)
  }

  public next() {
    const targetProxy = this.proxyList.shift()
    if (!targetProxy) {
      throw new Error('Proxy is not found in proxy list!')
    }
    this.proxyList.push(targetProxy)
    return targetProxy
  }
}