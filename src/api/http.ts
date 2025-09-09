/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type InternalAxiosRequestConfig } from 'axios'

import { ElMessage } from 'element-plus'

interface AnyObject {
  [key: string]: any
}

// 请求拦截器
axios.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  /**
   * ! 根据业务需求和后端配置约定如何定义请求拦截器
   * 1. 添加请求头
   * 2. 添加token
   * 3. 配置参数格式
   * 4. 配置签名
   * 5. 配置其他参数
   */
  req.headers['Content-Type'] = 'application/json'
  /* if (localStorage.getItem('token') && !req.headers['Authorization']) {
    req.headers['Authorization'] = localStorage.getItem('token')
  } */
  return req
})

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    /**
     * ! 根据业务需求和后端配置约定如何定义响应拦截器
     * 1. 响应数据处理,统一格式化响应数据
     * 2. 响应错误处理
     */
    return response
  },
  (error) => {
    ElMessage.error('数据获取失败!')
    return Promise.reject(error)
  },
)
const http = (url: string, data: AnyObject = {}, type: string = 'POST') => {
  return new Promise<any>((resolve, reject) => {
    let promise
    if (type === 'GET') {
      promise = axios.get(url, { params: data })
    } else if (type === 'POST') {
      promise = axios.post(url, data)
    }
    promise
      ?.then((response: AnyObject) => {
        resolve(response.data)
      })
      .catch((error: AnyObject) => {
        ElMessage.error('数据获取失败!')
        console.log(error)
        reject(error)
      })
  })
}

export default http
