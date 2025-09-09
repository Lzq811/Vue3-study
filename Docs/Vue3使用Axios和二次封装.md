本文旨在介绍如何在 vite+vue3+ts的项目中使用 aixos 来做数据请求。以及二次封装完整使用套路。

### 1. 安装 axios

安装指令

```basic
yarn add axios
```

### 2. 封装

##### 2.1 封装实现功能

- 优化请求代码量，统一处理请求、请求头、请求签名、加密、请求拦截、响应拦截等；
- 根据不同业务逻辑拆分代码，尽可能的实现业务解耦；

##### 2.2 封装步骤

1. 在 `src` 目录下创建 `api` 目录，并初始化以下文件：

   | 目录文件                  | 说明                                                         |
   | ------------------------- | ------------------------------------------------------------ |
   | `src/api/index.ts`        | axios入口文件，所有接口相关功能都可以从此文件引入后再集中导出 |
   | `src/api/http.ts`         | axios请求，请求签名，请求加密，请求拦截，响应拦截等统一处理文件 |
   | `src/api/common/index.ts` | 通用接口模块，比如获取按钮权限，字典值等接口                 |
   | `src/api/其他/index.ts`   | 具体业务模块，比如登录校验可以定义为 `src/api/auth/index.ts` |

2. `src/api/index.ts` 

   ```tsx
   /**
    * ! axios入口文件，所有接口相关功能都可以从此文件引入后再集中导出
    * 1. 集中管理管理当前环境使用的后端服务地址
    * 2. 统一把各个模块的接口导入到该文件，统一导出
    * 3. 调用时只需要 api.common.reqGetDogs() 来调用接口，common为模块名称，reqGetDogs为接口名称
    */
   
   // 后台地址--后续配置环境变量时优化
   export const BASE: string = 'http://xxx.xxx.xx:8087'
   
   // 通用接口
   import * as common from './common'
   
   // 其他模块接口
   
   export default { common }
   
   ```

3. `src/api/http.ts`

   ```tsx
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
   
   ```

   

4. `src/api/common/index.ts`

   ```tsx
   import http from '@api/http.ts'
   import { BASE } from '@api/index.ts'
   
   interface IParrms {
     username: string
     password: string
   }
   // http 接三个参数，url必填, params默认空对象可以不写, get或者post默认post可以不写,
   // 登陆login
   export const ReqLogin = (params: IParrms) => http(`${BASE}/login`, params)
   
   // 测试获取狗狗照片 到App.vue中执行获取动作
   export const ReqGetDogs = () => http(`https://dog.ceo/api/breeds/image/random`, {}, 'GET')
   
   ```

   

### 3. 调用demo

1. 引入接口

   ```tsx
   // 方式1
   import api from '@api/index.ts'
   // 方式2
   import ReqGetDogs from '@api/common/index.ts'
   ```

   

2. 调用接口demo

   ```tsx
   const getDogPic = async () => {
     // 调用方式1
     const res = await api.common.ReqGetDogs()
     // 调用方式2
     const res = await ReqGetDogs()
     console.log(res)
   }
   
   onMounted(() => {
     getDogPic()
   })
   ```

