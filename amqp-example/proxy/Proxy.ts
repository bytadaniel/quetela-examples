import { SocksProxyAgent } from "socks-proxy-agent"

export class Proxy {
  readonly host: string
  readonly port: number
  readonly #login: string
  readonly #password: string

  constructor(host: string, port: number, login: string, password: string) {
    this.host = host
    this.port = port
    this.#login = login
    this.#password = password
  }

  public getSocks5Agent () {
    return new SocksProxyAgent({
      host: this.host,
      port: this.port,
      userId: this.#login,
      password: this.#password
    })
  }
}