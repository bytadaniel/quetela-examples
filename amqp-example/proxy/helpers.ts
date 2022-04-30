import fs from 'fs'
import { Proxy } from './Proxy'

export function getProxy (absPath: string): Proxy[] {
  const fileContent = fs.readFileSync(absPath, 'utf8')
  const rawLines = fileContent.split(/\r?\n/)
  const proxyList = rawLines.filter(line => !!line)

  return proxyList.map((proxy: string) => { // host:port:login:password
    const [host, port, login, password] = proxy.split(':')
    return new Proxy(host, Number(port), login, password)
  })
} 