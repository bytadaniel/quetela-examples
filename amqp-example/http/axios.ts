import path from 'path'
import axios from 'axios'
import { ProxyQueue } from '../proxy/ProxyQueue'
import { getProxy } from '../proxy/helpers'


console.log(path.join(__dirname, '../proxy.txt'))

const proxyQueue = new ProxyQueue(getProxy(path.join(__dirname, '../proxy.txt')))

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(
    (onRequestConfig) => {
        const proxy = proxyQueue.next()
        console.log('Request! Use proxy', proxy)
        onRequestConfig.httpAgent = proxy.getSocks5Agent()
        return onRequestConfig
      }
)

export { axiosInstance }