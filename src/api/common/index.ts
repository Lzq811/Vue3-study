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
